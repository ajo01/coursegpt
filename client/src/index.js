import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ChakraProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ChakraProvider>
    </Provider>
)
