import { CartElement, Display, templateHTML } from '../confing/enums';
import { Good } from '../confing/interfaces';

export class Cart {
  store: Good[];
  constructor(items: Good[]) {
    this.store = [...items];
  }
  draw(items: Good[]): void {
    const cartIcon = <HTMLElement>document.querySelector(CartElement.items);

    cartIcon.innerText = items
      .reduce((result, item) => result + item.cart, 0)
      .toString();

    if (Number(cartIcon.innerText) > 0) {
      cartIcon.classList.remove(Display.none);
    } else {
      cartIcon.classList.add(Display.none);
    }
  }

  add(item: Element, icon: HTMLElement, title: string): boolean | undefined {
    const valueInCart = <HTMLElement>item?.querySelector(templateHTML.cart);
    const phraseInStock = <HTMLElement>item?.querySelector(templateHTML.values);
    if (Number(icon.innerText) >= 20) {
      alert('Sorry, but cart is full');
    } else {
      let valueInStock = Number(phraseInStock.innerText.split(' ')[1]);

      if (valueInStock <= 0) {
        valueInStock = 0;
        phraseInStock.innerText = `values: ${valueInStock}`;
        const notification = <HTMLElement>(
          item?.querySelector(templateHTML.notification)
        );
        notification.classList.remove(Display.none);
        setTimeout(() => {
          return notification?.classList.add(Display.none);
        }, 1000);
        return false;
      } else {
        if (!item.classList.contains(templateHTML.active)) {
          item.classList.add(templateHTML.active);
        }
        valueInStock -= 1;
        phraseInStock.innerText = `values: ${valueInStock}`;

        valueInCart.innerText = `${Number(valueInCart.innerText) + 1}`;

        icon.innerText = `${Number(icon.innerText) + 1}`;

        if (Number(icon.innerText) > 0) {
          icon.classList.remove(Display.none);
        }
        valueInCart.classList.remove(Display.none);
        this.addToStore(title, valueInCart.innerText, valueInStock);
        return true;
      }
    }
  }

  remove(item: Element, icon: HTMLElement, title: string): boolean {
    const valueInCart = <HTMLElement>item?.querySelector(templateHTML.cart);
    const phraseInStock = <HTMLElement>item?.querySelector(templateHTML.values);
    let valueInStock = Number(phraseInStock.innerText.split(' ')[1]);

    if (Number(valueInCart.innerText) <= 0) {
      valueInCart.innerText = '0';
      return false;
    } else {
      valueInStock += 1;
      phraseInStock.innerText = `values: ${valueInStock}`;
      valueInCart.innerText = `${Number(valueInCart.innerText) - 1}`;
      icon.innerText = (Number(icon.innerText) - 1).toString();
      if (Number(icon.innerText) <= 0) {
        icon.classList.add(Display.none);
        icon.innerText = '0';
      }
      if (Number(valueInCart.innerText) <= 0) {
        valueInCart.classList.add(Display.none);
        item.classList.remove(templateHTML.active);
      }
      this.removeFromStore(title, valueInCart.innerText, valueInStock);
      return true;
    }
  }

  addToStore(title: string, newItemCart: string, newItemValue: number): void {
    const index = this.store.findIndex(
      (item) => item.title.toUpperCase() === title.toUpperCase()
    );
    this.store[index].cart = Number(newItemCart);
    this.store[index].values = newItemValue;
  }

  removeFromStore(title: string, newItemCart: string, newItemValue: number): void {
    const index = this.store.findIndex(
      (item) => item.title.toUpperCase() === title.toUpperCase()
    );
    this.store[index].cart = Number(newItemCart);
    this.store[index].values = newItemValue;
  }

  controller(event: Event): false | Good[] | undefined {
    const action = (<HTMLElement>event.target).innerText;
    const item = (<HTMLElement>event.target).closest(templateHTML.item);
    const icon = <HTMLElement>document.querySelector(CartElement.items);
    const title = (<HTMLElement>item?.querySelector(templateHTML.title))
      .innerText;
    let answer;
    if (item) {
      if (action === '+') {
        answer = this.add(item, icon, title);
      } else {
        answer = this.remove(item, icon, title);
      }
      if (answer) {
        return this.store;
      } else {
        return false;
      }
    }
  }
}
