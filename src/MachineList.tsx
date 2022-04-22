import React, {
  useState,
  useEffect,
  useRef,
  ChangeEventHandler,
  ChangeEvent,
} from "react";
import axios from "axios";
import { TiDelete } from "react-icons/ti";

const MachineList = () => {
  const [machines, setMachines] = useState<Machine[]>();

  useEffect(() => {
    axios
      .get("https://localhost:7050/api/Machine/machines")
      .then((res) => setMachines(res.data));
  }, []);

  // const IsMachineAvailable = () => {
  //   console.log(machines);
  //   if (!machines) {
  //     return <div>Aucune machines disponible</div>;
  //   } else {
  //     if (machines.length === 0) {
  //       return <div>Aucune machines disponible</div>;
  //     }
  //   }

  //   return <div>Machine dispo</div>;
  // };

  const handleRemove = (id: string) => {
    console.log(id);
    axios.delete(`https://localhost:7050/api/Machine/${id}`);
    setMachines(machines!.filter((machine) => machine.machineId !== id));
  };

  const style = {
    width: "80%",
    margin: "auto",
  };

  return (
    <div>
      {/* <IsMachineAvailable /> */}

      <table className="ui celled table" style={style}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Puissance</th>
            <th>Vitesse</th>
            <th>Tension</th>
            <th>Hauteur max</th>
            <th>Nombres de roues</th>
            <th>Charge maximal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {machines?.map((machine, index) => (
            <tr key={machine.machineId}>
              <td data-label="Nom">{machine.machineName}</td>
              <td data-label="Puissance">{machine.machinePower} kW</td>
              <td data-label="Vitesse">{machine.machineSpeed} km/h</td>
              <td data-label="Tension">{machine.machineTension} V </td>
              <td data-label="Hauteur max">{machine.machineMaxHeight} mm</td>
              <td data-label="Nombres de roues">{machine.machineWheels}</td>
              <td data-label="Charge maximal">{machine.machineMaxWeight} kg</td>
              <td data-label="">
                <button onClick={() => handleRemove(machine.machineId)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineList;
