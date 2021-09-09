import React, { Component } from "react";
import { Form,Button, Row, Col, Tabs, Tab } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import MaterialTable from "material-table";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import InfoIcon from "@material-ui/icons/Info";
import HistoryIcon from "@material-ui/icons/History";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import Loader from "../../App/layout/Loader";
import Modal from "react-bootstrap/Modal";
import UcFirst from "../../App/components/UcFirst";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import Swal from "sweetalert2";








const ApprouverInscription = (props) => {
  const[loading,setLoading]=React.useState(false)
  const fermer = () => {
    props.hide();
  };
  const approuver = () => {
    setLoading(true)
    const data = new FormData();
    data.append("id", props.row.User_Laboratoire);
    data.append("Email_Laboratoire", props.row.Email_Laboratoire);
    data.append("Nom_Laboratoire", props.row.Nom_Laboratoire);

    axios
      .post("http://localhost:8000/api/approuverInscription", data)
      .then((res) => {
        setLoading(false)
        //console.log(res);
        if (res.status === 200) {
          Swal.fire({
            title: "Succés",
            text: "Inscription approuvée.",
            type: "success",
          });
          props.refresh();
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
      <Modal show={props.isOpenApprouver} onHide={props.hide}>
        <Modal.Header>
          <Modal.Title>Approuver l'inscription</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          êtes-vous sûr de vouloir approuver l'inscription de <strong>{props.row.Nom_Laboratoire}</strong> dans la plateforme EEQ ?
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




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const DemandesInscription=(props)=>{
  const [data, setData] = React.useState([]);
  const [loadMsg, setLoadMsg] = React.useState("Chargement des données...");
  const [clickedRow, setClickedRow] = React.useState([]);
  const [isOpenApprouver, setisOpenApprouver] = React.useState(false);
  const [isOpenSuppression, setisOpenSuppression] = React.useState(false);

  const [isFresh, setIsFresh] = React.useState(1);
  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };


  const refresh = () => {
    
      setIsFresh(isFresh + 1);
  };

  const hideApprouver=()=>{
    setisOpenApprouver(false);
  }

  const hideSuppression=()=>{
    setisOpenSuppression(false);
  }

  const fetchDemandes = () => {
    setLoadMsg("Chargement des données...");
    axios.get("http://localhost:8000/api/showDemandeInscription").then((result) => {
      setData(result.data.laboratoires);
      setLoadMsg("Aucune demande d'inscription.");
    });
  };
  React.useEffect(() => {
    fetchDemandes();
  }, []);
  React.useEffect(() => {
    fetchDemandes();
  }, [props.fresh]);
  React.useEffect(() => {
    fetchDemandes();
  }, [isFresh]);

  return (
    <React.Fragment>
      <MaterialTable
        title="Demandes d'inscriptions"
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
        data={data}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#5d6d7e",
            color: "#FFF",
          },
        }}
        actions={[
          (rowData) => ({
            icon: CheckBoxIcon,
            tooltip: "Approuver",
            onClick: (event, rowData) => {
              setClickedRow(rowData);
              setisOpenApprouver(true)
            },
          }),
          (rowData) => ({
            icon: CancelPresentationIcon,
            tooltip: "Rejeter",
            onClick: (event, rowData) => {
              setClickedRow(rowData);
              setisOpenSuppression(true)
            },
          })
        ]}
      />
      <ApprouverInscription 
        hide={hideApprouver}
        row={clickedRow}
        isOpenApprouver={isOpenApprouver}
        refresh={refresh}
      />
      <SupprimerLaboratoire
        isOpenSuppression={isOpenSuppression}
        row={clickedRow}
        hide={hideSuppression}
        refresh={refresh}
        message={"rejeter"}
      />
    </React.Fragment>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SupprimerLaboratoire = (props) => {
  const[loading,setLoading]=React.useState(false)
  const fermer = () => {
    props.hide();
  };
  const supprimer = () => {
    setLoading(true)
    const data = new FormData();
    data.append("Id_Laboratoire", props.row.Id_Laboratoire);
    data.append("id", props.row.User_Laboratoire);
    
    axios
      .post("http://localhost:8000/api/supprimerLaboratoire", data)
      .then((result) => {
        setLoading(false)
        props.refresh();
        if (result.status === 200) {
          Swal.fire({
            title: "Succés",
            text: "Laboratoire supprimé.",
            type: "success",
          });
          fermer();
        } else {
          Swal.fire({
            title: "Echec",
            text: "Echec de suppression.",
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
      <Modal show={props.isOpenSuppression} onHide={props.hide}>
        <Modal.Header>
          <Modal.Title>{props.message} le laboratoire</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          êtes-vous sûr de vouloir {props.message} le laboratoire :{" "}
          {props.row.Nom_Laboratoire} ?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-primary" type="submit" onClick={supprimer}>
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const ModifierLaboratoire = (props) => {
  const [optionss, setOptions] = React.useState([
    { value: "biologie", label: "biologie" },
    { value: "bactérologie", label: "bactérologie" },
    { value: "virologie", label: "virologie" },
  ]);
  const[loading,setLoading]=React.useState(false)
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
  //const [selectedOption,setSelectedOption]=React.useState(null);
  const handleChange = (selectedOption) => {
    //setSelectedOption(selectedOption);
  };
  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("Le nom du laboratoire est obligatoire."),
    email: yup.string().trim().required("l'email est obligatoire."),
    responsable_laboratoire: yup
      .string()
      .required("Le nom du responsable est obligatoire."),
    adresse_laboratoire: yup.string().required("L'adresse est obligatoire."),
    num_tel_laboratoire: yup
      .string()
      .required("Le numéro de téléphone est obligatoire."),
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

  const [user, SetUser] = React.useState(
    JSON.parse(localStorage.getItem("userLogged"))
  );

  const onSubmit = (data) => {
    data.id = props.row.User_Laboratoire
    //alert(JSON.stringify(data));
    axios.post("http://localhost:8000/api/updateLabo", data).then((res) => {
      if (res.status === 200) {
        fermer();
        props.refresh()
        Swal.fire({
          title: "Succés",
          text: "Modification avec succés.",
          type: "success",
        });
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("num_tel_laboratoire", data.num_tel_laboratoire);
        setValue("adresse_laboratoire", data.adresse_laboratoire);
        setValue("responsable_laboratoire", data.responsable_laboratoire);
        setValue("disciplines", data.disciplines);
        
      } else {
        Swal.fire({
          title: "Echec",
          text: "Echec de modification",
          type: "warning",
        });
      }
    });
  };

  const fermer=()=>{
    props.hide()
  }

  React.useLayoutEffect(() => {
    
    if(props.isOpenEdit){
      setLoading(true)
      let data = new FormData();
      data.append("Id_Laboratoire", props.row.Id_Laboratoire);
      data.append("role","admin")
      axios.post("http://localhost:8000/api/getLabo", data).then((res) => {
        console.log(res.data);
        setValue("name", res.data.labo.Nom_Laboratoire);
        setValue("email", res.data.user[0].email);
        setValue("num_tel_laboratoire", res.data.labo.Num_Tel_Laboratoire);
        setValue("adresse_laboratoire", res.data.labo.Adresse_Laboratoire);
        setValue(
          "responsable_laboratoire",
          res.data.labo.Responsable_Laboratoire
        );
        setValue("disciplines",res.data.disciplines);
        setLoading(false)
      });
      
    }
    
  },[props.isOpenEdit]);

  return (
    <React.Fragment>
      {loading && <Loader />}
      <Modal
        show={props.isOpenEdit}
        onHide={props.hide}
        //size="lg"
      >
        <Modal.Header>
          <Modal.Title>Modifier </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {loading ? (
            "Chargement des données ..."
          ) : (<React.Fragment>
             <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nom du laboratoire</Form.Label>
          <Form.Control type="text" {...register("name")} />
          {formState.errors.name && errorMessage(formState.errors.name.message)}
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nom du responsable</Form.Label>
          <Form.Control type="text" {...register("responsable_laboratoire")} />
          {formState.errors.responsable_laboratoire &&
            errorMessage(formState.errors.responsable_laboratoire.message)}
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Adresse du laboratoire</Form.Label>
          <Form.Control type="text" {...register("adresse_laboratoire")} />
          {formState.errors.adresse_laboratoire &&
            errorMessage(formState.errors.adresse_laboratoire.message)}
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Numéro de téléphone</Form.Label>
          <Form.Control type="text" {...register("num_tel_laboratoire")} />
          {formState.errors.num_tel_laboratoire &&
            errorMessage(formState.errors.num_tel_laboratoire.message)}
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" {...register("email")} />
          {formState.errors.Annee_Projet &&
            errorMessage(formState.errors.email.message)}
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
          {formState.errors.Discipline_Projet &&
            errorMessage(formState.errors.Discipline_Projet.message)}
        </Form.Group>
        <Button variant="primary" type="submit">
          Modifier
        </Button>
      </Form>
          </React.Fragment>)}
     
      </Modal.Body>
      <Modal.Footer>
          <Button variant="outline-secondary" onClick={fermer}>
            <UcFirst text="Fermer" />
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const Participations=(props)=>{

  React.useLayoutEffect(() => {
    if(props.isOpenParticipations){

      setData([]);
      setLoadMsg("Chargement des données...")
      let data = new FormData();
      data.append("Id_Laboratoire", props.row.Id_Laboratoire);
      data.append("role","admin")
      axios
        .post("http://localhost:8000/api/getParticipationsOfLaboratoire", data)
        .then((res) => {
          
          setData(res.data.participations)  
          setLoadMsg("Aucune participation")      
        });
    }
  }, [props.isOpenParticipations]);
  const [loadMsg,setLoadMsg]=React.useState("Chargement des données...")
  const [dataTab, setData] = React.useState([]);
  const fermer = () => {
    props.hide();
  };

  
  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };
  return (
    <>
      <Modal
        show={props.isOpenParticipations}
        onHide={props.hide}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Participations </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <MaterialTable
            title={"Participations"}
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
                lookup: { E: "Traitement de la demande", V: "Validé", A: "Annulé" },
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


}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const PlusInformations = (props) => {
  const [disciplines, setDisciplines] = React.useState([]);
  const [countOfParticipations, setCountOfParticipations] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  React.useLayoutEffect(() => {
    if (props.isOpenInfo) {
      setLoading(true);
      listItems = null;
      setCountOfParticipations(0);
      setDisciplines([]);

      let data = new FormData();
      data.append("Id_Laboratoire", props.row.Id_Laboratoire);
      axios
        .post("http://localhost:8000/api/getDisciplinesLaboratoires", data)
        .then((res) => {
          setDisciplines(res.data.disciplines);
        });
      axios
        .post("http://localhost:8000/api/countOfParticipations", data)
        .then((res) => {
          setCountOfParticipations(res.data.count);
          setLoading(false);
        });
    }
  }, [props.isOpenInfo]);

  let listItems = null;

  React.useLayoutEffect(() => {}, []);

  listItems = disciplines.map((discipline) => (
    <li>{discipline.Libelle_Discipline}</li>
  ));
  const fermer = () => {
    props.hide();
  };
  return (
    <>
      {loading && <Loader />}

      <Modal show={props.isOpenInfo} onHide={props.hide}>
        <Modal.Header>
          <Modal.Title>
            Informations générales : {props.row.Nom_Laboratoire}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? (
            "Chargement des données ..."
          ) : (
            <React.Fragment>
              <h6>Adresse email :</h6>
              <ul>
                <li>{props.row.Email_Laboratoire}</li>
              </ul>
              <h6>Date d'inscription :</h6>
              <ul>
                <li>{props.row.Cdate_Laboratoire}</li>
              </ul>
              <h6>Disciplines :</h6>
              <ul>{listItems}</ul>
              <h6>Nombre de participations :</h6>
              <ul>
                <li>{countOfParticipations}</li>
              </ul>
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ListeLaboratoires = (props) => {
  const [data, setData] = React.useState([]);
  const [loadMsg, setLoadMsg] = React.useState("Chargement des données...");
  const [clickedRow, setClickedRow] = React.useState([]);
  const [isOpenInfo, setisOpenInfo] = React.useState(false);
  const [isOpenParticipations, setisOpenParticipations] = React.useState(false);
  const [isOpenEdit, setisOpenEdit] = React.useState(false);
  const [isOpenSuppression, setisOpenSuppression] = React.useState(false);
  const [isFresh, setIsFresh] = React.useState(1);
  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };


  const refresh = () => {
    
      setIsFresh(isFresh + 1);
  };


  const hideSuppression=()=>{
    setisOpenSuppression(false);
  }

  const hideInfo = () => {
    setisOpenInfo(false);
  };
  const hideParticipations = () => {
    setisOpenParticipations(false);
  };
  const hideEdit = () => {
    setisOpenEdit(false);
  };

  const fetchLaboratoires = () => {
    setLoadMsg("Chargement des données...");
    axios.get("http://localhost:8000/api/showLaboratoires").then((result) => {
      setData(result.data.laboratoires);
      setLoadMsg("Aucun laboratoire n'est inscrit.");
    });
  };
  React.useEffect(() => {
    fetchLaboratoires();
  }, []);
  React.useEffect(() => {
    fetchLaboratoires();
  }, [props.fresh]);
  React.useEffect(() => {
    fetchLaboratoires();
  }, [isFresh]);
  return (
    <React.Fragment>
      <MaterialTable
        title="Liste des laboratoires"
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
            icon: InfoIcon,
            tooltip: "Plus d'informations",
            onClick: (event, rowData) => {
              setClickedRow(rowData);
              setisOpenInfo(true);
            },
          }),
          (rowData) => ({
            icon: HistoryIcon,
            tooltip: "Historique des participations",
            onClick: (event, rowData) => {
              setClickedRow(rowData);
              setisOpenParticipations(true);
            },
          }),

          (rowData) => ({
            icon: EditIcon,
            tooltip: "Modifier",
            onClick: (event, rowData) => {
              setClickedRow(rowData);
              setisOpenEdit(true)
            },
          }),
          (rowData) => ({
            icon: DeleteOutlineIcon,
            tooltip: "Supprimer",
            onClick: (event, rowData) => {
              setClickedRow(rowData);
              setisOpenSuppression(true)
            },
          }),
        ]}
      />
      <PlusInformations
        row={clickedRow}
        isOpenInfo={isOpenInfo}
        hide={hideInfo}
      />
      <Participations 
        row={clickedRow}
        isOpenParticipations={isOpenParticipations}
        hide={hideParticipations}
      />
      <ModifierLaboratoire
        isOpenEdit={isOpenEdit}
        row={clickedRow}
        hide={hideEdit}
        refresh={refresh}
      />
      <SupprimerLaboratoire
        isOpenSuppression={isOpenSuppression}
        row={clickedRow}
        hide={hideSuppression}
        refresh={refresh}
        message={"supprimer"}
      />
    </React.Fragment>
  );
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const LaboratoiresPage = (props) => {
  const [user, SetUser] = React.useState(
    JSON.parse(localStorage.getItem("userLogged"))
  );
  const [isFresh, setIsFresh] = React.useState(1);
  const refresh = (k) => {
    
      setIsFresh(isFresh + 1);
  };

  React.useEffect(() => {
    if (user.role === 2) {
      props.history.push("/dashboard/default");
    }
  }, []);
  return (
    <Aux>
      <Row>
        <Col>
          <Tabs defaultActiveKey="laboratoires"  onSelect={(k) => {
              refresh(k);
            }}>
            <Tab eventKey="laboratoires" title="Liste des laboratoires">
              <ListeLaboratoires fresh={isFresh}/>
            </Tab>

            <Tab eventKey="demandes" title="Demandes d'inscription">
            <DemandesInscription fresh={isFresh}/>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Aux>
  );
};

export default LaboratoiresPage;
