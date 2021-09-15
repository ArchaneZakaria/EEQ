import React, { Suspense } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Aux from "../../hoc/_Aux";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import MaterialTable from "material-table";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ListIcon from "@material-ui/icons/List";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { Button, Tabs, Tab } from "react-bootstrap";
import UcFirst from "../../App/components/UcFirst";
import AsyncSelect from "react-select/async";
//import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Loader from "../../App/layout/Loader";


//Le modal qui permet d'afficher les disciplines qui concernent chaque projet
const DiscplinesConcernees = (props) => {
  const [disciplines, setDisciplines] = React.useState([]);
  const[loading,setLoading]=React.useState(false)
  React.useLayoutEffect(() => {
    setLoading(true)
    listItems = null;

    setDisciplines([]);

    let data = new FormData();
    data.append("Id_Projet", props.row.Id_Projet);
    axios
      .post("http://localhost:8000/api/getDisciplinesProject", data)
      .then((res) => {
        setDisciplines(res.data.disciplines);
        setLoading(false)
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
    {
      loading && <Loader/>
    }
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
    setLoadMsg("Chargement des données...")
    let data = new FormData();
    data.append("Id_Projet", props.row.Id_Projet);
    axios
      .post("http://localhost:8000/api/participationsOfProject", data)
      .then((res) => {
        setData(res.data.participations);
        setLoadMsg("Aucun laboratoire ne participe dans ce projet.")
        // console.log(props.row.Id_Projet);
      });
  }, [props.isOpenParticipants]);
  
  const [loadMsg,setLoadMsg]=React.useState("Chargement des données...")
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
                emptyDataSourceMessage: loadMsg,
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

const errorMessage = (error) => {
  return (
    <Form.Text
      className="text-danger mb-1"
      color="danger"
      style={{ color: "red" }}
    >
      {error}
    </Form.Text>
  );
};
//Le modal qui permet la participation à un projet spécifique
const Participation = (props) => {
  const[loading,setLoading]=React.useState(false)
  const schema = yup.object().shape({
    Motivation_Participation: yup
      .string()
      .trim()
      .required("La motivation de participation est obligatoiore !"),
    Conditions: yup
      .boolean()
      .oneOf([true], "L'acceptation des conditions est obligatoire."),
  });
  const { register, handleSubmit, errors, formState, reset, control } = useForm(
    {
      resolver: yupResolver(schema),
    }
  );
  const [user, SetUser] = React.useState(
    JSON.parse(localStorage.getItem("userLogged"))
  );
  const participer = (dt) => {
    setLoading(true)
    const data = new FormData();
    data.append("Id_Laboratoire", user.id);
    data.append("Id_Projet", props.row.Id_Projet);
    data.append("Motivation_Participation", dt.Motivation_Participation);
    axios
      .post("http://localhost:8000/api/participateToProject", data)
      .then((res) => {
        //console.log(res);
        setLoading(false)
        if (res.status === 200) {
          Swal.fire({
            title: "Succés",
            text: "Votre demande de participation va étre traiter, et vous serez contacter par mail.",
            type: "success",
          });
          fermer();
          reset();
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
    reset();
  };

  const onSubmit = () => {
    alert("dsdsd");
  };
  return (
    <>
    {
      loading && <Loader/>
    }
      <Modal show={props.isOpenParticipation} onHide={props.hideModal}>
        <Modal.Header>
          <Modal.Title>Participation {props.row.Intitule_Projet}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Motivation</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                {...register("Motivation_Participation")}
              />
              {formState.errors.Motivation_Participation &&
                errorMessage(formState.errors.Motivation_Participation.message)}
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Check
                type="checkbox"
                label="J'ai lu et j'accepte les conditions de participation."
                {...register("Conditions")}
              />
              {formState.errors.Conditions &&
                errorMessage(formState.errors.Conditions.message)}
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-primary"
            type="submit"
            onClick={handleSubmit(participer)}
          >
            <UcFirst text="Participer" />
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
  const[loading,setLoading]=React.useState(false)
  const fermer = () => {
    props.hideModal();
  };

  const annuler = () => {
    setLoading(true)
    const data = new FormData();
    data.append("Id_Participation", props.row.Id_Participation);

    axios
      .post("http://localhost:8000/api/annulerParticipation", data)
      .then((res) => {
        //console.log(res);
        setLoading(false)
        if (res.status === 200) {
          Swal.fire({
            title: "Succés",
            text: "Participation rejetée.",
            type: "success",
          });
          props.setIsFresh();
          fermer();
        } else {
          Swal.fire({
            title: "Echec",
            text: "Echec d'annulation",
            type: "warning",
          });
        }
      });
  };
  return (
    <>
    {
      loading && <Loader/>
    }
      <Modal show={props.isOpenCancel} onHide={props.hideModal}>
        <Modal.Header>
          <Modal.Title>Rejeter la participation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          êtes-vous sûr de vouloir rejeter la participation à l'évaluation
          externe de qualité {props.row.Intitule_Projet} ?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-primary" type="submit" onClick={annuler}>
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

const CloturerProjet = (props) => {
  const[loading,setLoading]=React.useState(false)
  const fermer = () => {
    props.hideModal();
  };
  const cloturer = () => {
    setLoading(true)
    const data = new FormData();
    data.append("Id_Projet", props.row.Id_Projet);
    axios
      .post("http://localhost:8000/api/cloturerProjet", data)
      .then((result) => {
        setLoading(false)
        props.refresh();
        if (result.status === 200) {
          Swal.fire({
            title: "Succés",
            text: "Projet cloturé.",
            type: "success",
          });
          fermer();
        } else {
          Swal.fire({
            title: "Echec",
            text: "Echec de cloturation",
            type: "warning",
          });
        }
      });
  };
  return (
    <>
    {
      loading && <Loader/>
    }
      <Modal show={props.isOpenCloturation} onHide={props.hideModal}>
        <Modal.Header>
          <Modal.Title>Cloturer le projet</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          êtes-vous sûr de vouloir cloturer le projet :{" "}
          {props.row.Intitule_Projet} ?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-primary" type="submit" onClick={cloturer}>
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

const ApprouverParticipation = (props) => {
  const[loading,setLoading]=React.useState(false)
  const fermer = () => {
    props.hideModal();
  };
  const approuver = () => {
    setLoading(true)
    const data = new FormData();
    data.append("Id_Participation", props.row.Id_Participation);

    axios
      .post("http://localhost:8000/api/approuverParticipation", data)
      .then((res) => {
        setLoading(false)
        //console.log(res);
        if (res.status === 200) {
          Swal.fire({
            title: "Succés",
            text: "Participation approuvée.",
            type: "success",
          });
          props.setIsFresh();
          fermer();
        } else {
          Swal.fire({
            title: "Echec",
            text: "Echec d'approuvation",
            type: "warning",
          });
        }
      });
  };
  return (
    <>
    {
      loading && <Loader/>
    }
      <Modal show={props.isOpenCancel} onHide={props.hideModal}>
        <Modal.Header>
          <Modal.Title>Approuver la participation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          êtes-vous sûr de vouloir approuver la participation à l'évaluation
          externe de qualité {props.row.Intitule_Projet} ?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-primary" type="submit" onClick={approuver}>
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
function ListeProjets(props) {
  const [isOpenDisc, setisOpenDisc] = React.useState(false);
  const [isOpenParticipants, setisOpenParticipants] = React.useState(false);
  const [isOpenParticipation, setisOpenParticipation] = React.useState(false);
  const [isOpenCloturation, setisOpenCloturation] = React.useState(false);
  const [isFresh, setIsFresh] = React.useState(1);
  const [actions, setActions] = React.useState([]);
  const [test, setTest] = React.useState(false);

const refresh=()=>{
  setIsFresh(isFresh+1)
}



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
      case "cloturation":
        setisOpenCloturation(true);
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

  const hideModalCloturation = () => {
    setisOpenCloturation(false);
  };

  const [user, SetUser] = React.useState(
    JSON.parse(localStorage.getItem("userLogged"))
  );

  const [data, setData] = React.useState([]);
  const [clickedRow, setClickedRow] = React.useState([]);
  const [loadMsg,setLoadMsg]=React.useState("Chargement des données...")
  

  const fetchProjets = () => {
    setLoadMsg("Chargement des données...")
    let data = new FormData();
    data.append("id", user.id);
    data.append("role", user.role);
    axios
      .post("http://localhost:8000/api/getProjetsSpecific", data)
      .then((res) => {
        setData(res.data.projets);
        setLoadMsg("Pas d'enregistrement à afficher")
      });
  };
  const labo = () => {
    setActions([
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
        icon: EventAvailableIcon,
        tooltip: "Participer au projet",
        onClick: (event, rowData) => {
          show("participation");
          setClickedRow(rowData);
        },
        disabled: rowData.Etat_Projet === "C" || user.role === 1,
      }),
    ]);
  };
  const admin = () => {
    setActions([
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
        icon: React.forwardRef((props, ref) => (
          <CheckCircleOutlineIcon {...props} ref={ref} color="action" />
        )),
        tooltip: "Cloturer le projet",
        onClick: (event, rowData) => {
          setClickedRow(rowData);
          show("cloturation");
        },
        disabled: rowData.Etat_Projet === "C",
      }),
    ]);
  };
  React.useEffect(() => {
    fetchProjets();
    if (user.role === 1) {
      admin();
      
    } else {
      labo();
    }
  }, []);

  React.useEffect(() => {
    fetchProjets();
    if (user.role === 1) {
      admin();
      
    } else {
      labo();
    }
  }, isFresh);

  React.useEffect(() => {
    fetchProjets();
  }, [props.fresh]);

  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };
  const tableIcons = {
    DetailPanel: React.forwardRef((props, ref) => (
      <AssignmentIcon {...props} ref={ref} color="action" />
      //<DiscplinesConcernees ref={ref} isOpenDisc={isOpenDisc} setisOpenDisc={setisOpenDisc} showModal={showModal} hideModal={hideModal}/>
    )),
  };
  return (
    <React.Fragment>
      <Suspense fallback={<h1>Loading profile...</h1>}>
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
              lookup: { E: "Ouvert", V: "Validé", C: "Cloturé" },
              cellStyle: TableCellStyle,
              headerStyle: TableCellStyle,
            },
          ]}
          localization={{
            body: {
              emptyDataSourceMessage: loadMsg,
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
          actions={actions}
          icons={tableIcons}
          options={{
            exportButton: true,
            actionsColumnIndex: -1,
            headerStyle: {
              backgroundColor: "#5d6d7e",
              color: "#FFF",
            },
            rowStyle:rowData=>{
              if(rowData.Etat_Projet==='C'){
                return {color:"#FF0000"}
              }
            }
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
        <CloturerProjet
        refresh={refresh}
          isOpenCloturation={isOpenCloturation}
          setisOpenCloturation={setisOpenCloturation}
          hideModal={hideModalCloturation}
          row={clickedRow}
        />
      </Suspense>
    </React.Fragment>
  );
}

//La liste des participations du labo connécté
function Participations(props) {
  const [isOpenCancel, setisOpenCancel] = React.useState(false);
  const [isOpenApp, setisOpenApp] = React.useState(false);
  const [isFresh, setIsFresh] = React.useState(1);
  const [columns, setColumns] = React.useState([]);
  const [actions, setActions] = React.useState([]);
  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };
  const [data, setData] = React.useState([]);
  const [user, SetUser] = React.useState(
    JSON.parse(localStorage.getItem("userLogged"))
  );
  const [clickedRow, setClickedRow] = React.useState([]);
  const [loadMsg,setLoadMsg]=React.useState("Chargement des données...")

  const labo = () => {
    setColumns([
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
        lookup: { E: "Traitement de la demande", V: "Validé", A: "Annulé" },
        cellStyle: TableCellStyle,
        headerStyle: TableCellStyle,
      },
    ]);
    setActions([]);
  };
  const admin = () => {
    setColumns([
      {
        title: "Nom du laboratoire",
        field: "Nom_Laboratoire",
        cellStyle: TableCellStyle,
        headerStyle: TableCellStyle,
      },
      {
        title: "Intitulé du projet",
        field: "Intitule_Projet",
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
        title: "Motivation",
        field: "Motivation_Participation",
        cellStyle: TableCellStyle,
        headerStyle: TableCellStyle,
      },
    ]);
    setActions([
      (rowData) => ({
        icon: CheckBoxIcon,
        tooltip: "Approuver",
        onClick: (event, rowData) => {
          setClickedRow(rowData);
          showApprouver();
        },
      }),
      (rowData) => ({
        icon: CancelPresentationIcon,
        tooltip: "Rejeter",
        onClick: (event, rowData) => {
          setClickedRow(rowData);
          show();
        },
        disabled: rowData.Etat_Participation === "A",
      }),
    ]);
  };
  const refresh = () => {
    setIsFresh(isFresh + 1);
  };
  const fetchParticipations=()=>{
    setLoadMsg("Chargement des données...")
    if (user.role === 2) {
      let data = new FormData();
      data.append("Id_Laboratoire", user.id);
      data.append("role","user")
      axios
        .post("http://localhost:8000/api/getParticipationsOfLaboratoire", data)
        .then((res) => {
          setLoadMsg("Pas d'enregistrement à afficher")
          setData(res.data.participations);
          labo();
          
        });
    } else {
      axios
        .get("http://localhost:8000/api/getDemandesParticipations")
        .then((res) => {
          setLoadMsg("Pas d'enregistrement à afficher")
          setData(res.data.participations);
          admin();
          
        });
    }
  }
  React.useEffect(() => {
    
    fetchParticipations()
  }, []);
  React.useEffect(() => {
    fetchParticipations();
  }, [props.fresh, isFresh]);

  const show = () => {
    setisOpenCancel(true);
  };

  const showApprouver = () => {
    setisOpenApp(true);
  };
  const hide = () => {
    setisOpenCancel(false);
  };
  const hideApprouver = () => {
    setisOpenApp(false);
  };

  return (
    <React.Fragment>
      <MaterialTable
        title="Participations aux EEQ's"
        columns={columns}
        data={data}
        localization={{
          body: {
            emptyDataSourceMessage: loadMsg,
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
        actions={actions}
      />
      <AnnulerParticipation
        isOpenCancel={isOpenCancel}
        setisOpenCancel={setisOpenCancel}
        hideModal={hide}
        row={clickedRow}
        setIsFresh={refresh}
      />
      <ApprouverParticipation
        isOpenCancel={isOpenApp}
        setisOpenCancel={setisOpenApp}
        hideModal={hideApprouver}
        row={clickedRow}
        setIsFresh={refresh}
      />
    </React.Fragment>
  );
}

function CreerProjet(props) {
  const[loading,setLoading]=React.useState(false)
  const [optionss, setOptions] = React.useState([
    { value: "biologie", label: "biologie" },
    { value: "bactérologie", label: "bactérologie" },
    { value: "virologie", label: "virologie" },
  ]);
  React.useEffect((options1) => {
    fetchOptions();
  }, []);
  function fetchOptions(input) {
    //alert("jdjjfjdf")
    axios.get("http://localhost:8000/api/getDisciplines").then((res) => {
      let options1 = res.data.map(function (val) {
        return { value: val.Id_Discipline, label: val.Libelle_Discipline };
      });
      //alert(JSON.stringify(options1))
      setOptions([options1][0]);
      return options1;
    });
  }

  const schema = yup.object().shape({
    Intitule_Projet: yup
      .string()
      .trim()
      .required("L'intitulé du projet est obligatoire."),
    Annee_Projet: yup
      .string()
      .trim()
      .required("l'année du projet est obligatoire."),
    Description_Projet: yup
      .string()
      .required("La description du projet est obligatoire."),
  });

  const {
    register,
    handleSubmit,
    errors,
    formState,
    reset,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setLoading(true)
    axios.post("http://localhost:8000/api/addProjet", data).then((res) => {
      if (res.status === 200) {
        setLoading(false)
        Swal.fire({
          title: "Succés",
          text: "Projet créé.",
          type: "success",
        });
        setValue("disciplines", []);
        setValue("Intitule_Projet", "");
        setValue("Annee_Projet", "");
        setValue("Description_Projet", "");
        //console.log(res)
        //fetchOptions()
      } else {
        Swal.fire({
          title: "Echec",
          text: "Echec de création",
          type: "warning",
        });
      }
    });
  };
  return (
    <React.Fragment>
      {
      loading && <Loader/>
    }
      <h4>Créer un nouveau projet</h4>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Intitulé</Form.Label>
          <Form.Control
            type="text"
            placeholder="Veuillez saisir l'intitulé"
            {...register("Intitule_Projet")}
          />
          {formState.errors.Intitule_Projet &&
            errorMessage(formState.errors.Intitule_Projet.message)}
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Année</Form.Label>
          <Form.Control
            type="number"
            placeholder="Veuillez saisir l'année"
            {...register("Annee_Projet")}
          />
          {formState.errors.Annee_Projet &&
            errorMessage(formState.errors.Annee_Projet.message)}
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            {...register("Description_Projet")}
          />
          {formState.errors.Description_Projet &&
            errorMessage(formState.errors.Description_Projet.message)}
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Disciplines concérnées</Form.Label>
          <Controller
            className="input-group mb-4"
            control={control}
            defaultValue=" "
            name="disciplines"
            render={({ field: { onChange, value, ref } }) => (
              <AsyncSelect
                menuPlacement="top"
                id="select-disciplines"
                inputRef={ref}
                value={optionss.filter((c) => value.includes(c.value))}
                onChange={(val) => onChange(val.map((c) => c.value))}
                //loadOptions={fetchOptions()} // function that executes HTTP request and returns array of options
                isMulti
                placeholder={"Disciplines"}
                defaultOptions={optionss} // load on render
                // defaultOptions={[id: 0, label: "Loading..."]} // uncomment this and comment out the line above to load on input change
              />
            )}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          Créer
        </Button>
      </Form>
    </React.Fragment>
  );
}

//La page projets qui contienne tous les composants
const ProjetsPage = (props) => {
  const [isFresh, setIsFresh] = React.useState(1);
  const [user, SetUser] = React.useState(
    JSON.parse(localStorage.getItem("userLogged"))
  );
  const refresh = (k) => {
    if (
      k === "participations" ||
      k === "demandes" ||
      k === "creation" ||
      k === "projets"
    ) {
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
              <ListeProjets fresh={isFresh} />
            </Tab>
            {user.role === 2 && (
              <Tab eventKey="participations" title="Participations">
                <Participations fresh={isFresh} />
              </Tab>
            )}
            {user.role === 1 && (
              <Tab eventKey="demandes" title="Demandes de participations">
                <Participations fresh={isFresh} />
              </Tab>
            )}
            {user.role === 1 && (
              <Tab eventKey="creation" title="Créer">
                <CreerProjet />
              </Tab>
            )}
          </Tabs>
        </Col>
      </Row>
    </Aux>
  );
};

export default ProjetsPage;
