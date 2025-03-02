import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "@asgardeo/auth-react";
import App from "./App.jsx";
import "./index.css";

const authConfig = {
    signInRedirectURL: "http://localhost:5177/",
    signOutRedirectURL: "http://localhost:5177/",
    clientID: "a6L8WWjBb1c0csenTwUmmFj5ZHka",
    baseUrl: "https://api.asgardeo.io/t/mis372t",
    scope: ["openid", "profile"]
};

createRoot(document.getElementById("root")).render(
    <AuthProvider config={authConfig}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </AuthProvider>
);
