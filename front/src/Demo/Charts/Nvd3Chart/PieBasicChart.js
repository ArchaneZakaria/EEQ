import React from "react";
import NVD3Chart from "react-nvd3";
import axios from "axios";

const datum = [
  { key: "Discipline 1", y: 29, color: "#ff8a65" },
  { key: "Discipline 2", y: 25, color: "#f4c22b" },
  { key: "Discipline 3", y: 32, color: "#04a9f5" },
  { key: "Discipline 4", y: 196, color: "#3ebfea" },
  { key: "Discipline 5", y: 55, color: "#4F5467" },
  { key: "Discipline 6", y: 98, color: "#1de9b6" },
  { key: "Discipline 7", y: 46, color: "#a389d4" },
  { key: "Discipline 8", y: 19, color: "#0f3bc0" },
];

class PieBasicChart extends React.Component {
  state = {
    stats: [],
  };

  //let tata;
  componentDidMount() {
    axios.get("http://localhost:8000/api/getStatsOfDisciplines").then((res) => {
        let data=res.data.stats.map((stt) => ({
        key: `${stt.Libelle_Discipline}`,
        y: `${stt.counta}`,
        color: "#" + Math.floor(Math.random()*16777215).toString(16),
      }));
    
      this.setState({
        stats: data,
      });
      /* 
          return res.data.stats.map((stt) => ({
          key: `${stt.Libelle_Discipline}`,
          y: `${stt.counta}`,
          color: "#a389d4",
        }));*/
    });
  }

  convert() {
    
      return this.state.stats.map((stt) => ({
        key: `${stt.Libelle_Discipline}`,
        y: `${stt.counta}`,
        color: "#" + Math.floor(Math.random()*16777215).toString(16),
      }));
    
  }

  render() {
    return (
      <NVD3Chart
        id="chart"
        height={300}
        type="pieChart"
        datum={this.state.stats}
        x="key"
        y="percent"
        labelType="percent"
      />
    );
  }
}

export default PieBasicChart;
