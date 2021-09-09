import React, { Component, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import AsyncSelect from "react-select/async";
import Swal from "sweetalert2";

const NewProject = (props) => {
  const [optionss, setOptions] = React.useState([
    { value: "biologie", label: "biologie" },
    { value: "bactérologie", label: "bactérologie" },
    { value: "virologie", label: "virologie" },
  ]);
  useEffect((options1) => {
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
    data.id = user.id;
    //alert(JSON.stringify(data));
    axios.post("http://localhost:8000/api/updateLabo", data).then((res) => {
      console.log(res);
      if (res.status === 200) {
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
        let userLogged={"id":user.id,"name":data.name,"email":data.email,"actif":1};
        localStorage.setItem("userLogged",JSON.stringify(userLogged));
        localStorage.setItem("laboLogged",1);
      } else {
        Swal.fire({
          title: "Echec",
          text: "Echec de modification",
          type: "warning",
        });
      }
    });
  };

  React.useLayoutEffect(() => {
    let data = new FormData();
    data.append("id", user.id);
    data.append("role","user")
    axios.post("http://localhost:8000/api/getLabo", data).then((res) => {
      //console.log(res.data);
      setValue("name", res.data.labo.Nom_Laboratoire);
      setValue("email", res.data.user.email);
      setValue("num_tel_laboratoire", res.data.labo.Num_Tel_Laboratoire);
      setValue("adresse_laboratoire", res.data.labo.Adresse_Laboratoire);
      setValue(
        "responsable_laboratoire",
        res.data.labo.Responsable_Laboratoire
      );
      setValue("disciplines",res.data.disciplines);
    });
  });

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

class ProfilePage extends Component {
  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card title="Profile" isOption>
              <NewProject />
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default ProfilePage;
