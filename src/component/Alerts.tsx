import React, { useState, useEffect } from "react";
import { getEmail } from "../services/keycloak/getEmail";
import httpCall from "../services/api/httpcall";

interface Props {
  keycloak: any;
}

const Alerts = (props: Props) => {
    const { keycloak } = props;

    const [alert, setAlert] = useState(false);

    useEffect(() => {
        getAlerts(keycloak);
        }, [])

    const getAlerts = async (keycloak: any) => {
        const email = await getEmail(keycloak);
        console.log("TOKEN " + sessionStorage.getItem("token"));
        httpCall("GET", `http://localhost:8090/api/alert?userEmail=${email}`,null, sessionStorage.getItem("token"), (result) => {
            setAlert(result) 
        })
       
    }
    

return (
<div style={{ textAlign: "center" }}>
    {alert ? ( 
 
     <div>
         Vous êtes cas contact
     </div>

    ) : <div> Vous n'êtes pas cas contact </div>}
    
</div>
);
};

export default Alerts;
