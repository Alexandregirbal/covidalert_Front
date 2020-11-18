import { report, resourceUsage } from "process";
import React, { useState, useEffect } from "react";
import httpCall from "../services/api/httpcall";
import getUserInfo from "../services/keycloak/getUserInfo";

interface Props {
  authentificated: string;
  keycloak: any;
}

const SendLocalisation = (props: Props) => {
  const [response, setResponse] = useState(null);

  const { authentificated, keycloak } = props;

  useEffect(() => {
    console.log("use effect");
    const interval = setInterval(() => {
      getLocation();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const authorizationHeader = () => {
    if (!keycloak) return {};
    return {
      headers: {
        Authorization: "Bearer " + keycloak.token,
      },
    };
  };

  const getLocation = () => {
    console.log("getLocalisation");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sendPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const sendPosition = async (position: any) => {
    const email = await getUserInfo(keycloak).then((userInfo) => {
      return userInfo?.email;
    });

    console.log({
      userEmail: email,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timestamp: Math.trunc(Date.now() / 1000),
    });
    let result: any;
    httpCall(
      "POST",
      "http://localhost:8090/api/locations/send",
      {
        userEmail: email,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: Math.trunc(Date.now() / 1000),
      },
      keycloak.token,
      (result) => {
        console.log("ALEX: sendPosition -> result", result);
      }
    );
  };
  return <></>;
};

export default SendLocalisation;
