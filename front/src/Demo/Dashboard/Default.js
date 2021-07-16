import React from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';
import BarDiscreteChart from '../Charts/Nvd3Chart/BarDiscreteChart';
import PieBasicChart from '../Charts/Nvd3Chart/PieBasicChart';
import MultiBarChart from '../Charts/Nvd3Chart/MultiBarChart';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";


class Dashboard extends React.Component {
    render() {
        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Laboratoires</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                    <h2 className="mt-2 f-w-300">800<sub className="text-muted f-14">Participants</sub></h2>   
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Projets En Cours</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                    <h2 className="mt-2 f-w-300">500<sub className="text-muted f-14">Projets</sub></h2>   
                                    </div>
                                    
                                    </div>                                
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Moyenne De Participation Des Laboratoires</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>70%</h3>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={0} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Projets En Cours</Card.Title>
                            </Card.Header>
                            <table class="table table-striped">
                             <thead>
                                 <tr>
                                    <th>
                                    Nom De Labo
                                    </th>
                                    <th>
                                    Description
                                    </th>
                                    <th>
                                    <a>Discipline</a>
                                    </th>
                                    <th>
                                        Date
                                    </th>
                                    <th>
                                        Etat
                                    </th>
                                    <th>
                                        Participation
                                    </th>
                                </tr>
                             </thead>
                             </table>
                            <Card.Body md={0} xl={12}>
                                <Table class="table table-striped table-bordered">
                                <tbody>
                                    <tr>
                                    <th>
                                    <h6 className="mb-0">Nom Laboratoire</h6>
                                    </th>
                                    <th>
                                    <h6 className="mb-0">Description</h6>
                                    </th>
                                    <th>
                                    <h6 className="mb-0"><i/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Discipline</h6>
                                    </th>
                                    <th>
                                    <h6 className="mb-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date</h6>
                                    </th>
                                    <th>
                                     <h6 className="mb-0"><i className="fa fa-circle text-c-red f-10 m-r-15"/>Terminé</h6>
                                    </th>
                                    <th>
                                    </th>
                                    </tr>
                                    <tr>
                                    <th>
                                    <h6 className="mb-0">Nom Laboratoire</h6>
                                    </th>
                                    <th>
                                    <h6 className="mb-0">Description</h6>
                                    </th>
                                    <th>
                                    <h6 className="m-0"><i/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Discipline</h6>
                                    </th>
                                    <th>
                                    <h6 className="mb-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date</h6>
                                    </th>
                                    <th>
                                    <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>En Cours</h6>
                                    </th>
                                    <th>
                                    <a href={DEMO.BLANK_LINK} className="link">Participer</a>
                                    </th>
                                    </tr>
                                    <tr>
                                    <th>
                                    <h6 className="mb-0">Nom Laboratoire</h6>
                                    </th>
                                    <th>
                                    <h6 className="mb-0">Description</h6>
                                    </th>
                                    <th>
                                    <h6 className="m-0"><i/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Discipline</h6>
                                    </th>
                                    <th>
                                    <h6 className="mb-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date</h6>
                                    </th>
                                    <th>
                                    <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>En Cours</h6>
                                    </th>
                                    <th>
                                    <a href={DEMO.BLANK_LINK} className="link">Participer</a>
                                    </th>
                                    </tr>
                                    <tr>
                                    <th>
                                    <h6 className="mb-0">Nom Laboratoire</h6>
                                    </th>
                                    <th>
                                    <h6 className="mb-0">Description</h6>
                                    </th>
                                    <th>
                                    <h6 className="m-0"><i/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Discipline</h6>
                                    </th>
                                    <th>
                                    <h6 className="mb-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date</h6>
                                    </th>
                                    <th>
                                    <h6 className="m-0"><i className="fa fa-circle text-c-red f-10 m-r-15"/>Terminé</h6>
                                    </th>
                                    <th>
                                    
                                    </th>
                                    </tr>
                                    
                                 
                                </tbody>
                                </Table>
                            </Card.Body>
                            
                        </Card>
                        
                    </Col>
                    </Row>
                
                <Row>
                <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Moyenne De L'EEQ</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <BarDiscreteChart/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Répartition De Discipline Dans L'EEQ</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <PieBasicChart/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Contribution Des Laboratoires Dans L'EEQ</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <MultiBarChart/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Dashboard;