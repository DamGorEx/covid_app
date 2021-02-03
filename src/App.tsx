import React, {useState} from 'react';
import './App.css';
import MenuBar from './MenuBar';
import CovidShop from "./ShopComponents/front/CovidShop";
import CovidFeed from "./CovidFeed";
import CovidNews from "./CovidNews/CovidNews";
import Login from "./components/Login/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {IUser} from "./components/Login/IUser";
import Panel from "./components/LoginPanel/Panel";
import Register from "./components/Register/Register";
import {useSnackbar} from "notistack";


const App = () => {
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const {enqueueSnackbar} = useSnackbar();
    const logout = () => {
        setUser(undefined);
        enqueueSnackbar('You have been logged out!', {variant: 'info'});
    }
    const Home = () => (
        <div>
            <h1>Home Page</h1>
        </div>
    );
    return (
        <Router>
            <div>
                <MenuBar user={user} logout={logout}/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/feed" component={CovidFeed}/>
                    <Route path="/news" component={CovidNews}/>
                    <Route path="/shop" component={CovidShop}/>
                    <Route path="/panel" render={() => <Panel user={user!}/>}/>
                    <Route path="/login" render={() => <Login setUser={setUser}/>}/>
                    <Route path="/register" render={() => <Register/>}/>
                </Switch>
            </div>
        </Router>
    );


}

export default App;
