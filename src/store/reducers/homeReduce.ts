import {COUNT_ADD, COUNT_SUB} from '../action/homeAction';
export const initialState = {
  des: '测试initialState',
  count: 0,
};

export default function counter(
  state = initialState,
  action: {tyep: string; [key: string]: any},
) {
  switch (action.type) {
    case COUNT_ADD:
      return {
        ...state,
        count: state.count + action.num,
      };
    case COUNT_SUB:
      return {
        ...state,
        count: state.count + action.num,
      };
    default:
      return {
        ...state,
        count: 0,
      };
  }
}
