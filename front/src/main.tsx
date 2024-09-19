import AppRouter from "@routes/AppRouter";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import './services/axios-global.js';
import "@styles/global.css"
import {store,persistor } from '@store/index.js';
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <PersistGate  loading={null} persistor={persistor} >
        <AppRouter />
</PersistGate>
    </Provider>
);
