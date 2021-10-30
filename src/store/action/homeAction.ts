import actionCreator from './actionCreator';
export const COUNT_ADD = 'COUNT_ADD';
export const COUNT_SUB = 'COUNT_SUB';

export const countAdd = actionCreator('COUNT_ADD', 'num');
export const countSub = (num: number) => {
  return {
    type: COUNT_SUB,
    num: num,
  };
};
