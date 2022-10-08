import AppView from './view/appView';
import {
  Buttons,
  Categories,
  SearchForm,
  Selection,
  TargetFilterType,
} from './confing/enums';

class App {
  view: AppView;
  constructor() {
    this.view = new AppView();
  }

  start(): void {
    this.view.drawTargetCategorie();

    const categories = <HTMLElement>(
      document.querySelector(`.${Categories.root}`)
    );
    const select = <HTMLSelectElement>(
      document.querySelector(`${Selection.root}`)
    );
    const search = <HTMLInputElement>document.querySelector(SearchForm.root);
    const storageBtn = <HTMLElement>document.querySelector(Buttons.storage);
    const filterBtn = <HTMLElement>document.querySelector(Buttons.filter);
    const labelsBrand: NodeListOf<HTMLLabelElement> = document.querySelectorAll(
      TargetFilterType.brand
    );
    const labelsColor: NodeListOf<HTMLLabelElement> = document.querySelectorAll(
      TargetFilterType.color
    );

    labelsBrand.forEach((brand) => {
      brand.addEventListener('click', () => {
        this.view.toggleBrand(brand.innerHTML);
      });
    });

    labelsColor.forEach((color) => {
      color.addEventListener('click', () => {
        this.view.toggleColor(color.htmlFor);
      });
    });

    categories.addEventListener('click', (e) => {
      this.view.drawTargetCategorie(e);
    });
    select.addEventListener('change', (e) => {
      this.view.sort(e);
    });
    search.addEventListener('input', () => {
      this.view.searchValue(search.value);
    });

    storageBtn.addEventListener('click', () => {
      this.view.resetStorage();
    });

    filterBtn.addEventListener('click', () => {
      this.view.removeAllOptions();
    });

    this.view.initSliders();
  }
}

export default App;
