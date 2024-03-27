import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense } from "react";
import store from "./redux/store";
import "@fontsource/poppins/400.css";
import i18n from "./i18n/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <AuthContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
      </React.StrictMode>
    </AuthContextProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
