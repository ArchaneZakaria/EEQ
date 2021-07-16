import React from 'react';
import NVD3Chart from 'react-nvd3';

const datum = [
    {
        key: "Cumulative Return",
        values: [{
            "label": "2013",
            "value": 29.765957771107,
            "color": "#3ebfea"
        }, {
            "label": "2014",
            "value": 10,
            "color": "#04a9f5"
        }, {
            "label": "2015",
            "value": 32.807804682612,
            "color": "#ff8a65"
        }, {
            "label": "2016",
            "value": 96.45946739256,
            "color": "#1de9b6"
        }, {
            "label": "2017",
            "value": 50.25434030906893,
            "color": "#4C5667"
        }, {
            "label": "2018",
            "value": 98.079782601442,
            "color": "#69CEC6"
        }, {
            "label": "2019",
            "value": 13.925743130903,
            "color": "#a389d4"
        }, {
            "label": "2020",
            "value": 200.59264,
            "color": "#FE8A7D"
        }]
    }
];

class BarDiscreteChart extends React.Component {

    render() {
        return <NVD3Chart tooltip={{enabled: true}} type="discreteBarChart" datum={datum} x="label" y="value" height={300} showValues />
    }
}

export default BarDiscreteChart;