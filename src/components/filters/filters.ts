import { Good, LocalOptions } from '../confing/interfaces';
import { PriceRange } from './range/priceRange';
import { YearRange } from './range/yearRange';
import { ValueRange } from './range/valueRange';
import { target } from 'nouislider';
import { TargetFilterType } from '../confing/enums';

export class Filters {
  priceRange: PriceRange;
  yearRange: YearRange;
  valueRange: ValueRange;
  constructor() {
    this.priceRange = new PriceRange();
    this.yearRange = new YearRange();
    this.valueRange = new ValueRange();
  }

  init(options: LocalOptions): {
    priceSlider: target | undefined;
    yearSlider: target | undefined;
    valueSlider: target | undefined;
  } {
    const priceSlider = this.priceRange.init(options);
    const yearSlider = this.yearRange.init(options);
    const valueSlider = this.valueRange.init(options);
    return { priceSlider, yearSlider, valueSlider };
  }

  filterAll(data: Good[], options: LocalOptions): Good[] {
    data = data.filter((item: Good) => {
      return (
        this.priceRange.filterByPrice(item, options.price) &&
        this.yearRange.filterByYear(item, options.year) &&
        this.valueRange.filterByValue(item, options.value) &&
        this.filterByBrand(item, options.brands) &&
        this.filterByColor(item, options.colors)
      );
    });

    this.markLabel(options);
    return data;
  }

  markLabel(options: LocalOptions): void {
    const labelsBrand: NodeListOf<HTMLLabelElement> = document.querySelectorAll(
      TargetFilterType.brand
    );
    const labelsColor: NodeListOf<HTMLLabelElement> = document.querySelectorAll(
      TargetFilterType.color
    );
    labelsBrand.forEach((brand) => {
      if (options.brands.includes(brand.innerHTML)) {
        brand.classList.add(TargetFilterType.checked);
      } else {
        brand.classList.remove(TargetFilterType.checked);
      }
    });

    labelsColor.forEach((color) => {
      if (options.colors.includes(color.htmlFor)) {
        color.classList.add(TargetFilterType.checked);
      } else {
        color.classList.remove(TargetFilterType.checked);
      }
    });
  }

  filterByBrand(item: Good, brands: string[]): boolean {
    if (brands.length > 0) {
      return brands.includes(item.brand);
    } else {
      return true;
    }
  }

  filterByColor(item: Good, colors: string[]): boolean {
    if (colors.length > 0) {
      return colors.includes(item.color);
    } else {
      return true;
    }
  }

  destroy(): void {
    this.priceRange.destroy();
    this.yearRange.destroy();
    this.valueRange.destroy();
  }
}
