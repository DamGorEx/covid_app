import React from 'react'; // get the React object from the react module
import './App.css';
import CovidGlobalData from './CovidGlobalData';
import CovidNewsDate from './CovidNewsDate';
import CovidNewsTable from './CovidNewsTable';


class CovidNews extends React.Component {

	state = {
        cases: [],
        global: {},
        date: Date
      }

	 componentDidMount() {
        fetch('https://api.covid19api.com/summary')
        .then(res => res.json())
        .then((data) => {
          this.setState({ cases: data.Countries })
          this.setState({ global: data.Global})
          this.setState({ date: data.Date})
        })
        .catch(console.log)
      }
	render() {
		return(
        <div>
        <CovidNewsDate date = {this.state.date} />
		<CovidGlobalData global = {this.state.global}  />
        <CovidNewsTable cases = {this.state.cases}  />
        </div>)
	}
}


export default CovidNews; // expose the CovidNews component to other modules