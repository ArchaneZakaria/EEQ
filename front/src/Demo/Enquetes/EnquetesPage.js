import React, { Suspense } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Aux from "../../hoc/_Aux";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";
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
import ListAltIcon from "@material-ui/icons/ListAlt";

const Reponses = (props) => {
  const [loadMsg, setLoadMsg] = React.useState("Chargement des données...");
  const [dataTab, setData] = React.useState([]);
  const fermer = () => {
    props.hide();
  };

  React.useLayoutEffect(() => {
    if (props.isOpenReponses) {
      setData([]);
      setLoadMsg("Chargement des données...");
      let data = new FormData();
      data.append("Id_Participation", props.row.Id_Participation);
      //data.append("role","admin")
      axios
        .post("http://localhost:8000/api/getReponseOfParticipation", data)
        .then((res) => {
          setData(res.data.reponses);
          setLoadMsg("Aucune réponse.");
        });
    }
  }, [props.isOpenReponses]);
  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };
  return (
    <>
      <Modal show={props.isOpenReponses} onHide={props.hide} size="lg">
        <Modal.Header>
          <Modal.Title>Réponses </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <MaterialTable
            title={"Réponses"}
            columns={[
              {
                title: "Question",
                field: "Enonce_Question",
                cellStyle: TableCellStyle,
                headerStyle: TableCellStyle,
                editable: "never",
              },
              {
                title: "Réponse",
                field: "Contenu_Reponse",
                cellStyle: TableCellStyle,
                headerStyle: TableCellStyle,
                editable: "never",
              },
              {
                title: "Evaluation",
                field: "Remarque_Evaluation_Individuelle",
                cellStyle: TableCellStyle,
                headerStyle: TableCellStyle,
                editable: "onUpdate",
              },
            ]}
            localization={{
              body: {
                emptyDataSourceMessage: loadMsg,
                addTooltip: "Ajouter",
                deleteTooltip: "Supprimer",
                editTooltip: "Evaluer",
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
            editable={{
              //onRowUpdateTriggred: rowData => console.log("Row editing opend"),
              onRowUpdate: (newData, oldData) => 
              new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  axios.post(
                    "http://localhost:8000/api/evaluationOfReponse",
                    newData
                  )
                  .then((res) => {
                    //setData([ ...dataTab, data );
                    //alert(JSON.stringify(res));
                    //if()
                    
                  });
                  console.log(dataTab)
                  const data = [...dataTab];
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  setData([...data]);
                  console.log(data)
                  resolve();
                }
                
              }, 1000);
            })
                
                /*
                axios.post(
                    "http://localhost:8000/api/evaluationOfReponse",
                    newData
                  )
                  .then((res) => {
                    //setData([ ...dataTab, data );
                    //alert(JSON.stringify(res));
                    //if()
                  });
                new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  console.log(dataTab)
                  const data = dataTab;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  setData(data)

                }
                resolve();
              }, 1000);
            })
                 */
            
                /**new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    const data = [...dataTab];
                    data.push(newData);
                    /*
                    axios
                  .post(
                    "http://localhost:8000/api/evaluationOfReponse",
                    newData
                  )
                  .then((res) => {
                    setData([ ...dataTab, data );
                    //alert(JSON.stringify(res));
                    //if()
                  });
                     
                  }, 600);
                });
                 */
                
                //console.log(JSON.stringify(dataTab));
              ,

              /* 
            new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
            */
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

const FormulaireOfProject = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [valid, setValid] = React.useState(true);
  let questions;

  React.useLayoutEffect(() => {
    if (props.isOpenForm) {
      setLoading(true);
      let data = new FormData();
      data.append("Id_Projet", props.row.Id_Projet);
      axios
        .post("http://localhost:8000/api/getFormOfProject", data)
        .then((res) => {
          questions = res.data.questions;
          let questionsDiv = document.getElementById("questions");
          const keyDiscipline = Object.keys(questions);
          keyDiscipline.forEach((keyDisciplin, index) => {
            let titreDiscipline = document.createElement("H4");
            titreDiscipline.textContent =
              "Questions relatifs à " + keyDisciplin + " :";
            titreDiscipline.style.color = "#0989D1";
            questionsDiv.appendChild(titreDiscipline);
            const keys = Object.keys(questions[keyDisciplin]);
            keys.forEach((key, index) => {
              if (questions[keyDisciplin][key]["Type_Question"] == 1) {
                let label = document.createElement("LABEL");
                label.textContent =
                  questions[keyDisciplin][key]["Enonce_Question"];
                label.setAttribute("class", "font-weight-bold");
                let newQst = document.createElement("INPUT");
                newQst.setAttribute(
                  "name",
                  questions[keyDisciplin][key]["Id_Question"]
                );
                newQst.setAttribute("type", "text");
                newQst.setAttribute("class", "opt form-control eequestions");
                newQst.setAttribute(
                  "id",
                  questions[keyDisciplin][key]["Id_Question"]
                );
                questionsDiv.appendChild(label);
                questionsDiv.appendChild(newQst);
              } else if (questions[keyDisciplin][key]["Type_Question"] == 3) {
                const keysOfOptions = Object.keys(
                  questions[keyDisciplin][key]["options"]
                );
                let label = document.createElement("LABEL");
                label.setAttribute("class", "font-weight-bold");
                label.textContent =
                  questions[keyDisciplin][key]["Enonce_Question"];
                questionsDiv.appendChild(label);
                questionsDiv.appendChild(document.createElement("BR"));
                keysOfOptions.forEach((key1, index) => {
                  let radioInput = document.createElement("input");
                  radioInput.setAttribute("type", "radio");
                  radioInput.setAttribute(
                    "value",
                    questions[keyDisciplin][key]["options"][key1]["Id_Option"]
                  );
                  radioInput.setAttribute(
                    "name",
                    questions[keyDisciplin][key]["Id_Question"]
                  );
                  radioInput.setAttribute(
                    "id",
                    questions[keyDisciplin][key]["Id_Question"]
                  );
                  radioInput.setAttribute("class", "eequestions");
                  radioInput.text =
                    questions[keyDisciplin][key]["options"][key1]["Id_Option"];
                  questionsDiv.appendChild(radioInput);
                  let label = document.createElement("LABEL");
                  label.textContent =
                    questions[keyDisciplin][key]["options"][key1][
                      "Libelle_Option"
                    ];
                  questionsDiv.appendChild(label);
                  questionsDiv.appendChild(document.createElement("BR"));
                });
              } else {
                const keysOfOptions = Object.keys(
                  questions[keyDisciplin][key]["options"]
                );
                let label = document.createElement("LABEL");
                label.textContent =
                  questions[keyDisciplin][key]["Enonce_Question"];
                label.setAttribute("class", "font-weight-bold");
                questionsDiv.appendChild(label);
                questionsDiv.appendChild(document.createElement("BR"));
                keysOfOptions.forEach((key1, index) => {
                  let radioCheck = document.createElement("input");
                  radioCheck.setAttribute("type", "checkbox");

                  radioCheck.setAttribute("class", "eequestions");
                  radioCheck.setAttribute(
                    "name",
                    questions[keyDisciplin][key]["Id_Question"]
                  );
                  radioCheck.value =
                    questions[keyDisciplin][key]["options"][key1]["Id_Option"];
                  questionsDiv.appendChild(radioCheck);
                  let label = document.createElement("LABEL");
                  label.textContent =
                    questions[keyDisciplin][key]["options"][key1][
                      "Libelle_Option"
                    ];
                  questionsDiv.appendChild(label);
                  questionsDiv.appendChild(document.createElement("BR"));
                });
              }
            });
          });
        });

      setLoading(false);
    }
  }, [props.isOpenForm]);

  React.useLayoutEffect(() => {}, []);

  const fermer = () => {
    props.hide();
  };

  const Soumettre = (event) => {
    //alert(JSON.stringify(props.row))
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.target);
    setValid(true);
    let validation = true;
    for (var pair of data.entries()) {
      if (!pair[1]) {
        //alert("Champ vide !")
        validation = false;
        setValid(false);
      } else {
      }
    }
    if (validation === true) {
      let dataForm = new FormData();
      dataForm.append("Id_Participation", props.row.Id_Participation);
      let index;
      for (var pair of data.entries()) {
        dataForm.append(pair[0], pair[1]);
        //index=pair[0];
      }
      //alert("reussi");
      /*
      for (var pair of dataForm.entries()) {
      console.log(pair[0] + ", " + pair[1]);
      }
       */

      axios
        .post("http://localhost:8000/api/submitFormulaire", dataForm)
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            fermer();
            Swal.fire({
              title: "Succés",
              text: "Formulaire envoyée avec succés.",
              type: "success",
            });
          } else {
            Swal.fire({
              title: "Echec",
              text: "Echec d'envoi.",
              type: "warning",
            });
          }
        });
    } else {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}

      <Modal show={props.isOpenForm} onHide={props.hide} size={"lg"}>
        <Modal.Header>
          <Modal.Title>Formulaire de : {props.row.Intitule_Projet}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={Soumettre}>
            <div id="questions"></div>
            <Button
              variant="outline-primary"
              type="submit"
              //onClick={Soumettre}
            >
              <UcFirst text="Soumettre" />
            </Button>
            {!valid && errorMessage("Veuillez saisir toutes les réponses !")}
          </form>
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

