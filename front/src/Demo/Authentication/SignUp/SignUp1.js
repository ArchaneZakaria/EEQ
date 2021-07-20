import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import logo from "../../../assets/images/INH.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm  } from "react-hook-form";
import { Form,  InputGroup } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const SignUp1 = (props) => {
  {
    /***/
  }
  let options = [
    { value: "biologie", label: "biologie" },
    { value: "bactérologie", label: "bactérologie" },
    { value: "virologie", label: "virologie" },
  ];
  const [optionss, setOptions] = React.useState([
    { value: "biologie", label: "biologie" },
    { value: "bactérologie", label: "bactérologie" },
    { value: "virologie", label: "virologie" },
  ]);

  let options1;
  useEffect(
    (options1) => {
      console.log(optionss);
    },
    [optionss]
  );
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

  //alert(JSON.stringify(options1));

  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("Le nom du laboratoire est obligatoire."),
    email: yup.string().trim().required("l'email est obligatoire."),
    password: yup
      .string()
      .trim()
      .max(15)
      .required("Le mot de passe est obligatoire")
      .min(4, "Le mot de passe doit contenir au moins 4 caractéres"),
    password_confirmation: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe ne correspondent pas !"
      ),
    responsable_laboratoire: yup
      .string()
      .required("Le nom du responsable est obligatoire."),
    adresse_laboratoire: yup.string().required("L'adresse est obligatoire."),
    num_tel_laboratoire: yup
      .string()
      .required("Le numéro de téléphone est obligatoire.")
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

  const [image, setImage] = React.useState();

  const handleChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const onSubmit = (data) => {
    alert('dsdhsdd');
    console.log(data);

    axios.post("http://localhost:8000/api/register", data).then((res) => {
      console.log(res);
      if (res.status === 201) {
        Swal.fire({
          title: "Succés",
          text: "Inscription avec succés, on vous contactera par mail.",
          type: "success",
        });
        reset();
      } else {
        Swal.fire({
          title: "Echec",
          text: "Echec de l'inscription",
          type: "warning",
        });
      }
    });

    
  };
/*
    console.log(image);
    const data1 = new FormData();
    data1.append("images", image);

    console.log(data1);
    axios
      .post("http://localhost:8000/api/file/PostPiecesjointes", 
        data1
      )
      .then((res) => {
        console.log(res);
      }); */
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
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="desc">
                      Nom du laboratoire&nbsp;&nbsp;&nbsp;
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    {...register("name")}
                  />
                </InputGroup>

                {formState.errors.name &&
                  errorMessage(formState.errors.name.message)}
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="desc">
                      Nom du responsable&nbsp;&nbsp;
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    {...register("responsable_laboratoire")}
                  />
                </InputGroup>

                {formState.errors.responsable_laboratoire &&
                  errorMessage(
                    formState.errors.responsable_laboratoire.message
                  )}
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="desc">
                      Adresse du laboratoire
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    {...register("adresse_laboratoire")}
                  />
                </InputGroup>
                {formState.errors.adresse_laboratoire &&
                  errorMessage(formState.errors.adresse_laboratoire.message)}

                {/* <div>
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
                  </div>     
                <br />         
                  */}

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="desc">
                      Numero de téléphone
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    {...register("num_tel_laboratoire")}
                  />
                </InputGroup>

                {formState.errors.num_tel_laboratoire &&
                  errorMessage(formState.errors.num_tel_laboratoire.message)}

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="desc">
                      Email
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    {...register("email")}
                  />
                </InputGroup>

                {formState.errors.email &&
                  errorMessage(formState.errors.email.message)}

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="desc">
                      Mot de passe
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    {...register("password")}
                  />
                </InputGroup>

                {formState.errors.password &&
                  errorMessage(formState.errors.password.message)}

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="desc">
                      Confirmer mot de passe
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    {...register("password_confirmation")}
                  />
                </InputGroup>
                {formState.errors.password_confirmation &&
                  errorMessage(formState.errors.password_confirmation.message)}

                <div className="input-group mb-3">
                  <Form.Check
                    custom
                    type="checkbox"
                    id="checkbox1"
                    label="En cochant cette case, vous confirmez que vous avez lu et accepté les conditions générales d'utilisation."
                  />
                  {/*
                  <input
                    type="file"
                    multiple
                    name="file"
                    {...register("files")}
                    onChange={handleChange}
                  />
                   */}

                  {/* <Form.Control type="file" multiple name="files"  />*/}
                </div>
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
