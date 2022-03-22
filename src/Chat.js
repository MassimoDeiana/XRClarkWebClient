import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import DeviceList from './DeviceList';
import axios from 'axios';


const Chat = () => {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState();

    latestChat.current = chat;

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

                    connection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                        console.log(message);
                        setChat(updatedChat);
                    });
                    connection.send('RegisterWebClient');

                    connection.on('ReceiveListOfUser', res => {
                        console.log("ici");
                        setDevices(res);
                        // console.log(selectedDevice.ActiveScene);
                        console.log("lalalala");

                    })
                    console.log(devices);

                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };

        //        if (connection.connectionStarted) {
        try {
            await connection.send('SendMessage', chatMessage);
        }
        catch (e) {
            console.log(e);
        }
        /*        }
                else {
                    alert('No connection to server yet.');
                }*/
    }



    const startSimulation = async (selectedDevice) => {
        //console.log(selectedDevice);
        const user = {
            name: selectedDevice.name,
            model: selectedDevice.model,
            macAdress: selectedDevice.macAdress,
            activeScene: selectedDevice.ActiveScene,
            id: selectedDevice.id
        }
        try {
            await connection.send('StartSimulation', user);
            //console.log("start");
        }
        catch (e) {
            console.log(e);
        }
    }

    const stopSimulation = async (selectedDevice) => {
        console.log(selectedDevice);
        const user = {
            name: selectedDevice.name,
            model: selectedDevice.model,
            macAdress: selectedDevice.macAdress,
            activeScene: selectedDevice.ActiveScene,
            id: selectedDevice.id
        }
        try {
            await connection.send('StopSimulation', user);
            //console.log("stop");
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleChange = (e) => {
        //console.log(JSON.parse(e.target.value));

        setSelectedDevice(JSON.parse(e.target.value));
    };

    useEffect(() => {
        axios.get("https://localhost:7050/api/Server").then((res) => setDevices(res.data))
    }, [])



    const onStart = () => {
        //console.log(selectedDevice);
        startSimulation(selectedDevice);
        selectedDevice.activeScene = "BasicHandling";
    }

    const onStop = () => {
        stopSimulation(selectedDevice);
        selectedDevice.activeScene = "Menu";

    }


    return (
        <div>

            <select onChange={handleChange}>
                <option>Aucun casque séléctionné</option>
                {devices.map((device, index) => (
                    <option id="test" value={JSON.stringify(device)} key={index}>{device.name}</option>
                ))}
            </select>

            <div>
                <button onClick={onStart} disabled={selectedDevice != null && selectedDevice.activeScene === "BasicHandling"}>Start simulation</button>
                <button onClick={onStop} disabled={selectedDevice != null && selectedDevice.activeScene === "Menu"}>Stop simulation</button>
            </div>

        </div >
    );
};

export default Chat;