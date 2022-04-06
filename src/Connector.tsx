import React, {
  useState,
  useEffect,
  useRef,
  ChangeEventHandler,
  ChangeEvent,
} from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import axios from "axios";
import ApprovalCard from "./ApprovalCard";

const Connector = () => {
  const [connection, setConnection] = useState<HubConnection>();
  const [devices, setDevices] = useState<Device[]>();

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7050/hubs/control")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
          connection.send("RegisterWebClient");
          connection.on("ReceiveListOfUser", (res) => {
            setDevices(res);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const startSimulation = async (
    selectedDevice: Device,
    selectedScene: string,
    selectedMachine: string
  ) => {
    const user = {
      id: selectedDevice.id,
    };
    try {
      console.log(selectedScene);
      await connection!.send(
        "StartSimulation",
        user,
        selectedScene,
        selectedMachine
      );
    } catch (e) {
      console.log(e);
    }
  };

  const stopSimulation = async (selectedDevice: Device) => {
    console.log(selectedDevice);
    const user = {
      id: selectedDevice.id,
    };
    try {
      await connection!.send("StopSimulation", user);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    axios
      .get("https://localhost:7050/api/Server")
      .then((res) => setDevices(res.data));
  }, []);

  const style = {
    border: "1px solid black",
    width: "80%",
  };

  // const onStop = (device: Device) => {
  //   console.log("stop");
  //   console.log(device);
  //   stopSimulation(device);
  // };

  // const onStart = (device: Device, scene: string, machine: string) => {
  //   console.log("start");
  //   console.log(device);
  //   startSimulation(device, scene, machine);
  // };

  return (
    <div>
      {devices?.map((device, index) => (
        <div key={index}>
          <ApprovalCard
            device={device}
            onSubmit={startSimulation}
            onStop={stopSimulation}
          />
          <hr style={style}></hr>
        </div>
      ))}
    </div>
  );
};

export default Connector;
