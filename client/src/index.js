import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserContextProvider } from './context/user_context';
import { ProductsContextProvider } from './context/products_context';
import { CartContextProvider } from './context/cart_context';
import { FilterContextProvider } from './context/filter_context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <UserContextProvider>
        <ProductsContextProvider>
          <FilterContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </FilterContextProvider>
        </ProductsContextProvider>
      </UserContextProvider>
    </Auth0Provider>
  </>
);
