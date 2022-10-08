import { TargetFilterRange } from '../../confing/enums';
import noUiSlider, { target } from 'nouislider';
import { Good, LocalOptions } from '../../confing/interfaces';
import { Range } from '../../confing/class';

export class ValueRange extends Range {
  constructor() {
    super(TargetFilterRange.value, 0, 13);
  }
  init(options: LocalOptions): target | undefined {
    this.min = Math.min(...options.value);
    this.max = Math.max(...options.value);
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

  filterByValue(item: Good, value: [number, number]): boolean {
    return item.values <= value[1] && item.values >= value[0];
  }
}
