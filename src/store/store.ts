import {createStore, applyMiddleware, compose} from 'redux';
// redux-logger打印logger的中间件，具体效果可以看下图
import {createLogger} from 'redux-logger';
// rootReducer下一步会创建
import RootReducer from './reducers/RootReducer';

const configureStore = (initialState: any) => {
  const store = createStore(
    RootReducer, //reducer模块 下面会创建并解释
    initialState, //state初始值
    compose(applyMiddleware(createLogger())),
  );
  return store;
};

export default configureStore({});
