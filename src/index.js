import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer/reducer'
import authReducer from './store/reducer/auth'
import 'bootstrap/dist/css/bootstrap.min.css';



const logger = store =>{
    return next=>{
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState())
            return result;
        }
    }
}

const rootReducer = combineReducers({
    reducer:reducer,
    auth:authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));
store.subscribe(()=>{
    console.log(['Subscription'], store.getState())
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
