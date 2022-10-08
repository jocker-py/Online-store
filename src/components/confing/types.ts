import { Good } from './interfaces';

export type SortFunc = (data: Good[], howToSort: string) => Good[];
