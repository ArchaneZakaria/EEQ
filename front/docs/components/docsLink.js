import React from 'react';
import { MDBRow, MDBIcon } from 'mdbreact';

const DocsLink = ({ title, href }) => {
  return (
    <>
      <MDBRow className='align-items-center mt-5'>
        <h4 className='grey-text' style={{ margin: '0px' }}>
          <strong className='font-weight-bold'>{title}</strong>
        </h4>
        
      </MDBRow>
      <hr className='mb-5' />
    </>
  );
};

export default DocsLink;
