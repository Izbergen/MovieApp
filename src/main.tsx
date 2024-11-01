/// src/index.tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { store } from './store';
import './styles/global.css';
import { Provider } from 'react-redux';




createRoot(document.getElementById('root')!).render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
);

