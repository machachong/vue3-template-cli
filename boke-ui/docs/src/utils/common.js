import { formate } from './format';
export const filterName = function (name, kw) {
  // kw和name都转为小写
  name = name.toLowerCase();
  if (kw) {
    kw = kw.toLowerCase();
  }

  if (
    name.indexOf(kw) != -1 ||
    formate.getFullChars(name).toLowerCase().indexOf(kw) != -1 ||
    formate.getCamelChars(name).toLowerCase().indexOf(kw) != -1
  ) {
    return true;
  }
  return false;
};
