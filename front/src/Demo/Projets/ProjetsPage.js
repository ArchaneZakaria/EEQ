import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import MaterialTable from "material-table";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListIcon from "@material-ui/icons/List";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { Button, Tabs, Tab } from "react-bootstrap";
import UcFirst from "../../App/components/UcFirst";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

//Le modal qui permet d'afficher les disciplines qui concernent chaque projet
const DiscplinesConcernees = (props) => {
  const [disciplines, setDisciplines] = React.useState([]);

  React.useLayoutEffect(() => {
    listItems = null;

    setDisciplines([]);

    let data = new FormData();
    data.append("Id_Projet", props.row.Id_Projet);
    axios
      .post("http://localhost:8000/api/getDisciplinesProject", data)
      .then((res) => {
        setDisciplines(res.data.disciplines);
      });
  }, [props.isOpenDisc]);

  let listItems = null;

  React.useEffect(() => {}, [props.row]);

  listItems = disciplines.map((discipline) => (
    <li>{discipline.Libelle_Discipline}</li>
  ));
  const fermer = () => {
    props.hideModal();
  };
  return (
    <>
      <Modal show={props.isOpenDisc} onHide={props.hideModal}>
        <Modal.Header>
          <Modal.Title>Les disciplines concérnées </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ul>{listItems}</ul>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={fermer}>
            <UcFirst text="Fermer" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//Le modal qui permet d'afficher les laboratoires qui participent à chaque projet
const LaboratoiresParticipants = (props) => {
  React.useLayoutEffect(() => {
    setData([]);
    let data = new FormData();
    data.append("Id_Projet", props.row.Id_Projet);
    axios
      .post("http://localhost:8000/api/participationsOfProject", data)
      .then((res) => {
        setData(res.data.participations);
        // console.log(props.row.Id_Projet);
      });
  }, [props.isOpenParticipants]);

  const [dataTab, setData] = React.useState([]);
  const fermer = () => {
    props.hideModalParticipants();
  };
  React.useEffect(() => {}, [props.row]);

  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };
  return (
    <>
      <Modal
        show={props.isOpenParticipants}
        onHide={props.hideModalParticipants}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Les laboratoires participants </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <MaterialTable
            title={props.row.Intitule_Projet}
            columns={[
              {
                title: "Nom du laboratoire",
                field: "Nom_Laboratoire",
                cellStyle: TableCellStyle,
                headerStyle: TableCellStyle,
              },
              {
                title: "Responsable",
                field: "Responsable_Laboratoire",
                cellStyle: TableCellStyle,
                headerStyle: TableCellStyle,
              },
              {
                title: "Adresse",
                field: "Adresse_Laboratoire",
                cellStyle: TableCellStyle,
                headerStyle: TableCellStyle,
              },
              {
                title: "Téléphone",
                field: "Num_Tel_Laboratoire",
                cellStyle: TableCellStyle,
                headerStyle: TableCellStyle,
              },
            ]}
            localization={{
              body: {
                emptyDataSourceMessage: "Pas de laboratoires participants",
                addTooltip: "Ajouter",
                deleteTooltip: "Supprimer",
                editTooltip: "Editer",
                filterRow: {
                  filterTooltip: "Filtrer",
                },
                editRow: {
                  deleteText: "Voulez-vous supprimer cette ligne?",
                  cancelTooltip: "Annuler",
                  saveTooltip: "Enregistrer",
                },
              },
              grouping: {
                placeholder: "Tirer l'entête ...",
                groupedBy: "Grouper par:",
              },
              header: {
                actions: "Actions",
              },
              pagination: {
                labelDisplayedRows: "{from}-{to} de {count}",
                labelRowsSelect: "lignes",
                labelRowsPerPage: "lignes par page:",
                firstAriaLabel: "Première page",
                firstTooltip: "Première page",
                previousAriaLabel: "Page précédente",
                previousTooltip: "Page précédente",
                nextAriaLabel: "Page suivante",
                nextTooltip: "Page suivante",
                lastAriaLabel: "Dernière page",
                lastTooltip: "Dernière page",
              },
              toolbar: {
                addRemoveColumns: "Ajouter ou supprimer des colonnes",
                nRowsSelected: "{0} ligne(s) sélectionée(s)",
                showColumnsTitle: "Voir les colonnes",
                showColumnsAriaLabel: "Voir les colonnes",
                exportTitle: "Exporter",
                exportAriaLabel: "Exporter",
                exportName: "Exporter en CSV",
                searchTooltip: "Chercher",
                searchPlaceholder: "Chercher",
              },
            }}
            data={dataTab}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={fermer}>
            <UcFirst text="Fermer" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//Le modal qui permet la participation à un projet spécifique
const Participation = (props) => {
  const [user, SetUser] = React.useState(
    JSON.parse(localStorage.getItem("userLogged"))
  );
  const participer = () => {
    const data = new FormData();
    data.append("Id_Laboratoire", user.id);
    data.append("Id_Projet", props.row.Id_Projet);

    axios
      .post("http://localhost:8000/api/participateToProject", data)
      .then((res) => {
        //console.log(res);
        if (res.status === 200) {
          Swal.fire({
            title: "Succés",
            text: "Votre demande de participation va étre traiter, et vous serez contacter par mail.",
            type: "success",
          });
          fermer();
        } else {
          Swal.fire({
            title: "Echec",
            text: "Echec de participation",
            type: "warning",
          });
        }
      });
  };

  const fermer = () => {
    props.hideModal();
  };
  return (
    <>
      <Modal show={props.isOpenParticipation} onHide={props.hideModal}>
        <Modal.Header>
          <Modal.Title>Participation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Etes-vous sur de participer à l'évaluation externe de qualité{" "}
          {props.row.Intitule_Projet} ?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-primary" type="submit" onClick={participer}>
            <UcFirst text="Valider" />
          </Button>
          <Button variant="outline-secondary" onClick={fermer}>
            <UcFirst text="Fermer" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const AnnulerParticipation = (props) => {
  const fermer = () => {
    props.hideModal();
  };
  return (
    <>
      <Modal show={props.isOpenCancel} onHide={props.hideModal}>
        <Modal.Header>
          <Modal.Title>Annuler la participation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          êtes-vous sûr de vouloir annuler la participation à l'évaluation externe de
          qualité {props.row.Intitule_Projet} ?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-primary" type="submit">
            <UcFirst text="Oui" />
          </Button>
          <Button variant="outline-secondary" onClick={fermer}>
            <UcFirst text="Non" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//La liste des projets d'EEQ
function ListeProjets() {
  const [isOpenDisc, setisOpenDisc] = React.useState(false);
  const [isOpenParticipants, setisOpenParticipants] = React.useState(false);
  const [isOpenParticipation, setisOpenParticipation] = React.useState(false);
  const [test, setTest] = React.useState(false);
  const show = (modal) => {
    switch (modal) {
      case "disc":
        setisOpenDisc(true);
        break;
      case "participants":
        setisOpenParticipants(true);
        break;
      case "participation":
        setisOpenParticipation(true);
        break;
      default:
        break;
    }
  };

  const hideModalDisc = () => {
    setisOpenDisc(false);
  };

  const hideModalParticipants = () => {
    setisOpenParticipants(false);
  };

  const hideModalParticipation = () => {
    setisOpenParticipation(false);
  };
  const [user, SetUser] = React.useState(
    JSON.parse(localStorage.getItem("userLogged"))
  );

  const [data, setData] = React.useState([]);
  const [clickedRow, setClickedRow] = React.useState([]);

  React.useEffect(() => {
    let data = new FormData();
    data.append("id", user.id);
    axios
      .post("http://localhost:8000/api/getProjetsSpecific", data)
      .then((res) => {
        setData(res.data.projets);
      });
  }, []);

  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };
  const tableIcons = {
    DetailPanel: React.forwardRef((props, ref) => (
      <AssignmentIcon {...props} ref={ref} color="action" />
      //<DiscplinesConcernees ref={ref} isOpenDisc={isOpenDisc} setisOpenDisc={setisOpenDisc} showModal={showModal} hideModal={hideModal}/>
    )),
  };
  return (
    <React.Fragment>
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
        localization={{
          body: {
            emptyDataSourceMessage: "Pas d'enregistrement à afficher",
            addTooltip: "Ajouter",
            deleteTooltip: "Supprimer",
            editTooltip: "Editer",
            filterRow: {
              filterTooltip: "Filtrer",
            },
            editRow: {
              deleteText: "Voulez-vous supprimer cette ligne?",
              cancelTooltip: "Annuler",
              saveTooltip: "Enregistrer",
            },
          },
          grouping: {
            placeholder: "Tirer l'entête ...",
            groupedBy: "Grouper par:",
          },
          header: {
            actions: "Actions",
          },
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "lignes",
            labelRowsPerPage: "lignes par page:",
            firstAriaLabel: "Première page",
            firstTooltip: "Première page",
            previousAriaLabel: "Page précédente",
            previousTooltip: "Page précédente",
            nextAriaLabel: "Page suivante",
            nextTooltip: "Page suivante",
            lastAriaLabel: "Dernière page",
            lastTooltip: "Dernière page",
          },
          toolbar: {
            addRemoveColumns: "Ajouter ou supprimer des colonnes",
            nRowsSelected: "{0} ligne(s) sélectionée(s)",
            showColumnsTitle: "Voir les colonnes",
            showColumnsAriaLabel: "Voir les colonnes",
            exportTitle: "Exporter",
            exportAriaLabel: "Exporter",
            exportName: "Exporter en CSV",
            searchTooltip: "Chercher",
            searchPlaceholder: "Chercher",
          },
        }}
        data={data}
        actions={[
          (rowData) => ({
            icon: /*rowData=>*/ React.forwardRef((props, ref) => (
              <AssignmentIcon {...props} ref={ref} color="action" />
            )),
            tooltip: "Disciplines concérnées",
            onClick: (event, rowData) => {
              show("disc");
              setClickedRow(rowData);
            },
          }),
          (rowData) => ({
            icon: React.forwardRef((props, ref) => (
              <ListIcon {...props} ref={ref} color="action" />
            )),
            tooltip: "Laboratoires participants",
            onClick: (event, rowData) => {
              show("participants");
              setClickedRow(rowData);
            },
          }),

          (rowData) => ({
            icon: EventAvailableIcon,
            tooltip: "Participer au projet",
            onClick: (event, rowData) => {
              show("participation");
              setClickedRow(rowData);
            },
            disabled: rowData.Etat_Projet === "V",
            /*
            function (rowData) {
              const data = new FormData();
              data.append("Id_Laboratoire", user.id);
              data.append("Id_Projet", rowData.Id_Projet);
              let bol=true;
              alert('sdsdsdsd')
              axios.post("http://localhost:8000/api/countOfParticipation",data).then((res)=>{
                console.log(res);
                    if(res.data.count===0){
                      bol= true;
                    }else{
                      bol= false;
                    }
                    
              })
              return bol;
            } */
          }),
        ]}
        icons={tableIcons}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#5d6d7e",
            color: "#FFF",
          },
        }}
      />
      <DiscplinesConcernees
        isOpenDisc={isOpenDisc}
        setisOpenDisc={setisOpenDisc}
        hideModal={hideModalDisc}
        row={clickedRow}
      />
      <LaboratoiresParticipants
        isOpenParticipants={isOpenParticipants}
        setisOpenParticipants={setisOpenParticipants}
        hideModalParticipants={hideModalParticipants}
        row={clickedRow}
      />
      <Participation
        isOpenParticipation={isOpenParticipation}
        setisOpenParticipation={setisOpenParticipation}
        hideModal={hideModalParticipation}
        row={clickedRow}
      />
    </React.Fragment>
  );
}

//La liste des participations du labo connécté
function Participations(props) {
  const [isOpenCancel, setisOpenCancel] = React.useState(false);
  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };
  const [data, setData] = React.useState([]);
  const [user, SetUser] = React.useState(
    JSON.parse(localStorage.getItem("userLogged"))
  );
  const [clickedRow, setClickedRow] = React.useState([]);
  React.useEffect(() => {
    let data = new FormData();
    data.append("Id_Laboratoire", user.id);
    axios
      .post("http://localhost:8000/api/getParticipationsOfLaboratoire", data)
      .then((res) => {
        setData(res.data.participations);
      });
  }, []);
  React.useEffect(() => {
    let data = new FormData();
    data.append("Id_Laboratoire", user.id);
    axios
      .post("http://localhost:8000/api/getParticipationsOfLaboratoire", data)
      .then((res) => {
        setData(res.data.participations);
      });
  }, [props.fresh]);

  const show = () => {
    setisOpenCancel(true);
  };

  const hide = () => {
    setisOpenCancel(false);
  };

  return (
    <React.Fragment>
      <MaterialTable
        title="Mes participations aux EEQ's"
        columns={[
          {
            title: "Intitulé du projet",
            field: "Intitule_Projet",
            cellStyle: TableCellStyle,
            headerStyle: TableCellStyle,
          },
          {
            title: "Année",
            field: "Annee_Projet",
            cellStyle: TableCellStyle,
            headerStyle: TableCellStyle,
          },
          {
            title: "Date de participation",
            field: "Date_Participation",
            cellStyle: TableCellStyle,
            headerStyle: TableCellStyle,
          },
          {
            title: "Etat",
            field: "Etat_Participation",
            lookup: { E: "Traitement de la demande", V: "Validé" },
            cellStyle: TableCellStyle,
            headerStyle: TableCellStyle,
          },
        ]}
        data={data}
        localization={{
          body: {
            emptyDataSourceMessage: "Aucune participation",
            addTooltip: "Ajouter",
            deleteTooltip: "Supprimer",
            editTooltip: "Editer",
            filterRow: {
              filterTooltip: "Filtrer",
            },
            editRow: {
              deleteText: "Voulez-vous supprimer cette ligne?",
              cancelTooltip: "Annuler",
              saveTooltip: "Enregistrer",
            },
          },
          grouping: {
            placeholder: "Tirer l'entête ...",
            groupedBy: "Grouper par:",
          },
          header: {
            actions: "Actions",
          },
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "lignes",
            labelRowsPerPage: "lignes par page:",
            firstAriaLabel: "Première page",
            firstTooltip: "Première page",
            previousAriaLabel: "Page précédente",
            previousTooltip: "Page précédente",
            nextAriaLabel: "Page suivante",
            nextTooltip: "Page suivante",
            lastAriaLabel: "Dernière page",
            lastTooltip: "Dernière page",
          },
          toolbar: {
            addRemoveColumns: "Ajouter ou supprimer des colonnes",
            nRowsSelected: "{0} ligne(s) sélectionée(s)",
            showColumnsTitle: "Voir les colonnes",
            showColumnsAriaLabel: "Voir les colonnes",
            exportTitle: "Exporter",
            exportAriaLabel: "Exporter",
            exportName: "Exporter en CSV",
            searchTooltip: "Chercher",
            searchPlaceholder: "Chercher",
          },
        }}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#5d6d7e",
            color: "#FFF",
          },
        }}
        actions={[
          (rowData) => ({
            icon: CancelPresentationIcon,
            tooltip: "Annuler la participation",
            onClick: (event, rowData) => {
              setClickedRow(rowData);
              show();
            },
          }),
        ]}
      />
      <AnnulerParticipation
        isOpenCancel={isOpenCancel}
        setisOpenCancel={setisOpenCancel}
        hideModal={hide}
        row={clickedRow}
      />
    </React.Fragment>
  );
}

//La page projets
const ProjetsPage = (props) => {
  const [isFresh, setIsFresh] = React.useState(1);
  const refresh = (k) => {
    if (k === "participations") {
      setIsFresh(isFresh + 1);
    }
  };
  return (
    <Aux>
      <Row>
        <Col>
          <Tabs
            defaultActiveKey="projets"
            onSelect={(k) => {
              refresh(k);
            }}
          >
            <Tab eventKey="projets" title="Liste des projets">
              <ListeProjets />
            </Tab>
            <Tab eventKey="participations" title="Mes participations">
              <Participations fresh={isFresh} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Aux>
  );
};

export default ProjetsPage;
