import ReactDOM from 'react-dom/client';
import Root from './react/root.js'
import store from './redux/store.js';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Root />
    </Provider>
);