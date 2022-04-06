import React from "react";
import DropdownSelector from "./DropdownSelector";
import LogError from "./LogError";
import MachineSettings from "./MachineSettings";
import { FiSettings } from "react-icons/fi";

const ApprovalCard = (props: any) => {
  const [selectedScene, setSelectedScene] = React.useState<string>("");
  const [selectedMachine, setSelectedMachine] = React.useState<string>("");
  const [hiddenLog, setHiddenLog] = React.useState<boolean>(true);
  const [hiddenSettings, setHiddenSettings] = React.useState<boolean>(true);
  const [machinesName, setMachinesName] = React.useState<string[]>([]);

  const handleSceneChange = (scene: string) => {
    setSelectedScene(scene);
  };

  const handleMachineChange = (machine: string) => {
    setSelectedMachine(machine);
  };

  const onSubmitStart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(props.device, selectedScene, selectedMachine);
  };

  const onSubmitStop = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onStop(props.device);
  };

  const switchDisplayLog = () => {
    setHiddenLog(!hiddenLog);
    if (hiddenLog) {
      setHiddenSettings(true);
    }
  };

  const switchDisplaySettings = () => {
    setHiddenSettings(!hiddenSettings);
    if (hiddenSettings) {
      setHiddenLog(true);
    }
  };

  const ButtonDisplay = () => {
    console.log(props.device);
    var disable = false;
    if (selectedScene === props.device.activeScene.name) disable = true;

    return (
      <button
        className="ui blue button"
        type="submit"
        value="Start"
        disabled={disable}
      >
        Lancer la simulation
        <i className="right chevron icon"></i>
      </button>
    );
  };

  const ButtonStopDisplay = () => {
    var disable = false;
    if (props.device.activeScene.name === "Menu") disable = true;
    return (
      <button
        className="ui red button"
        type="submit"
        value="Stop"
        disabled={disable}
      >
        Arrêter la simulation
        <i className="right chevron icon"></i>
      </button>
    );
  };

  // React.useEffect(() => {
  //   console.log("ici");
  //   setMachinesName(props.machines.map((machine: any) => machine.name));
  // }, []);

  // const getNamesOfMachines = () => {
  //   console.log("ici");
  //   console.log(machinesName);
  // };

  const myComponent = {
    height: "220px",
    overflow: "auto",
  };

  console.log(machinesName);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>{props.device.name}</h3>
          <div className="cinema">
            <span>Scène en cours : {props.device.activeScene.name}</span>
          </div>
          <DropdownSelector
            items={props.device.scenes}
            placeholder="Choix de la scène"
            onChange={handleSceneChange}
          />
          <DropdownSelector
            items={props.device.machines}
            placeholder="Choix de la machine"
            onChange={handleMachineChange}
          />
          <button className="ui orange button" onClick={switchDisplaySettings}>
            <FiSettings />
          </button>
          <button className="ui yellow button" onClick={switchDisplayLog}>
            Logs
          </button>
          <form onSubmit={onSubmitStart}>
            <ButtonDisplay />
          </form>

          <form onSubmit={onSubmitStop}>
            <ButtonStopDisplay />
          </form>
        </div>

        <div className="col">
          <div style={myComponent} hidden={hiddenLog}>
            <LogError logs={props.device.activeScene.logs} />
          </div>
          <div hidden={hiddenSettings}>
            <MachineSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalCard;
