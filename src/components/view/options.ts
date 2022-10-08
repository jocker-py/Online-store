import GOODS from '../../assets/goods';
import { LocalOptions } from '../confing/interfaces';
export class Options {
  options: LocalOptions;

  constructor() {
    this.options = {
      categorie: this.getOptions().categorie,
      sort: this.getOptions().sort,
      items: this.getOptions().items,
      price: this.getOptions().price,
      year: this.getOptions().year,
      value: this.getOptions().value,
      brands: this.getOptions().brands,
      colors: this.getOptions().colors,
    };
  }

  saveOptions(obj: LocalOptions): void {
    localStorage.setItem('options', JSON.stringify(obj));
  }

  defaultOptions(): LocalOptions {
    return {
      categorie: 'all',
      sort: 'first',
      items: this.getItems(),
      price: [0, 1300],
      year: [2009, 2022],
      value: [0, 13],
      brands: [],
      colors: [],
    };
  }

  getOptions(): LocalOptions {
    const options = localStorage.getItem('options');
    if (options) {
      return JSON.parse(options) as LocalOptions;
    } else {
      return this.defaultOptions();
    }
  }

  getItems(){
    const items = [];
    for(let i = 0; i < GOODS.length; i++){
      items.push({...GOODS[i]});
    }
    return items

  }
  
}
