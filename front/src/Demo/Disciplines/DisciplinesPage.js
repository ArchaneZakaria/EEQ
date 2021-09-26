import React, { Component } from "react";
import { Form, Button, Row, Col, Tabs, Tab } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import MaterialTable from "material-table";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Loader from "../../App/layout/Loader";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import UcFirst from "../../App/components/UcFirst";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const FormulaireOfDiscipline = (props) => {
  const [loading, setLoading] = React.useState(false);
  let questions;
  React.useLayoutEffect(() => {
    if (props.isOpenForm) {
      setLoading(true);
      let data = new FormData();
      data.append("Id_Discipline", props.row.Id_Discipline);
      axios
        .post("http://localhost:8000/api/getFormOfDiscipline", data)
        .then((res) => {
          //setLoading(true);
          questions = res.data.questions;

          let questionsDiv = document.getElementById("questions");
          const keys = Object.keys(questions);
          keys.forEach((key, index) => {
            //console.log(`${key}: ${questions[key]["Enonce_Question"]}`);
            if (questions[key]["Type_Question"] == 1) {
              let label = document.createElement("LABEL");
              label.textContent = questions[key]["Enonce_Question"];
              label.setAttribute("class", "font-weight-bold");
              let newQst = document.createElement("INPUT");

              newQst.setAttribute("type", "text");
              newQst.setAttribute("class", "opt form-control");
              newQst.setAttribute("id", questions[key]["Id_Question"]);
              questionsDiv.appendChild(label);
              questionsDiv.appendChild(newQst);
            } else if (questions[key]["Type_Question"] == 3) {
              //console.log(questions[key]["options"]);
              const keysOfOptions = Object.keys(questions[key]["options"]);
              let label = document.createElement("LABEL");
              label.setAttribute("class", "font-weight-bold");
              label.textContent = questions[key]["Enonce_Question"];
              questionsDiv.appendChild(label);
              questionsDiv.appendChild(document.createElement("BR"));
              keysOfOptions.forEach((key1, index) => {
                let radioInput = document.createElement("input");
                radioInput.setAttribute("type", "radio");
                radioInput.setAttribute("name", questions[key]["Id_Question"]);
                radioInput.text = questions[key]["options"][key1]["Id_Option"];
                //console.log(radioInput);
                questionsDiv.appendChild(radioInput);
                let label = document.createElement("LABEL");
                label.textContent =
                  questions[key]["options"][key1]["Libelle_Option"];
                questionsDiv.appendChild(label);
                questionsDiv.appendChild(document.createElement("BR"));
              });
            } else {
              const keysOfOptions = Object.keys(questions[key]["options"]);
              let label = document.createElement("LABEL");
              label.textContent = questions[key]["Enonce_Question"];
              label.setAttribute("class", "font-weight-bold");
              questionsDiv.appendChild(label);
              keysOfOptions.forEach((key1, index) => {
                let radioCheck = document.createElement("input");
                radioCheck.setAttribute("type", "checkbox");

                radioCheck.value = questions[key]["options"][key1]["Id_Option"];
                questionsDiv.appendChild(radioCheck);
                let label = document.createElement("LABEL");
                label.textContent =
                  questions[key]["options"][key1]["Libelle_Option"];
                questionsDiv.appendChild(label);
                questionsDiv.appendChild(document.createElement("BR"));
              });
            }
          });
         // setLoading(false);
        });
      /*
        const keys = Object.keys(questions);
        console.log(keys);
      keys.forEach((qst) => {
        if (qst.Type_Question === 1) {
          let newQst = document.createElement("INPUT");
          newQst.setAttribute("type", "text");
          newQst.setAttribute("class", "opt");
          newQst.setAttribute("placeholder",qst.Enonce_Question );
          newQst.style.width = "470px";
          newQst.style.marginTop = "10px";
          let questions = document.getElementById("questions");
          questions.appendChild(newQst);
        }
      });
         */

      setLoading(false);
    }
  }, [props.isOpenForm]);

  React.useLayoutEffect(() => {}, []);

  const fermer = () => {
    props.hide();
  };
  return (
    <>
      {loading && <Loader />}

      <Modal show={props.isOpenForm} onHide={props.hide}>
        <Modal.Header>
          <Modal.Title>
            Formulaire de : {props.row.Libelle_Discipline}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div id="questions"></div>
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const NouvelleQuestion = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [typeReponse, setTypeReponse] = React.useState();
  const [display, setDisplay] = React.useState("none");
  const [countOption, setCountOption] = React.useState(0);

  React.useEffect(() => {
    //console.log(props.row)
    setValue("Id_Discipline", props.row.Id_Discipline);
    setValue("Type_Question", 1);
    setValue("Options", []);
  }, [props.row]);

  const schema = yup.object().shape({
    Enonce_Question: yup.string().trim().required("L'enoncé est obligatoire."),
    Description_Question: yup
      .string()
      .trim()
      .required("La description est obligatoire."),
  });

  const {
    register,
    handleSubmit,
    errors,
    formState,
    reset,
    control,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const TheOptions = () => {};
  ///hna fin hbest
  const onSubmit = (data) => {
    setLoading(true);
    if (countOption != 0) {
      let opti = [];
      var opt = document.getElementsByClassName("opt");
      for (let index = 0; index < countOption; index++) {
        opti[index] = opt[index].value;
      }

      setValue("Options", opti);
    }
    //console.log(getValues());

    axios
      .post("http://localhost:8000/api/addQuestion", getValues())
      .then((res) => {
        //console.log(res);
        setLoading(false);
        if (res.status === 200) {
          Swal.fire({
            title: "Succés",
            text: "Question ajoutée avec succés.",
            type: "success",
          });
          fermer();
          reset();
        } else {
          Swal.fire({
            title: "Echec",
            text: "Echec d'ajout.",
            type: "warning",
          });
        }
      });
  };

  const fermer = () => {
    props.hide();
    setCountOption(0);
    setTypeReponse(1);
    setDisplay("none");
    reset();
  };

  const changeReponse = (e) => {
    e.preventDefault();
    setValue("Type_Question", e.target.value);
    setTypeReponse(e.target.value);
    //console.log(e.target.value);
    if (e.target.value == 1) {
      setDisplay("none");
    } else {
      setDisplay("block");
    }
  };

  const newOption = () => {
    setCountOption(countOption + 1);
    let count = countOption + 1;
    let newOption = document.createElement("INPUT");
    newOption.setAttribute("type", "text");
    newOption.setAttribute("class", "opt form-control");
    newOption.setAttribute("placeholder", "option " + count);
    newOption.style.width = "470px";
    newOption.style.marginTop = "10px";
    let options = document.getElementById("options");
    options.appendChild(newOption);
  };

  return (
    <>
      {loading && <Loader />}
      <Modal show={props.isOpenNewQst} onHide={props.hide}>
        <Modal.Header>
          <Modal.Title>Nouvelle question :</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enoncé</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                {...register("Enonce_Question")}
              />
              {formState.errors.Enonce_Question &&
                errorMessage(formState.errors.Enonce_Question.message)}
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Type de réponse</Form.Label>
              <Form.Control as="select" onChange={changeReponse}>
                <option value={"1"}>Réponse</option>
                <option value={"2"}>Choix multiples</option>
                <option value={"3"}>Cases à cocher</option>
              </Form.Control>
            </Form.Group>
            <OverlayTrigger
              key={1}
              overlay={<Tooltip>{"Nouvelle option"}</Tooltip>}
            >
              <Button
                variant={"outline-secondary"}
                style={{ display: display }}
                onClick={newOption}
              >
                <UcFirst text={"+"} />
              </Button>
            </OverlayTrigger>
            <div id={"options"}></div>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                {...register("Description_Question")}
              />
              {formState.errors.Description_Question &&
                errorMessage(formState.errors.Description_Question.message)}
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Check
                type="checkbox"
                label="Obligatoire"
                {...register("Required_Question")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            <UcFirst
              text="Oui"
              onClick={() => {
                //TheOptions()
              }}
            />
          </Button>
          <Button variant="outline-secondary" onClick={fermer}>
            <UcFirst text="Non" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

function CreerForm(props) {
  const [loading, setLoading] = React.useState(false);
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
    axios.get("http://localhost:8000/api/getDisciplineOfForm").then((res) => {
      let options1 = res.data.discipline.map(function (val) {
        return { value: val.Id_Discipline, label: val.Libelle_Discipline };
      });
      //alert(JSON.stringify(options1))
      setOptions([options1][0]);
      return options1;
    });
  }

  const schema = yup.object().shape({
    Type_Formulaire: yup
      .string()
      .trim()
      .required("Le type du formulaire est obligatoire."),
    Libelle_Discipline: yup
      .string()
      .required("Le nom de la discipline est obligatoire."),
    Description_Discipline: yup
      .string()
      .required("La description de la discipline est obligatoire."),
    Responsable_Discipline: yup
      .string()
      .required("Le responsable de la discipline est obligatoire."),
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
    setLoading(true);
    axios.post("http://localhost:8000/api/addForm", data).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        Swal.fire({
          title: "Succés",
          text: "Discipline créé.",
          type: "success",
        });

        setValue("Type_Formulaire", "");
        setValue("Libelle_Discipline", "");
        setValue("Description_Discipline", "");
        setValue("Responsable_Discipline", "");
        //console.log(res)
        fetchOptions();
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
      {loading && <Loader />}
      <h4>Créer une nouvelle discipline</h4>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Veuillez saisir le nom de la discipline"
            {...register("Libelle_Discipline")}
          />
          {formState.errors.Libelle_Discipline &&
            errorMessage(formState.errors.Libelle_Discipline.message)}
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Veuillez saisir la description de la discipline"
            {...register("Description_Discipline")}
          />
          {formState.errors.Description_Discipline &&
            errorMessage(formState.errors.Description_Discipline.message)}
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Responsable</Form.Label>
          <Form.Control
            type="text"
            placeholder="Veuillez saisir le responsable de la discipline"
            {...register("Responsable_Discipline")}
          />
          {formState.errors.Responsable_Discipline &&
            errorMessage(formState.errors.Responsable_Discipline.message)}
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Type du formulaire</Form.Label>
          <Form.Control
            type="text"
            placeholder="Veuillez saisir le type du formulaire"
            {...register("Type_Formulaire")}
          />
          {formState.errors.Type_Formulaire &&
            errorMessage(formState.errors.Type_Formulaire.message)}
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          Créer
        </Button>
      </Form>
    </React.Fragment>
  );
}

const ListeDisciplines = (props) => {
  const [data, setData] = React.useState([]);
  const [loadMsg, setLoadMsg] = React.useState("Chargement des données...");
  const [clickedRow, setClickedRow] = React.useState([]);
  const [isOpenLabo, SetIsOpenLabo] = React.useState(false);
  const [isOpenNewQst, SetIsOpenNewQst] = React.useState(false);
  const [isOpenForm, SetIsOpenForm] = React.useState(false);
  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };

  const hideLabo = () => {
    SetIsOpenLabo(false);
  };

  const hideNewQst = () => {
    SetIsOpenNewQst(false);
  };

  const hideForm = () => {
    SetIsOpenForm(false);
  };

  const fetchDisciplines = () => {
    setLoadMsg("Chargement des données...");
    axios.get("http://localhost:8000/api/getDisciplines").then((result) => {
      setData(result.data);
      setLoadMsg("Aucune discipline n'est présente dans le systéme.");
    });
  };

  React.useEffect(() => {
    fetchDisciplines();
  }, []);
  return (
    <React.Fragment>
      <MaterialTable
        title={"Liste des disciplines"}
        columns={[
          {
            title: "Nom",
            field: "Libelle_Discipline",
            cellStyle: TableCellStyle,
            headerStyle: TableCellStyle,
          },
          {
            title: "Description",
            field: "Description_Discipline",
            cellStyle: TableCellStyle,
            headerStyle: TableCellStyle,
          },
          {
            title: "Responsable",
            field: "Responsable_Discipline",
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
        options={{
          exportButton: true,
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#5d6d7e",
            color: "#FFF",
          },
        }}
        actions={[
          (rowData) => ({
            icon: ListIcon,
            tooltip: "Laboratoires",
            onClick: (event, rowData) => {
              setClickedRow(rowData);
              SetIsOpenLabo(true);
            },
          }),

          (rowData) => ({
            icon: ListAltIcon,
            tooltip: "Formulaire",
            onClick: (event, rowData) => {
              setClickedRow(rowData);
              SetIsOpenForm(true);
            },
          }),
          (rowData) => ({
            icon: AddIcon,
            tooltip: "Nouvelle question",
            onClick: (event, rowData) => {
              setClickedRow(rowData);
              SetIsOpenNewQst(true);
            },
          }),
        ]}
      />

      <LaboOfDiscipline
        row={clickedRow}
        isOpenLabo={isOpenLabo}
        hide={hideLabo}
      />

      <NouvelleQuestion
        row={clickedRow}
        isOpenNewQst={isOpenNewQst}
        hide={hideNewQst}
      />

      <FormulaireOfDiscipline
        row={clickedRow}
        isOpenForm={isOpenForm}
        hide={hideForm}
      />
    </React.Fragment>
  );
};

const LaboOfDiscipline = (props) => {
  const [laboratoires, setLaboratoires] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useLayoutEffect(() => {
    if (props.isOpenLabo) {
      setLoading(true);
      listItems = null;
      setLaboratoires([]);

      let data = new FormData();
      data.append("Id_Discipline", props.row.Id_Discipline);
      axios
        .post("http://localhost:8000/api/getLaboOfDiscipline", data)
        .then((res) => {
          setLaboratoires(res.data.laboratoires);
          setLoading(false);
        });
    }
  }, [props.isOpenLabo]);

  let listItems = null;

  React.useLayoutEffect(() => {}, []);

  React.useLayoutEffect(() => {}, []);

  listItems = laboratoires.map((laboratoire) => (
    <li>{laboratoire.Nom_Laboratoire}</li>
  ));
  const fermer = () => {
    props.hide();
  };

  return (
    <>
      {loading && <Loader />}

      <Modal show={props.isOpenLabo} onHide={props.hide}>
        <Modal.Header>
          <Modal.Title>
            Laboratoires associés à : {props.row.Libelle_Discipline}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? (
            "Chargement des données ..."
          ) : (
            <React.Fragment>
              <h6>Laboratoires :</h6>
              <ul>{listItems}</ul>
            </React.Fragment>
          )}
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

class DisciplinesPages extends Component {
  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Tabs defaultActiveKey="disciplines">
              <Tab eventKey="disciplines" title="Disciplines">
                <ListeDisciplines />
              </Tab>

              <Tab eventKey="créer" title="créer">
                <CreerForm />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default DisciplinesPages;
