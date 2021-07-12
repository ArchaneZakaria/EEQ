import React from 'react';
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBAnimation,
  MDBNavLink,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdbreact';
import { Pie } from 'react-chartjs-2';

import './HomePage.css';
import DocsLink from '../components/docsLink';
import { Bar, HorizontalBar } from 'react-chartjs-2';
import SectionContainer from '../components/sectionContainer';
import axios from 'axios';

// Horizontal Chart
const dataHorizontal = {
  labels: ['Moyenne', 'Labomac', 'Laboratoire moulay youssef', 'Centre de biologie mansour', 'G Lab', 'Laboratoire d\' Analyses Médicales Badr', 'Laboratoire d\' Analyses Médicales Regragui'],
  datasets: [
    {
      label: 'Nombre de participations par labarotoire',
      data: [22, 33, 55, 12, 86, 23, 14],
      fill: false,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }
  ]
};

// barChart
const dataBar = {
  labels: ['2021', '2020', '2019', '2018', '2017', '2016', '2015'],
  datasets: [
    {
      label: "Nombre de laboratoires participants à L'EEQ",
      backgroundColor: '#8CD6FF',
      borderColor: '#00A3FF',
      borderWidth: 1,
      hoverBackgroundColor: '#3FBAFF',
      hoverBorderColor: '#00A3FF',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

// Pie Chart
const dataPie = {
  labels: ['Laboratoires qui ont terminé l evaluation', "Laboratoires qui n'ont pas encore terminé l evaluation"],
  datasets: [
    {
      data: [300, 50],
      backgroundColor: ['#46BFBD','#F7464A'],
      hoverBackgroundColor: ['#5AD3D1','#FF5A5E' ]
    }
  ]
};

class HomePage extends React.Component {
  data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc'
      },
      {
        label: 'Intitulé',
        field: 'heading0',
        sort: 'asc'
      },
      {
        label: 'Description',
        field: 'heading1',
        sort: 'asc'
      },
      {
        label: 'Année',
        field: 'heading2',
        sort: 'asc'
      },
      {
        label: 'Disciplines',
        field: 'heading3',
        sort: 'asc'
      },
      {
        label: 'Date de lancement',
        field: 'heading5',
        sort: 'asc'
      },
      {
        label: 'Laboratoires',
        field: 'heading5',
        sort: 'asc'
      },
      {
        label: 'Etat',
        field: 'heading4',
        sort: 'asc'
      }
    ],
    rows: [
      {
        id: 1,
        heading0: 'EEQ11',
        heading1: 'Evaluation externe de qualité',
        heading2: '2021',
        heading3: 'Biologie',
        heading5: '01/01/2021',
        heading6: '26',
        heading4: 'En cours'
      }
    ]
  };
  scrollToTop = () => window.scrollTo(0, 0);

  inserer = e => {
    alert('click');
    axios.post('http://127.0.0.1:8000/api/addLabo').then(res => {
      alert(JSON.stringify(res));
      if (res.data.status === 200) {
        alert('sdsd');
      }
    });
  };

  render() {
    return (
      <>
        <MDBEdgeHeader color='indigo darken-3' />
        <div className='mt-3 mb-5'>
          <MDBFreeBird style={{ marginBottom: '100px' }}>
            <MDBRow>
              <MDBCol md='10' className='mx-auto float-none white z-depth-1 py-2 px-2'>
                <MDBCardBody className='text-center'>
                  <h2 className='h2-responsive mb-4'>
                    <strong className='font-weight-bold'>
                      <img
                        src='https://lh3.googleusercontent.com/proxy/CaNeP7elnLicMcoGOnvVa5y7QmR9JhqabQQqbHSbPR1uPsH0ktrBf-cx0fmhJMAkHPrn9vLvUgRbO8Ah1hPmI7g'
                        alt='mdbreact-logo'
                        className='pr-2'
                        onClick={this.inserer}
                      />
                      Evaluation externe de qualité
                    </strong>
                  </h2>
                  <MDBRow />
                  <p>Plateforme d'évaluation externe de qualité</p>
                  <p className='pb-4'>Institut National d'Hygiéne</p>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>

          <MDBContainer>
            <MDBRow>
              <SectionContainer header='Projet en cours :'>
                <MDBTable responsive>
                  <MDBTableHead columns={this.data.columns} />
                  <MDBTableBody rows={this.data.rows} />
                </MDBTable>
              </SectionContainer>

              <SectionContainer header='Avancement du projet :'>
                <MDBRow>
                  <Pie data={dataPie} options={{ responsive: true }} />
                </MDBRow>
              </SectionContainer>
              <SectionContainer header='Statistiques générales :'>
                <MDBRow>
                  <Bar data={dataBar} options={{ responsive: true }} />
                </MDBRow>
              </SectionContainer>
              <SectionContainer>
                <MDBRow>
                  <HorizontalBar data={dataHorizontal} options={{ responsive: true }} />
                </MDBRow>
              </SectionContainer>
            </MDBRow>
          </MDBContainer>
        </div>
      </>
    );
  }
}

export default HomePage;
