import React, { ChangeEvent } from "react";
import { GiForklift } from "react-icons/gi";
import { FaWeightHanging } from "react-icons/fa";
import { MdHeight } from "react-icons/md";

const MachineSettings = (props: any) => {
  // console.log(props.machine);

  // const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   props.onInputChange(event.target.value);
  // };

  const DisplayMachine = (machine: any) => {
    if (props.machine === undefined)
      return <div>Veuillez choisir une machine</div>;
    else
      return (
        <div className="ui list">
          <div className="item">
            <div className="header">
              <GiForklift />
              Nom
            </div>

            {props.machine.name}
          </div>
          <div className="item">
            <div className="header">
              <FaWeightHanging />
              Masse
            </div>
            {props.machine.mass} KG
          </div>
          <div className="item">
            <div className="header">
              <MdHeight />
              Hauteur max
            </div>
            {props.machine.maxHeight} M
          </div>
          {/* <form>
            <input
              type="number"
              placeholder="Masse du clark (kg)"
              onChange={onInputChange}
            />
          </form> */}
        </div>
      );
  };

  return (
    <div>
      <DisplayMachine />
    </div>
  );
};

export default MachineSettings;
