import React from 'react';
import './App.css';
import MenuBar from './MenuBar';
import CovidShop from "./ShopComponents/front/CovidShop";
import CovidFeed from "./CovidFeed";
import CovidNews from "./CovidNews/CovidNews";
import FormMedicalCheck from "./FormMedicalCheck"
import ShopBasket from "./ShopComponents/front/ShopSummary";
import Login from "./components/Login/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Panel from "./components/LoginPanel/Panel";
import Register from "./components/Register/Register";
import FormEditUserData from "./FormEditUserData";

// const enqueueSnackbar = () => useSnackbar();
export default class App extends React.Component {

    state = {
        user: undefined,
    }
    logout = () => {
        // let enqueueSnackbar = useSnackbar();
        this.setState({user: undefined});
        localStorage.removeItem("user");
        localStorage.removeItem("logInfo");
        // enqueueSnackbar.closeSnackbar('You have been logged out!');
    }
    Home = () => (
        <body>
    <div id="container">
            {/* <div id="header">
                CORONAVIRUS PORTAL
            </div> */}

        <div className="text-welcome">
            NAJWAZNIEJSZE INFORMACJE ZE SWIATA DOTYCZACE PANDEMII
        </div>

        <div id="contentindex">
            <div id="contentindexL">
            </div>

            <div id="contentindexR">
                <p className="pStyle2">The reasons swine flu could return</p>
                <p className="pStyle"> 
                    The last global flu pandemic was declared over in 2010, but the virus responsible is still with us today – and scientists fear human activity is increasing the risk of new influenza A outbreaks.
                </p>
            </div>
        </div>

        <div id="contentindex2">
            <div id="contentindexL2">
            <p className="pStyle2">Researchers are working to prevent a dangerous coronavirus</p>
                <p className="pStyle"> 
                    Seventy-five percent of the newly emerging diseases currently affecting people originate in animals, according to Predict, a US government-funded collaboration by infectious disease experts across the globe. Already, Predict scientists have identified 1,200 new zoonotic, or animal-borne, diseases. But scientists estimate there are some 700,000 more zoonotic diseases we don’t even know about yet.
                </p>
            </div>

            <div id="contentindexR2">
            </div>
        </div>

        <div id="contentindex3">
            <div id="contentindexL3">
            </div>

            <div id="contentindexR3">
                <p className="pStyle2">The death rate for Nipah virus is up to 75% and it has no vaccine.</p>
                <p className="pStyle"> 
                    It was 3 January 2020, and Supaporn Wacharapluesadee was standing by, awaiting a delivery. Word had spread that there was some kind of respiratory disease affecting people in Wuhan, China, and with the Lunar New Year approaching, many Chinese tourists were headed to neighbouring Thailand to celebrate.
                </p>
            </div>
        </div>

        <div id="contentindex4">
            <div id="contentindexL4">
            <p className="pStyle2">Stopping the next one: What could the next pandemic be?</p>
                <p className="pStyle"> 
                    The Covid-19 pandemic took much of the world by surprise. But not everyone. For years, epidemiologists and other experts have warned that we have been setting ourselves up for a global pandemic.
                </p>
            </div>

            <div id="contentindexR4">
            </div>
        </div>

        <div className="footer">
            <div className="footerTop">
                CONTENT MANAGEMENT SYSTEM - PJATK
            </div>

            <div className="footerBottom">
                <div className="footerBottomLeft">
                    <a href="link1.html" className="footerOption"> LINK1 </a><div className="pStyle3"></div>
                    <a href="link2.html" className="footerOption"> LINK2 </a><div className="pStyle3"></div>
                    <a href="link3.html" className="footerOption"> LINK3 </a><div className="pStyle3"></div>
                    <a href="link4.html" className="footerOption"> LINK4 </a><div className="pStyle3"></div>
                </div>
                <div className="footerBottomRight">
                    DOMINIKA ŁUGOWSKA <div className="pStyle3"></div>
                    MICHELLE HEROK <div className="pStyle3"></div>
                    DAMIAN GORAJ <div className="pStyle3"></div>
                    MARCIN CHOJNACKI
                </div>
            </div>

        </div>

    </div>

</body>
    );
    render() {
        if (!this.state.user) {
            const user = localStorage.getItem("user");
            console.log("user local" + user);
            if (user != null) {
                this.setState({user: JSON.parse(user)});
            }
        }
        // @ts-ignore
        return (
            <Router>
                <div>
                    <MenuBar user={this.state.user} logout={this.logout}/>
                    <Switch>
                        <Route path="/" exact component={this.Home}></Route>
                        <Route path="/feed" component={CovidFeed}></Route>
                        <Route path="/news" component={CovidNews}></Route>
                        <Route path="/shop" component={CovidShop}></Route>
                        <Route path="/medicalCheck" render={() => <FormMedicalCheck user={this.state.user!}/>}/>
                        <Route path="/editdata" component={FormEditUserData}></Route>
                        <Route path="/panel" render={() => <Panel user={this.state.user!}/>}/>
                        <Route path="/login" render={() => <Login setUser={(u) => {
                            this.setState({user: u})
                        }}/>}/>
                        <Route path="/register" render={() => <Register/>}/>
                        <Route path="/mybasket" component={ShopBasket}></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