///////////////////////////////////////////////////////////////////////////////////////////////////////

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

//La liste des participations du labo connécté
function Participations(props) {
  const [isOpenCancel, setisOpenCancel] = React.useState(false);
  const [isOpenApp, setisOpenApp] = React.useState(false);
  const [isOpenForm, setisOpenForm] = React.useState(false);
  const [isOpenReponses, setisOpenReponses] = React.useState(false);
  const [isFresh, setIsFresh] = React.useState(1);
  const [columns, setColumns] = React.useState([]);
  const [actions, setActions] = React.useState([]);
  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };
  const [data, setData] = React.useState([]);
  const [user, SetUser] = React.useState(
    JSON.parse(localStorage.getItem("userLogged"))
  );
  const [clickedRow, setClickedRow] = React.useState([]);
  const [loadMsg, setLoadMsg] = React.useState("Chargement des données...");

  const showForm = () => {
    setisOpenForm(true);
  };
  const hideForm = () => {
    setisOpenForm(false);
  };
  const showReponses = () => {
    setisOpenReponses(true);
  };
  const hideReponses = () => {
    setisOpenReponses(false);
  };

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
    setActions([
      (rowData) => ({
        icon: ListAltIcon,
        tooltip: "Effectuer la saisie",
        onClick: (event, rowData) => {
          setClickedRow(rowData);
          //alert(JSON.stringify(rowData));
          showForm();
        },
      }),
    ]);
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
        title: "Date de réponse",
        field: "Udate_Participation",
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
        icon: DoneIcon,
        tooltip: "Evaluation individuelle",
        onClick: (event, rowData) => {
          setClickedRow(rowData);
          showReponses();
        },
      }),
      (rowData) => ({
        icon: DoneAllIcon,
        tooltip: "Evaluation totale",
        onClick: (event, rowData) => {
          setClickedRow(rowData);
          //showEvaluation();
        },
        disabled: rowData.Etat_Participation === "A",
      }),
    ]);
  };
  const refresh = () => {
    setIsFresh(isFresh + 1);
  };
  const fetchParticipations = () => {
    setLoadMsg("Chargement des données...");
    if (user.role != 1) {
      let data = new FormData();
      data.append("Id_Laboratoire", user.id);
      data.append("role", "user");
      axios
        .post(
          "http://localhost:8000/api/getParticipationsValidesOfLaboratoire",
          data
        )
        .then((res) => {
          setLoadMsg("Pas d'enregistrement à afficher");
          setData(res.data.participations);
          labo();
        });
    } else {
      let data = new FormData();
      data.append("role", "admin");
      axios
        .post(
          "http://localhost:8000/api/getParticipationsValidesOfLaboratoire",
          data
        )
        .then((res) => {
          setLoadMsg("Pas d'enregistrement à afficher");
          setData(res.data.participations);
          admin();
        });
    }
  };
  React.useEffect(() => {
    if (user.role != 1) {
      labo();
    } else {
      admin();
    }
    fetchParticipations();
  }, []);
  React.useEffect(() => {
    if (user.role != 1) {
      labo();
    } else {
      admin();
    }
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
      <FormulaireOfProject
        row={clickedRow}
        isOpenForm={isOpenForm}
        hide={hideForm}
      />
      <Reponses
        row={clickedRow}
        isOpenReponses={isOpenReponses}
        hide={hideReponses}
      />
    </React.Fragment>
  );
}

//La page projets qui contienne tous les composants
const EnquetesPage = (props) => {
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
            defaultActiveKey="Enquétes"
            onSelect={(k) => {
              refresh(k);
            }}
          >
            {/* {user.role != 1 && ( )}*/}

            <Tab eventKey="Enquétes" title="Enquétes">
              <Participations fresh={isFresh} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Aux>
  );
};

export default EnquetesPage;
