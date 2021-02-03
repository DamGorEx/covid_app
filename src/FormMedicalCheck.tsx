
﻿import React, {ChangeEvent, FormEvent} from 'react';
import './App.css';

export default class CovidMedicalCheck extends React.Component {

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit = (e: FormEvent<any>) => {
        e.preventDefault();
        console.log(JSON.stringify(this.state));
    }

    render() {
        return (<div>
            <main className="mainForm">
                <form onSubmit={this.onSubmit} className="formMedical">
                    <h1 className="headerMedical"> Zapisz się na badania</h1>
                    <h2 className="header2"> Dane personalne</h2>
                    <label htmlFor="name">Nazwa: <abbr title="required" aria-label="required">*</abbr></label>
                    <input onChange={this.onChange} className="nameInput" type="text" name="name" id="name"
                           placeholder="podaj imie" required/>
                    <input onChange={this.onChange} className="surnameInput" type="text" name="surname" id="surname"
                           placeholder="podaj nazwisko"
                           required/>

                    <label htmlFor="dateOfBirth">Data urodzenia: <abbr title="required"
                                                                       aria-label="required">*</abbr></label>
                    <input onChange={this.onChange} className="dateInput" type="date" name="date" id="date"
                           placeholder="podaj date urodzenia"
                           required/>
                    <label htmlFor="email">Email: <abbr title="required" aria-label="required">*</abbr></label>
                    <input onChange={this.onChange} className="emailInput" type="text" name="email" id="email"
                           placeholder="podaj adres e-mail"/>
                    <label htmlFor="phone">Telefon:</label>
                    <input onChange={this.onChange} className="phoneInput" type="number" name="phone" id="phone"
                           placeholder="podaj numer telefonu"/>
                    <label htmlFor="address">Adres:</label>
                    <input onChange={this.onChange} className="addressInput" type="text" name="street" id="street"
                           placeholder="podaj adres"/>

                    <h2 className="headerDetails"> Wykonanie badania</h2>
                    <label htmlFor="city">Miasto: <abbr title="required" aria-label="required">*</abbr></label>
                    <input onChange={this.onChange} className="cityInput" type="text" name="city" id="city"
                           placeholder="podaj miasto" required/>
                    <label htmlFor="dateCheck">Data: <abbr title="required" aria-label="required">*</abbr></label>
                    <input onChange={this.onChange} className="dateFromInput" type="date" name="dateFrom" id="dateFrom"
                           required/>
                    <input onChange={this.onChange} className="dateToInput" type="date" name="dateTo" id="dateTo"
                           required/>

                    <div className="formButtons">
                        <input type="submit" className="formButtonSubmit" value="Zapisz się"/>
                        <a href="" className="formButtonCancel"> Anuluj</a>
                    </div>
                </form>
            </main>
        </div>);
    }
}

