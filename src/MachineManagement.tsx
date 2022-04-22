import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { useForm, NestedValue, SubmitHandler } from "react-hook-form";
import { TextField, Select } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

const MachineManagement = () => {
  const { register, handleSubmit } = useForm<Machine>();
  const [submitted, setSubmitted] = useState<number>();

  const onSubmit: SubmitHandler<Machine> = (data: Machine) => {
    console.log(data);
    axios
      .post("https://localhost:7050/api/Machine", data)
      .then((res) => {
        console.log(res);
        setSubmitted(1);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(2);
      });
  };

  // const handleChange: ChangeEventHandler<Machine> = (data: Machine) => {
  //   console.log(data);
  // };

  const SubmitResult = () => {
    if (submitted === 1) return <div>Machine crée</div>;
    else if (submitted === 2) return <div>Une erreur s'est produite</div>;
    else return <div></div>;
  };

  const style = {
    width: "10%",
    margin: "auto",
    alignSelf: "center",
  };

  return (
    <div style={style}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("machineName")} type="text" placeholder="Nom" />
        {/* <input {...register("machineMass")} type="number" placeholder="Masse" /> */}
        <input
          {...register("machinePower")}
          type="number"
          placeholder="Puissance (kW)"
          min="0"
        />
        <input
          {...register("machineSpeed")}
          type="number"
          placeholder="Vitesse (km/h)"
          min="0"
        />
        <input
          {...register("machineTension")}
          type="number"
          placeholder="Tension (V)"
          min="0"
        />
        <input
          {...register("machineMaxHeight")}
          type="number"
          placeholder="Hauteur max (mm)"
          min="0"
        />
        <input
          {...register("machineWheels")}
          type="number"
          placeholder="Nombres de roues"
          min="0"
        />
        <input
          {...register("machineMaxWeight")}
          type="number"
          placeholder="Charge maximal (kg)"
          min="0"
        />
        <br />
        <br />

        <button type="submit" className="ui green button">
          Ajouter machine
        </button>
      </form>
      <div>
        <SubmitResult />
      </div>
    </div>
  );
};

export default MachineManagement;
