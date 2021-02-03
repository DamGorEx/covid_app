import React from 'react';
import './CovidNewsCs.css';


const CovidGlobalData = ({ global }: {global:any}) => {
    

    var globalCase= "" +  global.TotalConfirmed;
    globalCase = numberWithSpaces(globalCase);

    var globalDea = "" +  global.TotalDeaths;
    globalDea = numberWithSpaces(globalDea);

    var globalReco = "" +  global.TotalRecovered;
    globalReco = numberWithSpaces(globalReco);
      return (
      <div>
       
        <div className="globalCases">
            <img className="imageCases" src="iconsCovidNews/icon_cases.png" alt="Icons_cases"/>
            <h2 className="cases">Zarażenia: </h2>
            <h2 className="casesName"> {globalCase} </h2>
            <img className="imageDeath" src="iconsCovidNews/icon_deaths.png" alt="Icons_cases"/>
            <h2 className="deaths">Zgony: </h2>
            <h2 className="deathsName">{globalDea}</h2>
            <img className="imageRecovery" src="iconsCovidNews/icon_recovery.png" alt="Icons_cases"/>
            <h2 className="recovery">Ozdrowienia:</h2>
            <h2 className="recoveryName">{globalReco}</h2>

        </div>
    <br/>
    </div>);
    };

    function numberWithSpaces(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}   



export default CovidGlobalData