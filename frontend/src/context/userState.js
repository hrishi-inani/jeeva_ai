import React, {useState} from "react";
import UserContext from "./UserContext.js";


const UserState = (props) => {

    const [recordings, setRecordings] = useState([]);
    const url = 'http://localhost:5000';

    const final = async ( doctorName, patientName, patientAge, recordingDate, audioFile ) => {
        const response = await fetch(`${url}/user/recordings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ doctorName, patientName, patientAge, recordingDate, audioFile })
        });
        
        return response.status;
    };

    const getForm = async () => {
        const response = await fetch(`${url}/user/getRecordings`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json"
            }
        });
        const json = await response.json();
        
        setRecordings(json);
        return json;
    };
    

    return (<UserContext.Provider value={{final, getForm, recordings}}>
        {props.children}
    </UserContext.Provider>
    )
}
export default UserState;