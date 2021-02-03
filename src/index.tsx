import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {SnackbarProvider} from "notistack";


if (process.env.NODE_ENV !== "development")
    console.log = () => {};

ReactDOM.render(
    <SnackbarProvider maxSnack={3} anchorOrigin={{vertical:'top', horizontal:'right'}}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </SnackbarProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
