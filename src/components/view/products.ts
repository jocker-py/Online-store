import { Good } from '../confing/interfaces';
import { templateHTML, SearchForm, Display } from '../confing/enums';

class Products {
  draw(data: Good[]): boolean {
    const list = <HTMLElement>document.querySelector(templateHTML.root);
    const template: HTMLTemplateElement = document.querySelector(
      templateHTML.template
    ) as HTMLTemplateElement;
    const fragment = document.createDocumentFragment();
    const notification = <HTMLElement>(
      document.querySelector(SearchForm.notification)
    );

    for (const item of data) {
      const itemClone: HTMLElement = template.content.cloneNode(
        true
      ) as HTMLElement;

      (<HTMLElement>itemClone.querySelector(templateHTML.title)).textContent =
        item.title;

      (<HTMLImageElement>(
        itemClone.querySelector(templateHTML.img)
      )).style.backgroundImage = `url(${item.img})`;

      (<HTMLElement>(
        itemClone.querySelector(templateHTML.description)
      )).textContent = item.description;
      (<HTMLElement>(
        itemClone.querySelector(templateHTML.price)
      )).textContent = `${item.price}$`;
      (<HTMLElement>(
        itemClone.querySelector(templateHTML.brand)
      )).textContent = `brand: ${item.brand}`;
      (<HTMLElement>(
        itemClone.querySelector(templateHTML.year)
      )).textContent = `produced: ${item.year}`;

      if (item.size) {
        (<HTMLElement>(
          itemClone.querySelector(templateHTML.size)
        )).textContent = `size: ${item.size}`;
      }

      if (item.shelf) {
        (<HTMLElement>(
          itemClone.querySelector(templateHTML.shelf)
        )).textContent = `shelfs: ${item.shelf}`;
      }

      if (item.values >= 0) {
        (<HTMLElement>(
          itemClone.querySelector(templateHTML.values)
        )).textContent = `values: ${item.values}`;
      }

      if (item.cart) {
        (<HTMLElement>(
          itemClone.querySelector(templateHTML.cart)
        )).textContent = `${item.cart}`;
        (<HTMLElement>itemClone.querySelector(templateHTML.item)).classList.add(
          templateHTML.active
        );
      } else {
        (<HTMLElement>itemClone.querySelector(templateHTML.cart)).classList.add(
          Display.none
        );
        (<HTMLElement>(
          itemClone.querySelector(templateHTML.item)
        )).classList.remove(templateHTML.active);
      }

      if (item.color) {
        (<HTMLImageElement>(
          itemClone.querySelector(templateHTML.color)
        )).style.backgroundColor = item.color;
      } else {
        (<HTMLImageElement>(
          itemClone.querySelector(templateHTML.color)
        )).classList.add(Display.none);
      }

      fragment.append(itemClone);
    }

    list.innerHTML = '';
    list.appendChild(fragment);

    if (data.length === 0) {
      notification?.classList.remove(Display.none);
      list.innerHTML = "Sorry, but item doesn't exist";
    } else {
      notification?.classList.add(Display.none);
    }

    return true;
  }
}

export default Products;
