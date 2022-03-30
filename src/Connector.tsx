import React, { useState, useEffect, useRef, ChangeEventHandler, ChangeEvent } from 'react';
import { HubConnectionBuilder,HubConnection } from '@microsoft/signalr';
import axios from 'axios';

const Connector = () => {

    const [connection, setConnection] = useState<HubConnection>();
    const [devices, setDevices] = useState<Device[]>();
    const [selectedDevice, setSelectedDevice] = useState<Device>();
    const [scenes, setScenes] = useState<string[]>();
    const [selectedScene, setSelectedScene] = useState<string>();

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7050/hubs/control')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                    connection.send('RegisterWebClient');
                    connection.on('ReceiveListOfUser', res => {
                        // console.log("ici");
                        setDevices(res);
                        refreshList();
                        console.log("lalalala");

                    })
                    console.log(devices);
                    // connection.onreconnecting((error) => {
                    //     console.log("onreco");
                    // }).subscribe(() => { connection.send("RegisterWebClient") });

                })
                .catch(e => console.log('Connection failed: ', e));
        }

    }, [connection]);

    const sendMessage = async (user:string, message:string) => {
        const chatMessage = {
            user: user,
            message: message
        };
        try {
            await connection!.send('SendMessage', chatMessage);
        }
        catch (e) {
            console.log(e);
        }
    }

    const startSimulation = async (selectedDevice:Device, selectedScene:string) => {
        //console.log(selectedDevice);
        const user = {
            id: selectedDevice.id
        }
        try {
            console.log(selectedScene);
            await connection!.send('StartSimulation', user, selectedScene);
            //console.log("start");
        }
        catch (e) {
            console.log(e);
        }
    }

    const stopSimulation = async (selectedDevice:Device) => {
        console.log(selectedDevice);
        const user = {
            id: selectedDevice.id
        }
        try {
            await connection!.send('StopSimulation', user);
            //console.log("stop");
        }
        catch (e) {
            console.log(e);
        }
    }

    const refreshList = () => {
        console.log("début refresh");
        console.log(document.getElementById('device'));
        setSelectedDevice(JSON.parse((document.getElementById('device') as HTMLInputElement).value));
        console.log("fin refresh");

        // console.log("debut refresh");
        // //console.log(devices);
        // devices!.map(dev => {
        //     console.log("foreach"); 
        //     if(dev.name === selectedDevice!.name)
        //     {
        //         console.log("conditionmet")
        //         setSelectedDevice(dev);
        //     }
        // });
        // console.log("fin refresh");

    }
    


    const handleChangeDevice = (e:ChangeEvent<HTMLSelectElement>) => {
        console.log(JSON.parse(e.target.value).scenes);
        setSelectedDevice(JSON.parse(e.target.value));
        setScenes(JSON.parse(e.target.value).scenes);
        // console.log(selectedDevice);
    };

    const handleChangeScene = (e:ChangeEvent<HTMLSelectElement>) => {
        //console.log(JSON.parse(e.target.value));
        // console.log("début handle");
        setSelectedScene(e.target.value);
        console.log(e.target.value);
        console.log(selectedScene);
        // console.log("handle change");
    };

    useEffect(() => {
        axios.get("https://localhost:7050/api/Server").then((res) => setDevices(res.data))
    }, [])

    // useEffect(() => {
    //     axios.get("https://localhost:7050/scenes").then((res) => setScenes(res.data))
    // }, [])


    const onStart = () => {
        //console.log(selectedDevice);
        startSimulation(selectedDevice!, selectedScene!);
        // console.log(selectedDevice.activeScene);
        //selectedDevice.activeScene = "BasicHandling";
    }

    const onStop = () => {
        stopSimulation(selectedDevice!);
        // console.log(selectedDevice.activeScene);
        //selectedDevice.activeScene = "Menu";
    }


    return (
        <div>

            <select onChange={handleChangeDevice} id='test'>
                <option>Aucun casque séléctionné</option>
                {devices?.map((device, index) => (
                    <option id="device" value={JSON.stringify(device)} key={index}>{device.name}</option>
                ))}
            </select>


            <select onChange={handleChangeScene}>
                <option>Aucune scene séléctionné</option>
                {scenes?.map((scene, index) => (
                    <option id="scene" value={scene} key={index}>{scene}</option>
                ))}
            </select>


            <div>
                <button onClick={onStart} disabled={selectedDevice != null && selectedDevice.activeScene === selectedScene}>Démarrer simulation</button>
                <button onClick={onStop} disabled={selectedDevice != null && selectedDevice.activeScene === "Menu"}>Arreter la simulation en cours</button>

            </div>

        </div >
    );
};

export default Connector;