import React, {FormEvent} from 'react';
import './App.css';
import {IUser} from "./components/Login/IUser";
import Popup from "./ShopComponents/front/Popup";
import {Redirect} from "react-router-dom";

type UserExtd = {
    name: string,
    surname: string,
    email: string,
    number: string,
    street: string,
    zipcode: string,
    city: string;
}
type PanelProps = {
    user: IUser
}

export default class CovidMedicalCheck extends React.Component<PanelProps> {
    state = {
        userExt: undefined,
        redirect: false,
        logginErr: false,
        city: "",
        date: "",
        freeSlots: [],
        pickedSlot: "",
        email: "",
        submitOk: false,
        submitFailed: false
    }

    constructor(props: PanelProps) {
        super(props);
        console.log(props);

    }

    componentDidUpdate(prevProps: Readonly<PanelProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.user !== this.props.user && !localStorage.getItem("user")) this.setState({logginErr: true})
    }

    findSlot = () => {
        const logInfo = localStorage.getItem("logInfo") as string;
        let header = {headers: {'Authorization': logInfo}};
        if (this.state.city && this.state.date) {
            fetch("http://localhost:8080/medCheck/free/" + this.state.city + "/" + this.state.date + "", header)
                .then(resp => {
                    if (resp.status === 200) {
                        console.log("SUCCESSS")
                        return resp.json();
                    } else if (resp.status === 401) {
                        console.log("Unauthorized!!");
                    }
                })
                .then((data) => {
                    this.setState({freeSlots: data});
                    console.log(this.state.freeSlots);
                })
                .catch((e) => {
                    console.log("error zlapany!!!");
                });
        }
    }
    onChange = (e: any) => {
        this.setState({[e.target.name]: e.target.value});
        if (!e.target.name) this.setState({pickedSlot: e.target.value});
    }

    onSubmit = (e: FormEvent<any>) => {
        e.preventDefault();
        let wrapper = {
            slot: this.state.pickedSlot,
            email: this.state.email,
            city: this.state.city
        }
        const pathVariables = "slot=" + this.state.pickedSlot + "email=" + this.state.email + "city=" + this.state.city + "date=" + this.state.date;
        const logInfo = localStorage.getItem("logInfo") as string;
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization': logInfo},
        };
        fetch("http://localhost:8080/medCheck" + this.state.city + "/" + this.state.date + "?" + pathVariables
            , requestOptions)
            .then(resp => {
                if (resp.status === 200) {
                    console.log("SUCCESSS")
                    return resp.json();
                } else {
                    this.setState({submitFailed: true});
                    ;
                }
            })
            .then((data) => {
                this.setState({freeSlots: data});
                console.log(this.state.freeSlots);
            })
            .catch((e) => {
                console.log("error zlapany!!!");
                this.setState({submitFailed: true});
            });

    }

    togglePopup() {
        this.setState({
            redirect: true
        });
    }

    componentDidMount() {
        const json: string | null = localStorage.getItem("user");
        const logInfo = localStorage.getItem("logInfo") as string;
        let user: IUser | undefined = undefined;
        if (json != null) {
            user = JSON.parse(json);
            console.log(user);
            // @ts-ignore
            let email: string = user.credentials.login as string;
            this.setState({email: email});
            let header = {headers: {'Authorization': logInfo}};
            fetch("http://localhost:8080/user/getInfo/" + email, header)
                .then(resp => {
                    if (resp.status === 200) {
                        console.log("SUCCESSS")
                        return resp.json();
                    } else if (resp.status === 401) {
                        console.log("Unauthorized!!")
                        this.setState({logginErr: true})
                    }
                })
                .then((data) => {
                    this.setState({userExt: data});
                })
                .catch((e) => {
                    console.log("error zlapany!!!");
                    this.setState({logginErr: true})
                });
        }
    }

    render() {
        let name: string = "";
        let surName: string = "";
        let email: string = "";
        let phone: string = "";
        let fieldRO = true;
        let fieldRO2 = this.state.freeSlots.length === 0
        if (this.state.userExt !== undefined) {
            //@ts-ignore
            const extUser: UserExtd = this.state.userExt;
            name = extUser.name;
            surName = extUser.surname;
            email = extUser.email;
            phone = extUser.number;
            fieldRO = false;
        }
        let shouldRedirect = this.state.redirect;
        if (shouldRedirect) return (<Redirect to={"/"}/>);
        if (this.state.logginErr) return (<Popup text='Wylogowałes się!' closePopup={this.togglePopup.bind(this)}/>)
        return (
        <body> 
            <div id="container">

            <div className="text-welcome">
                ZAPISZ SIĘ NA BADANIA
            </div>

            <div className="wizyta-dane">
              <p className="wizyta-dane-headers">DANE PERSONALNE</p>
            </div>

            <div className="title-space"></div>





            <form onSubmit={this.onSubmit}>
              <div className="wizyta-dane-input">
                     <div className="wizyta-dane-input-name">
                            <label htmlFor="name">NAZWA: <abbr title="required" aria-label="required">*</abbr></label>
                            <div className="space-between-input"></div>
                            <label htmlFor="email">EMAIL: <abbr title="required" aria-label="required">*</abbr></label>
                            <div className="space-between-input"></div>
                            <label htmlFor="phone">TELEFON:</label>


                     </div>
                     <div className="wizyta-dane-input-value">
                     <input readOnly={true} className="name-input" type="text" name="name" id="name" value={name} required/>
                     <input value={surName} readOnly={true} className="name-input-nazwisko" type="text" name="surname" id="surname" required/>
                     <div className="space-between-input"></div>
                     <input value={email} readOnly={true} className="name-input" type="text" name="email"id="email"/>
                     <div className="space-between-input"></div>
                     <input value={phone} readOnly={true} className="name-input" type="number" name="phone" id="phone"/>

                            {/* <input onChange={this.onChange} className="name-input" type="text" name="name" id="name" placeholder="podaj imie" required/> */}
                            {/* <input onChange={this.onChange} className="name-input-nazwisko" type="text" name="surname" id="surname" placeholder="podaj nazwisko" required/> */}
                            {/* <div className="space-between-input"></div> */}
                            {/* <input onChange={this.onChange} className="name-input" type="date" name="date" id="date" placeholder="podaj date urodzenia" required/> */}
                            {/* <div className="space-between-input"></div> */}
                            {/* <input onChange={this.onChange} className="name-input" type="text" name="email" id="email"
                            placeholder="podaj adres e-mail"/>
                            <div className="space-between-input"></div>
                            <input onChange={this.onChange} className="name-input" type="number" name="phone" id="phone"
                            placeholder="podaj numer telefonu"/>
                            <div className="space-between-input"></div>
                            <input onChange={this.onChange} className="name-input" type="text" name="street" id="street"
                            placeholder="podaj adres"/> */}
                     </div>
              </div>
              
              <div className="title-space"></div>
              <div className="title-space"></div>

              <div className="wizyta-dane">
                     <p className="wizyta-dane-headers">WYBIERZ TERMIN WIZYTY</p>
              </div>

              <div className="title-space"></div>

              <div className="wizyta-dane-input">
                     <div className="wizyta-dane-input-name">
                            <label htmlFor="city">MIASTO: <abbr title="required" aria-label="required">*</abbr></label>
                            <div className="space-between-input"></div>
                            <label htmlFor="dateCheck">DATA: <abbr title="required" aria-label="required">*</abbr></label>
                     </div>
                     <div className="wizyta-dane-input-value">
                     <input onChange={this.onChange} className="name-input" type="text" name="city" id="city" placeholder="podaj miasto" required/>
                     <div className="space-between-input"></div>
                     <input onChange={this.onChange} className="name-input" type="date" name="date" id="date" required/>
                     <div className="space-between-input"></div>




                    <button onClick={this.findSlot} className="form-button-znajdz">Znajdź wolny slot</button>
                    {/* <div> */}
                        <label htmlFor="shpMethod">WYBIERZ WOLNY SLOT: <abbr title="required" aria-label="required">*</abbr></label>
                        <select onChange={this.onChange} className="slotPick" id="browsers">u
                            {this.state.freeSlots.map(p => {
                                console.log("fieldRO: " + fieldRO2);
                                return (
                                    <option>{p[0]}:00</option>
                                )
                            })}
                        </select>
                    {/* </div> */}
                    
                    <div className="title-space"></div>
                    <div className="title-space"></div>


                    {/* <div className="form-buttons">
                        <input readOnly={fieldRO2} type="submit" className="form-button-submit" value="ZAPISZ SIĘ"/>
                        <a href="" className="form-button-cancel"> ANULUJ</a>
                    </div> */}


                            {/* <input onChange={this.onChange} className="name-input" type="text" name="city" id="city" placeholder="podaj miasto" required/> */}
                            {/* <div className="space-between-input"></div> */}
                            {/* <input onChange={this.onChange} className="name-input" type="date" name="dateFrom" id="dateFrom" required/> */}
                            {/* <input onChange={this.onChange} className="name-input-nazwisko" type="date" name="dateTo" id="dateTo" required/> */}
                     </div>
              </div>

              {/* <div className="title-space"></div> */}
              {/* <div className="title-space"></div> */}

              <div className="form-buttons">
                        <input readOnly={fieldRO2} type="submit" className="form-button-submit" value="ZAPISZ SIĘ"/>
                        <a href="" className="form-button-cancel">ANULUJ</a>
              </div>

       </form>









            
            {/* <main className="mainForm">
                <form onSubmit={this.onSubmit} className="formMedical">
                    <h1 className="headerMedical"> Zapisz się na badania</h1>
                    <h2 className="header2"> Dane personalne</h2>
                    <label htmlFor="name">Nazwa: <abbr title="required" aria-label="required">*</abbr></label>
                    <input readOnly={true} className="nameInput" type="text" name="name"
                           id="name"
                           value={name} required/>
                    <input value={surName} readOnly={true} className="surnameInput" type="text" name="surname"
                           id="surname"
                           required/>

                    <label htmlFor="email">Email: <abbr title="required" aria-label="required">*</abbr></label>
                    <input value={email} readOnly={true} className="emailInput" type="text" name="email"
                           id="email"/>
                    <label htmlFor="phone">Telefon:</label>
                    <input value={phone} readOnly={true} className="phoneInput" type="number" name="phone"
                           id="phone"/>

                    <h2 className="headerDetails"> Wykonanie badania</h2>
                    <label htmlFor="city">Miasto: <abbr title="required" aria-label="required">*</abbr></label>
                    <input onChange={this.onChange} className="cityInput" type="text" name="city" id="city"
                           placeholder="podaj miasto" required/>
                    <label htmlFor="dateCheck">Data: <abbr title="required" aria-label="required">*</abbr></label>
                    <input onChange={this.onChange} className="dateFromInput" type="date" name="date" id="date"
                           required/>
                    <button onClick={this.findSlot} className="formButtonSubmit">Znajdź wolny slot</button>
                    <div>
                        <label htmlFor="shpMethod">Wybierz wolny slot: <abbr title="required"
                                                                             aria-label="required">*</abbr></label>
                        <select onChange={this.onChange} className="slotPick" id="browsers">u
                            {this.state.freeSlots.map(p => {
                                console.log("fieldRO: " + fieldRO2);
                                return (
                                    <option>{p[0]}:00</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="formButtons">
                        <input readOnly={fieldRO2} type="submit" className="formButtonSubmit" value="Zapisz się"/>
                        <a href="" className="formButtonCancel"> Anuluj</a>
                    </div>
                </form>
            </main> */}



<div>
          <div className="footer">
              <div className="footerTop">
                  CONTENT MANAGEMENT SYSTEM - PJATK
              </div>

              <div className="footerBottom">
                <div className="footerBottomLeft">
                    DOMINIKA ŁUGOWSKA <div className="pStyle3"></div>
                    MICHELLE HEROK <div className="pStyle3"></div>
                    DAMIAN GORAJ <div className="pStyle3"></div>
                    MARCIN CHOJNACKI
                </div>
                <div className="footerBottomRight">
                    PJATK <div className="pStyle3"></div>
                    Koszykowa 86,<div className="pStyle3"></div>
                    02-008 Warszawa
                </div>
              </div>
          </div>
        </div>
        </div>



      </body>);
    }
}

