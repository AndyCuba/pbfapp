import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middlewares = [
    applyMiddleware(thunk)
];

const composedEnhancers = composeWithDevTools(
    ...middlewares
);

const store = createStore(
    rootReducer,
    composedEnhancers
);

// REDUX APPLICATION STATE TYPE
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// USESELECTOR TYPE
export type RootState = ReturnType<typeof store.getState>;

// DISPATCH TYPE
export type AppDispatch = typeof store.dispatch;

export default store;