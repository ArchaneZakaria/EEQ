import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";
import logo from "../../../assets/images/INH.png";
import Select from "react-select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Form, Jumbotron } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import AsyncSelect from 'react-select/async';

const SignUp1 = (props) => {
    {/***/}
    let options = [
        { value: "biologie", label: "biologie" },
        { value: "bactérologie", label: "bactérologie" },
        { value: "virologie", label: "virologie" },
      ]; 
const[optionss,setOptions]=React.useState([
    { value: "biologie", label: "biologie" },
    { value: "bactérologie", label: "bactérologie" },
    { value: "virologie", label: "virologie" },
  ]);

let options1;
    useEffect((options1)=>{
        console.log(optionss);
},[optionss])  
useEffect((options1)=>{
    fetchOptions();
},[])    
function fetchOptions(input){
    //alert("jdjjfjdf")
    axios.get("http://localhost:8000/api/getDisciplines").then((res)=>{
            
        let options1=res.data.map(function(val){
            return { value: val.Id_Discipline, label: val.Libelle_Discipline };
            
        })
        //alert(JSON.stringify(options1))
        setOptions([options1][0])
        return options1;
        
        
    })
}

//alert(JSON.stringify(options1));

  const schema = yup.object().shape({
    name: yup.string().trim().required("Le nom est obligatoire."),
    email: yup.string().trim().required("l'email est obligatoire."),
    password: yup.string().required("Le mot de passe est obligatoire."),
    password_confirmation: yup
      .string()
      .required("La confirmation est obligatoire."),
    responsable_laboratoire: yup
      .string()
      .required("Le nom du responsable est obligatoire."),
    adresse_laboratoire: yup.string().required("L'adresse est obligatoire."),
    num_tel_laboratoire: yup
      .string()
      .required("Le numéro de téléphone est obligatoire."),
    disciplines: yup.mixed().required("Les disciplines sont obligatoires."),
  });

  const { register, handleSubmit, errors, formState, reset, control } = useForm(
    {
      resolver: yupResolver(schema),
    }
  );

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

  const onSubmit = (data) => {
   
    alert(JSON.stringify(data));

    axios.post("http://localhost:8000/api/register", data).then((res) => {
      console.log(res);
      if (res.status === 201) {
        Swal.fire({
          title: "Succés",
          text: "Inscription avec succés, on vous contactera par mail.",
          type: "success",
        });
      } else {
        Swal.fire({
          title: "Echec",
          text: "Echec de l'inscription",
          type: "warning",
        });
      }
    });
  };

  
  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper ">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "50%", height: "50%" }}
                />
                <br />
                Evaluation externe de qualité
              </div>
              <h3 className="mb-4">Inscription</h3>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom du laboratoire"
                    {...register("name")}
                  />
                </div>
                {formState.errors.name &&
                  errorMessage(formState.errors.name.message)}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom du responsable"
                    {...register("responsable_laboratoire")}
                  />
                </div>
                {formState.errors.responsable_laboratoire &&
                  errorMessage(
                    formState.errors.responsable_laboratoire.message
                  )}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Adresse du laboratoire"
                    {...register("adresse_laboratoire")}
                  />
                </div>
                {formState.errors.adresse_laboratoire &&
                  errorMessage(formState.errors.adresse_laboratoire.message)}
                
                <div >
                      <Controller className="input-group mb-4"
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

                </div><br/>

                {formState.errors.disciplines &&
                  errorMessage(formState.errors.disciplines.message)}
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Numero de téléphone"
                    {...register("num_tel_laboratoire")}
                  />
                </div>
                {formState.errors.num_tel_laboratoire &&
                  errorMessage(formState.errors.num_tel_laboratoire.message)}
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    {...register("email")}
                  />
                </div>
                {formState.errors.email &&
                  errorMessage(formState.errors.email.message)}
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mot de passe"
                    {...register("password")}
                  />
                </div>
                {formState.errors.password &&
                  errorMessage(formState.errors.password.message)}
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirmer le mot de passe"
                    {...register("password_confirmation")}
                  />
                </div>
                {formState.errors.password_confirmation &&
                  errorMessage(formState.errors.password_confirmation.message)}
                <button className="btn btn-primary shadow-2 mb-4" type="submit">
                  Inscription
                </button>
              </Form>

              <p className="mb-0 text-muted">
                Vous avez déja un compte?{" "}
                <NavLink to="/auth/signin-1">Connectez-vous</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default SignUp1;
