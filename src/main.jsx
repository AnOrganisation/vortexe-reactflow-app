import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Auth0Provider
        domain="dev-1gwcs1v8g8nbvx78.us.auth0.com"
        clientId="TgYpMpIOPhDIjXGG6yRqpqSYntT447U5"
        authorizationParams={{
          redirect_uri:
            "https://ashy-forest-080bb421e.5.azurestaticapps.net/app",
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth0Provider>
    </NextUIProvider>
  </React.StrictMode>
);
