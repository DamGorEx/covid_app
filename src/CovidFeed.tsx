import React from 'react';
import './App.css';

export default class CovidFeed extends React.Component {

    fetchDataFromServer = (url: string) => {
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                this.setState({products: data});
            })
            .catch(console.log)
    }

    componentDidMount() {
        let jsonFromServer = this.fetchDataFromServer("http://localhost:8080/news/all");
        console.log(jsonFromServer)
    }

    render() {
        return (<div>
            <h1> this is feed</h1>


        </div>);
    }
}

