import { TargetFilterRange } from '../../confing/enums';
import noUiSlider, { target } from 'nouislider';
import { Good, LocalOptions } from '../../confing/interfaces';
import { Range } from '../../confing/class';

export class PriceRange extends Range {
  constructor() {
    super(TargetFilterRange.price, 0, 1300);
  }

  init(options: LocalOptions): target | undefined {
    this.min = Math.min(...options.price);
    this.max = Math.max(...options.price);
    if (this.range) {
      noUiSlider.create(this.range, {
        start: [this.min, this.max],
        connect: true,
        tooltips: [true, true],
        step: 0.01,
        range: {
          min: this.minRange,
          max: this.maxRange,
        },
      });
      return this.range;
    }
  }

  filterByPrice(item: Good, price: [number, number]): boolean {
    return item.price < price[1] && item.price > price[0];
  }
}
