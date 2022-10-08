import { TargetFilterRange } from '../../confing/enums';
import { Good, LocalOptions } from '../../confing/interfaces';
import noUiSlider, { target } from 'nouislider';
import { Range } from '../../confing/class';

export class YearRange extends Range {
  constructor() {
    super(TargetFilterRange.year, 2009, 2022);
  }

  init(options: LocalOptions): target | undefined {
    this.min = Math.min(...options.year);
    this.max = Math.max(...options.year);
    if (this.range) {
      noUiSlider.create(this.range, {
        start: [this.min, this.max],
        connect: true,
        tooltips: [true, true],
        format: { to: this.formatTo, from: this.formatFrom },
        step: 1,
        range: {
          min: this.minRange,
          max: this.maxRange,
        },
      });
      return this.range;
    }
  }

  filterByYear(item: Good, year: [number, number]): boolean {
    return item.year < year[1] && item.year > year[0];
  }
}
