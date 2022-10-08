import { Good } from '../confing/interfaces';
import { Selection } from '../confing/enums';
import { SortFunc } from '../confing/types';

const Sort: SortFunc = (data, howToSort) => {
  const newData: Good[] = [...data];
  const select = <HTMLSelectElement>document.querySelector(`${Selection.root}`);
  const optionGroup: HTMLCollectionOf<HTMLOptionElement> =
    select.getElementsByTagName(Selection.option);

  for (let i = 0; i < optionGroup.length; i++) {
    if (optionGroup[i].value === howToSort) {
      optionGroup[i].selected = true;
    } else {
      optionGroup[i].selected = false;
    }
  }

  switch (howToSort) {
    case 'first':
      return newData.sort((a: Good, b: Good): number => {
        if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
        if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
        return 0;
      });
    case 'last':
      return newData.sort((a: Good, b: Good): number => {
        if (a.title.toUpperCase() > b.title.toUpperCase()) return -1;
        if (a.title.toUpperCase() < b.title.toUpperCase()) return 1;
        return 0;
      });
    case 'new':
      return newData.sort((a: Good, b: Good): number => b.year - a.year);
    case 'old':
      return newData.sort((a: Good, b: Good): number => a.year - b.year);
    case 'cheap':
      return newData.sort((a: Good, b: Good): number => a.price - b.price);
    case 'expencive':
      return newData.sort((a: Good, b: Good): number => b.price - a.price);
    default:
      return newData;
  }
};

export default Sort;
