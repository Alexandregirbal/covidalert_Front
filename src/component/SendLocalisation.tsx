import { report, resourceUsage } from "process";
import React, { useState, useEffect } from "react";
import httpCall from "../services/api/httpcall";
import getUserInfo from "../services/keycloak/getUserInfo";


interface Props {
    authentificated: string;
    keycloak: any;
  }

const SendLocalisation = (props : Props) => {
    const [response, setResponse] = useState(null);

    const {
        authentificated,
        keycloak
    } = props

    useEffect(() => {
        console.log("use effect")
        const interval = setInterval(() => {
            getLocation()
        }, 10000);
        return () => clearInterval(interval);
      }, []);

     const authorizationHeader = () => {
        if (!keycloak) return {};
        return {
          headers: {
            Authorization: "Bearer " + keycloak.token,
          },
        };
      }

      

    const getLocation = () =>{
        console.log("getLocalisation")
    if (navigator.geolocation) {
        const localisation =navigator.geolocation.getCurrentPosition(sendPosition);
        console.log("loca" + localisation)
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
    }

    const sendPosition = (position : any) => {
        
        const email = getUserInfo(keycloak).then((userInfo) => {
            return userInfo.email;
        });
          
        console.log("Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude)
        let result: any;
        result = httpCall("POST","http://localhost:5000/covidalert/api/", {emailUser: email ,latitude : position.coords.latitude, longitude: position.coords.longitude,timestamp: Date.now() }, keycloak.token,result );
        if(result.status === 200){
            console.log("localisation send");
        }
        else {
            console.log(result.status)
        }
    }
    return (
        <>
        </>
    );
}

export default SendLocalisation