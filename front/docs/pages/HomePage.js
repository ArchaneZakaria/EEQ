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
  MDBNavLink
} from 'mdbreact';
import './HomePage.css';
import {
  Bar,
} from 'react-chartjs-2';
import SectionContainer from '../components/sectionContainer';
import axios from 'axios';

// barChart
const dataBar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class HomePage extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);

  inserer =  (e)=>{
    alert('click');
    axios.post('http://127.0.0.1:8000/api/addLabo').then(res=>{
      alert(JSON.stringify(res));
      if(res.data.status===200){
        alert('sdsd')
      }
    })
  }
   

  render() {
    return (
      <>
        <MDBEdgeHeader color='indigo darken-3' />
        <div className='mt-3 mb-5'>
          <MDBFreeBird>
            <MDBRow>
              <MDBCol
                md='10'
                className='mx-auto float-none white z-depth-1 py-2 px-2'
              >
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
                  <p className='pb-4'>
                    Institut National d'Hygiéne
                  </p>
                  
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
          <MDBContainer>
            <MDBRow>
              
            </MDBRow>
          </MDBContainer>
        </div>
      </>
    );
  }
}

export default HomePage;
