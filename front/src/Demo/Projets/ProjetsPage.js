import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import MaterialTable from "material-table";
import AssignmentIcon from "@material-ui/icons/Assignment";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import "bootstrap/dist/css/bootstrap.min.css";

const ModalPers = (props) => {
  return (
    <>
      <AssignmentIcon
        ref={props.ref}
        color="action"
       onClick={props.showModal}
      />
      <Modal show={props.isOpen} onHide={props.hideModal}>
        <Modal.Header>
          <Modal.Title>Hi {props.row.Intitule_Projet}</Modal.Title>
        </Modal.Header>

        <Modal.Body>props {JSON.stringify(props.row)}</Modal.Body>

        <Modal.Footer>
          <button onClick={props.hideModal}>Cancel</button>

          <button>Save</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

function PositioningActionsColumn() {
  const [isOpen, setIsOpen] = React.useState(false);
 // React.useEffect(()=>{console.log('tbdlat')},[isOpen])

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
     //alert('sdsd')
    setIsOpen(false);
  };

  const [user, SetUser] = React.useState(
    JSON.parse(localStorage.getItem("userLogged"))
  );

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    let data = new FormData();
    data.append("id", user.id);
    axios
      .post("http://localhost:8000/api/getProjetsSpecific", data)
      .then((res) => {
        setData(res.data.projets);
      });
  },[]);

  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };
  const tableIcons = {
    DetailPanel: React.forwardRef((props, ref) => (
      // <AssignmentIcon {...props} ref={ref} color="action" />
      <ModalPers ref={ref} isOpen={isOpen} setIsOpen={setIsOpen} showModal={showModal} hideModal={hideModal}/>
    )),
  };
  return (
    <MaterialTable
      title="La liste des projets :"
      columns={[
        {
          title: "Intitulé",
          field: "Intitule_Projet",
          cellStyle: TableCellStyle,
          headerStyle: TableCellStyle,
        },
        {
          title: "Description",
          field: "Description_Projet",
          cellStyle: TableCellStyle,
          headerStyle: TableCellStyle,
        },
        {
          title: "Année",
          field: "Annee_Projet",
          type: "numeric",
          cellStyle: TableCellStyle,
          headerStyle: TableCellStyle,
        },
        {
          title: "Etat du projet",
          field: "Etat_Projet",
          lookup: { E: "En cours", V: "Validé" },
          cellStyle: TableCellStyle,
          headerStyle: TableCellStyle,
        },
      ]}
      data={data}
      actions={[
          (rowData)=>(
            {
                icon:/*rowData=>*/ React.forwardRef((props, ref) => (
                  // <AssignmentIcon {...props} ref={ref} color="action" />
                  <ModalPers ref={ref} isOpen={isOpen} setIsOpen={setIsOpen} showModal={showModal} hideModal={hideModal} row={rowData}/>
                )),
                tooltip: "Disciplines concérnées",
                onClick: (event, rowData) =>
                //showModal()
                  console.log(rowData),
              }
          )
        ,
        (rowData) => ({
          icon: "delete",
          tooltip: "Delete User",
          onClick: (event, rowData) =>
            alert("You want to delete " + rowData.Intitule_Projet),
          //disabled: rowData.birthYear < 2000,
        }),
      ]}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
}
class ProjetsPage extends Component {
  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card title="Projets d'évaluation externe de qualité" isOption>
              <PositioningActionsColumn />
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default ProjetsPage;
