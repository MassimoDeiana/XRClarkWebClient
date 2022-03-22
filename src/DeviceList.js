import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DeviceList = (props) => {

    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState();

    const handleChange = (e) => {
        //console.log(JSON.parse(e.target.value));

        setSelectedDevice(JSON.parse(e.target.value));
    };

    // useEffect(() => {
    //     axios.get("https://localhost:7050/api/Server").then((res) => setDevices(res.data))
    // }, [])



    const onStart = () => {
        console.log(selectedDevice);
        props.startSimulation(selectedDevice);
    }

    const onStop = () => {
        props.stopSimulation(selectedDevice);
    }

    return (
        <div>

            <select onChange={handleChange}>
                <option>Aucun casque séléctionné</option>
                {devices.map((device, index) => (
                    <option value={JSON.stringify(device)} key={index}>{device.name}</option>
                ))}
            </select>

            <div>
                <button onClick={onStart}>Start simulation</button>
                <button onClick={onStop}>Stop simulation</button>
            </div>

        </div>
    );
};

export default DeviceList;