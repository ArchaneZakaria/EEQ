import React from "react";
import { useContext } from 'react';
import { NavLink } from "react-router-dom";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import logo from "../../../assets/images/INH.png";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import Swal from 'sweetalert2'
import { AuthContext } from "../../../helpers/AuthContext";
import {Redirect} from 'react-router-dom'
import Loader from "../../../App/layout/Loader";
const SignUp1 = (props) => {

  const { utilisateur,setIdtilisateur } = useContext(AuthContext) 
  const[loading,setLoading]=React.useState(false)
    const schema = yup.object().shape({
        email: yup
          .string()
          .trim()
          .required("l'email est obligatoire."),
        password: yup
          .string()
          .required("Le mot de passe est obligatoire.")
      });


      const { register, handleSubmit, errors, formState, reset } = useForm({
        resolver: yupResolver(schema),
      });
    
      const errorMessage = (error) => {
        return <Form.Text className="text-danger mb-1" color="danger" style={{color:"red"}}>{error}</Form.Text>;
      };
  const init = (data) => {
    setLoading(true)
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then((response) => {
      axios.post("http://localhost:8000/api/login",data).then((res) => {
        if(res["data"]["status"] === "error")
      {
        Swal.fire({
          title: 'Echec',
          text:   "Connexion échoué",
          type: 'warning',
        
      });
      }
      else
      {
        Swal.fire({
        title: 'Succés',
        text:   "Connexion réussi",
        type: 'success',
        });
        console.log(res.data.data);
        localStorage.setItem("accessToken",res.data.data.token);
        localStorage.setItem("userLogged",JSON.stringify(res.data.data.user));
        if(res.data.data.user.role===2){
          localStorage.setItem("laboLogged",JSON.stringify(res.data.data.labo));
        }else{
          localStorage.setItem("laboLogged",1);
        }
        
        setIdtilisateur(res.data.data.user);
        props.history.push('/dashboard/default');
    }
    setLoading(false)
      });

      
    });
    
  };

  return (
    <React.Fragment>
      {
      loading && <Loader/>
    }
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
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
              <h3 className="mb-4">Connectez vous</h3>
              <Form onSubmit={handleSubmit(init)}>
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

              <button
                className="btn btn-primary shadow-2 mb-4"
                type="submit"
              >
                Se connecter
              </button>
              </Form>
              <p className="mb-2 text-muted">
                {" "}
                <NavLink to="/auth/reset-password-1">
                  Mot de passe oublié
                </NavLink>
              </p>
              <p className="mb-0 text-muted">
                <NavLink to="/auth/signup-1">Inscription</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
    </React.Fragment>
    
  );
};

export default SignUp1;
