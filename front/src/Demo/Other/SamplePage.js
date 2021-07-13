import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import MaterialTable from "material-table";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Select from 'react-select';

function PositioningActionsColumn() {
  const TableCellStyle = { borderRight: "1px solid #e5e5e5" };
  return (
    <MaterialTable
      title="La liste des projets en cours :"
      columns={[
        {
          title: "Intitulé",
          field: "name",
          cellStyle: TableCellStyle,
          headerStyle: TableCellStyle,
        },
        {
          title: "Description",
          field: "surname",
          cellStyle: TableCellStyle,
          headerStyle: TableCellStyle,
        },
        {
          title: "Année",
          field: "birthYear",
          type: "numeric",
          cellStyle: TableCellStyle,
          headerStyle: TableCellStyle,
        },
        {
          title: "Disciplines",
          field: "disciplines",
          cellStyle: TableCellStyle,
          headerStyle: TableCellStyle,
        },
        {
          title: "Date de lancement",
          field: "birthCity",
          lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
          cellStyle: TableCellStyle,
          headerStyle: TableCellStyle,
        },
        {
          title: "Etat",
          field: "Etat",
          cellStyle: TableCellStyle,
          headerStyle: TableCellStyle,
        },
      ]}
      data={[
        { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
        {
          name: "Zerya Betül",
          surname: "Baran",
          birthYear: 2017,
          birthCity: 34,
        },
      ]}
      actions={[
        {
          icon: "edit",
          tooltip: "Save User",
          onClick: (event, rowData) => alert("You saved " + rowData.name),
        },
        (rowData) => ({
          icon: "delete",
          tooltip: "Delete User",
          onClick: (event, rowData) =>
            alert("You want to delete " + rowData.name),
          disabled: rowData.birthYear < 2000,
        }),
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
}

const NewProject = (props) => {

  const [selectedOption,setSelectedOption]=React.useState(null);
  const handleChange=selectedOption=>{
    setSelectedOption(selectedOption);
  }
  const schema = yup.object().shape({
    Intitule_Projet: yup
      .string()
      .trim()
      .required("L'intitulé du projet est obligatoire."),
    Description_Projet: yup
      .string()
      .trim()
      .required("la description du projet est obligatoire."),
    Annee_Projet: yup.number("L'année du projet est obligatoire.").required("L'année du projet est obligatoire."),
    Discipline_Projet: yup
      .string()
      .required("La discipline du projet est obligatoire."),
  });
  const { register, handleSubmit, errors, formState, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const errorMessage = (error) => {
    return <Form.Text className="text-danger mb-1" color="danger" style={{color:"red"}}>{error}</Form.Text>;
  };

  const onSubmit=(data)=>{
    alert(JSON.stringify(data));
  }

  const options = [
    { value: 'biologie', label: 'biologie' },
    { value: 'bactérologie', label: 'bactérologie' },
    { value: 'virologie', label: 'virologie' },
  ];
  
  return (
    <React.Fragment>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Intitulé</Form.Label>
        <Form.Control type="text" placeholder="Veuillez saisir l'intitulé." {...register("Intitule_Projet")}/>
        {formState.errors.Intitule_Projet &&
                  errorMessage(formState.errors.Intitule_Projet.message)}
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows="3" {...register("Description_Projet")}/>
        {formState.errors.Description_Projet &&
                  errorMessage(formState.errors.Description_Projet.message)}
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Année</Form.Label>
        <Form.Control type="number" placeholder="Veuillez saisir l'année." {...register("Annee_Projet")}/>
        {formState.errors.Annee_Projet &&
                  errorMessage(formState.errors.Annee_Projet.message)}
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Disciplines concérnées</Form.Label>
        <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isMulti={true}
        {...register("Discipline_Projet")}
      />
      {formState.errors.Discipline_Projet &&
                  errorMessage(formState.errors.Discipline_Projet.message)}
      </Form.Group>
      <Button variant="primary" type="submit">Créer</Button>
    </Form>
    </React.Fragment>
  );
};

class SamplePage extends Component {
  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card title="Hello Card" isOption>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card title="Hello Card" isOption>
              <PositioningActionsColumn />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card title="Nouveau projet" isOption>
              <NewProject/>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default SamplePage;
