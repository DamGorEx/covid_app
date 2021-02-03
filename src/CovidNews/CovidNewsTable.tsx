import React from 'react';
import './CovidNewsCs.css';


const CovidNewsTable= ({ cases }: {cases:any}) => {

    const searchInput = document.getElementById('searchInput')
    const table = document.getElementById('myTable')
    if(table != null && searchInput != null){
    const trArray = Array.prototype.slice.call(table.querySelectorAll('tbody tr'))

    const filterTable = (event:any) => {
    const searchTerm = event.target.value.toLowerCase()
    trArray.forEach(row => {
    row.classList.add('hidden')
    const tdArray = Array.prototype.slice.call(row.getElementsByTagName('td'))
    tdArray.forEach(cell => {
      if (cell.innerText.toLowerCase().indexOf(searchTerm) > -1) {
        row.classList.remove('hidden')
      } 
    })
  })
}

    searchInput.addEventListener('keyup', filterTable, false)}
 
      return (
    <div>
    <br/>
        <div className="tableSearch">
             <h2 className ="reportedCases">Odnotowane przypadki w poszczególnych krajach:</h2>    
        </div>
        <label className="searchCase">
            <span>Search:</span>
            <input  placeholder="Wpisz nazwę kraju" type="search" id="searchInput"/>
        </label> 
        <div className ="table">
        <table className="tableCases" id="myTable">
        <thead>
            <tr>
                <th>Kod</th>
                <th>Kraj</th>
                <th>Nowe przypadki</th>
                <th className="totalTable">Wszystkie przypadki</th>
                <th>Nowe zgony</th>
                <th className="totalTable">Wszystkie zgony</th>
                <th>Nowe ozdrowienia</th>
                <th className="totalTable">Wszystkie ozdrowienia</th>
            </tr>
            </thead>
             {cases.map((casee:any) => (
             <tbody>
            <tr>
                <td className="otherTd">{casee.CountryCode}</td>
                <td className="countryName">{casee.Country}</td>
                <td className="otherTd">{numberWithSpaces(casee.NewConfirmed)}</td>
                <td className="otherTdTotal">{numberWithSpaces(casee.TotalConfirmed)}</td>
                <td className="otherTd">{numberWithSpaces(casee.NewDeaths)}</td>
                <td className="otherTdTotal">{numberWithSpaces(casee.TotalDeaths)}</td>
                <td className="otherTd">{numberWithSpaces(casee.NewRecovered)}</td>
                <td className="otherTdTotal">{numberWithSpaces(casee.TotalRecovered)}</td>
            </tr>
            </tbody>
             ))}
        </table>
        </div>
        <br/>
        
    </div>);
    };

    function numberWithSpaces(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
   

    export default CovidNewsTable