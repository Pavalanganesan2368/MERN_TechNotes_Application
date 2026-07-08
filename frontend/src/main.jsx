import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store.jsx";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.jsx';
import './index.css';
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

if (process.env.NODE_ENV === "production") disableReactDevTools();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App /> }/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
