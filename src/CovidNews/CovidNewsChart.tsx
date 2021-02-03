import React from 'react'; // get the React object from the react module
import './CovidNewsCs.css';

import CanvasJSReact from "./canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const CovidNewsChart = ({ cases }: {cases:any}) => {
      var dataPoints =[];
	  var percent = 0;
   for(var i=0; i<cases.length; i++){
			if(cases[i].TotalConfirmed > '1000000'){
          percent = percent + cases[i].TotalConfirmed;}
   }

   for(var i=0; i<cases.length; i++){
			if(cases[i].TotalConfirmed > '1000000'){
			var num = cases[i].TotalConfirmed/percent*100;
			var perc = num.toFixed(2);
          dataPoints.push({ y: perc, label: cases[i].Country });}
		 
   }

   var sortedArray: { y: string}[] = dataPoints.sort((n1,n2) => {
	if(parseInt(n1.y) > parseInt(n2.y)){ return 1;}
	if(parseInt(n1.y) < parseInt(n2.y)) { return -1;}
	return 0;
   });
   

    const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Kraje z największą ilością zakażeń COVID-19 "
			},
			data: [{
			indexLabelPlacement: "outside",    //Try Changing to outside
				type: "pie",
				startAngle: 320,
				toolTipContent: "<b>{label}</b>: {y}%",
				
				indexLabelFontSize: 12,
				indexLabel: "{label} - {y}%",
				dataPoints:  dataPoints
				
				
					
				
			}]
		}

      return (
      <div>
        
        <CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		<br/>


			

            

       
    </div>);
    };

    export default CovidNewsChart