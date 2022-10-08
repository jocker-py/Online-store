import { target } from 'nouislider';

export abstract class Range {
  range: target;
  min: number;
  max: number;
  minRange: number;
  maxRange: number;

  constructor(type: string, min: number, max: number) {
    this.range = <target>document.getElementById(type);
    this.min = min;
    this.max = max;
    this.minRange = min;
    this.maxRange = max;
  }

  formatTo(value: number): number {
    return Math.trunc(value);
  }
  formatFrom(value: string): number {
    return Math.trunc(Number(value));
  }

  destroy(): void {
    this.range.noUiSlider?.destroy();
  }
}
