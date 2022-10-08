import { Controller } from './controller';
import { Good } from '../confing/interfaces';
import Products from './products';
import Sort from '../filters/sort';
import { Options } from './options';
import { Cart } from './cart';
import { SearchForm, templateHTML } from '../confing/enums';
import { Filters } from '../filters/filters';

class AppView {
  products: Products;
  controller: Controller;
  properties: Options;
  cart: Cart;
  filters: Filters;
  search: string;
  constructor() {
    this.products = new Products();
    this.controller = new Controller();
    this.properties = new Options();
    this.cart = new Cart(this.properties.options.items);
    this.filters = new Filters();
    this.search = '';
  }

  drawCategorie = (data: Good[]): void => {
    let values = data ? data : [];
    values = Sort(values, this.properties.options.sort);
    values = this.filters.filterAll(values, this.properties.getOptions());
    const answer = this.products.draw(values);

    if (answer) {
      const cartButtons = document.querySelectorAll(templateHTML.buttons);
      cartButtons.forEach((buttons) => {
        buttons?.addEventListener('click', (e) => {
          const newStore = this.cart.controller(e);
          if (newStore) {
            this.properties.options.items = newStore;
            this.properties.saveOptions(this.properties.options);
          }
        });
      });
    }

    this.cart.draw(this.properties.options.items);
  };

  drawTargetCategorie(event?: Event): void {
    let targetCategorie = this.properties.options.categorie;

    if (event) {
      targetCategorie = this.controller.findParent(event.target);
      this.properties.options.categorie = targetCategorie;
      this.properties.saveOptions(this.properties.options);
    } else {
      const targetId = <HTMLElement>(
        document.querySelector(`#${targetCategorie}`)
      );
      this.controller.deleteActive();
      this.controller.setActive(targetId);
    }

    const targetGoods = this.filterGoods(targetCategorie);
    this.drawCategorie(targetGoods);
  }

  filterGoods(target: string): Good[] {
    let targetGoods = this.properties.options.items.filter((item: Good) => {
      if (target === 'all') {
        return true;
      } else {
        return target === item.categories;
      }
    });

    if (this.search !== '') {
      targetGoods = targetGoods.filter((item: Good) =>
        item.title.toUpperCase().includes(this.search)
      );
    }

    return targetGoods;
  }

  sort(event?: Event): void {
    if (event) {
      const targetSort: string = (<HTMLSelectElement>event.target).value;
      this.properties.options.sort = targetSort;
      this.properties.saveOptions(this.properties.options);
      this.drawTargetCategorie();
    }
  }

  searchValue(value: string): void {
    this.search = value.toUpperCase();
    this.drawTargetCategorie();
  }

  initSliders(): void {
    const { priceSlider, yearSlider, valueSlider } = this.filters.init(
      this.properties.getOptions()
    );

    if (priceSlider?.noUiSlider) {
      priceSlider?.noUiSlider.on('slide', (e) => {
        this.properties.options.price = [Number(e[0]), Number(e[1])];
        this.properties.saveOptions(this.properties.options);
        this.drawTargetCategorie();
      });
    }
    if (yearSlider?.noUiSlider) {
      yearSlider?.noUiSlider.on('slide', (e) => {
        this.properties.options.year = [Number(e[0]), Number(e[1])];
        this.properties.saveOptions(this.properties.options);
        this.drawTargetCategorie();
      });
    }
    if (valueSlider?.noUiSlider) {
      valueSlider?.noUiSlider.on('slide', (e) => {
        this.properties.options.value = [Number(e[0]), Number(e[1])];
        this.properties.saveOptions(this.properties.options);
        this.drawTargetCategorie();
      });
    }
  }

  toggleBrand(brand: string): void {
    
    if (!this.properties.getOptions().brands.includes(brand)) {
      this.properties.options.brands.push(brand);
    } else {
      this.properties.options.brands = this.properties.options.brands.filter(
        (item) => item !== brand
      );
    }
    this.properties.saveOptions(this.properties.options);
    this.drawTargetCategorie();
  }

  toggleColor(color: string): void {
    if (!this.properties.getOptions().colors.includes(color)) {
      this.properties.options.colors.push(color);
    } else {
      this.properties.options.colors = this.properties.options.colors.filter(
        (item) => item !== color
      );
    }
    this.properties.saveOptions(this.properties.options);
    this.drawTargetCategorie();
  }

  removeAllOptions(): void {
    const currentItems = this.properties.options.items;
    this.search = '';
    (<HTMLInputElement>document.querySelector(SearchForm.root)).value = '';
    this.properties.options = this.properties.defaultOptions();
    this.properties.options.items = [...currentItems];
    this.properties.saveOptions(this.properties.options);
    this.filters.destroy();
    this.initSliders();
    this.drawTargetCategorie();
  }

  resetStorage(): void {
    localStorage.clear();
    this.search = '';
    (<HTMLInputElement>document.querySelector(SearchForm.root)).value = '';
    this.properties.options = this.properties.defaultOptions();
    this.filters.destroy();
    this.initSliders();
    this.drawTargetCategorie();
  }
}

export default AppView;
