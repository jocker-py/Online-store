import { Categories } from '../confing/enums';

export class Controller {
  deleteActive(): void {
    document
      .querySelector(`.${Categories.active}`)
      ?.classList.remove(Categories.active);
  }

  setActive(item: HTMLElement): void {
    item.classList.add(Categories.active);
  }

  findParent(event: EventTarget | null): string {
    const parent: HTMLLIElement | null = (<HTMLElement>event).closest('li');

    if (parent?.innerText) {
      this.deleteActive();
      this.setActive(parent);
    }
    return parent?.innerText || 'all';
  }
}
