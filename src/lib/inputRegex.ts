import {validation} from './validation';

const regexCheck = {
  isNotEmpty: function (str: string) {
    const pattern = /\S+$/g;
    if (str.length === 0) {
      return true;
    } else {
      return pattern.test(str); // returns a boolean
    }
  },
  isNumber: function (str: string) {
    const pattern = /^\d+$/;
    if (str.length === 0) {
      return true;
    } else {
      return pattern.test(str); // returns a boolean
    }
  },
  isNotFirstEmpty: function (str: string) {
    const pattern = /^\S+/;
    if (str.length === 0) {
      return true;
    } else {
      return pattern.test(str); // returns a boolean
    }
  },
};

export const inputRegex = (
  text: string,
  type: 'NOT_EMPTY' | 'NOT_NUMBER' | 'NOT_FIRST_EMPTY',
  cb: any,
  dispatch: any,
) => {
  switch (type) {
    case 'NOT_EMPTY':
      if (!regexCheck.isNotEmpty(text)) {
        return;
      }
      return cb();
    case 'NOT_NUMBER':
      if (!regexCheck.isNumber(text)) {
        return;
      }
      return cb();
    case 'NOT_FIRST_EMPTY':
      if (!regexCheck.isNotFirstEmpty(text)) {
        return;
      }
      return cb();
    default:
      return cb();
  }
};
