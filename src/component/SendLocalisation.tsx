import React, { useEffect, useState } from "react";
import httpCall, { httpCallWithoutStringify } from "../services/api/httpcall";
import getUserInfo from "../services/keycloak/getUserInfo";

interface Props {
  authentificated: string;
  keycloak: any;
  userInfo: { firstName: string; lastName: string; email: string; id: any };
}

const SendLocalisation = (props: Props) => {
  const [email, setEmail] = useState("");

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
      console.error("Geolocation is not supported by this browser.");
    }
  };
  const declareCovid = async () => {
    httpCallWithoutStringify(
      "POST",
      "http://localhost:8090/api/covid/declaration",
      email,
      sessionStorage.getItem("token"),
      (result) => {
        console.log("ALEX: getLocation -> result", result);
      }
    );
  };

  const sendPosition = async (position: any) => {
    console.log("Trying to send position");
    const email = await getUserInfo(keycloak).then((userInfo) => {
      return userInfo?.email;
    });
    setEmail(email);
    if (!email) return;
    const body = {
      userEmail: email,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timestamp: Math.trunc(Date.now() / 1000),
    };
    console.log(body);
    let result: any;
    httpCall(
      "POST",
      "http://localhost:8090/api/locations/send",
      body,
      sessionStorage.getItem("token"),
      (result) => {
        console.log("ALEX: sendPosition -> result", result);
      }
    );
  };
  return (
    <li className="QueryAPI">
      <p>
        {`Click this button to declare yourself covid+: `}
        <button style={{}} onClick={declareCovid}>
          Declare Covid+
        </button>
      </p>
    </li>
  );
};

export default SendLocalisation;
