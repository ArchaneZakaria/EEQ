import React from 'react';
import {
  MDBEdgeHeader,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  MDBIcon,
  MDBAnimation
} from 'mdbreact';
import MenuLink from '../components/menuLink';

const CSSPage = () => {
  return (
    <>
    <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
      <MDBAnimation type='zoomIn' duration='500ms'>
        <MDBContainer>
          <MDBRow>
            <MDBCol md='8' className='mx-auto'>
                <MDBJumbotron className='mt-3'>
                  <h1 className='text-center'>
                  <MDBIcon icon="project-diagram" className='indigo-text mr-w' />
                   Projets
                  </h1>
                  <ul className='list-unstyled example-components-list'>
                    <MenuLink to='/projets/liste-projets' title='Listes des projets' />
                    <MenuLink to='/css/hover' title='Echantillons' />
                    <MenuLink to='/css/icons' title='Formulaires' />
                    <MenuLink to='/css/jumbotron' title='Participations' />
                  </ul>
                </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBAnimation>
    </>
  );
};

export default CSSPage;
