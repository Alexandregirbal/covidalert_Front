

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React, { useState, useEffect } from "react";
import httpCall, { httpCallWithoutStringify } from "../services/api/httpcall";
import getUserInfo from "../services/keycloak/getUserInfo";


interface Props {
  keycloak: any;
  userInfo: { firstName: string; lastName: string; email: string; id: any };
}

const UserInfo = (props : Props) => {

  const { keycloak } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // AJOUTER LES ATTRIBUTS EN +

  useEffect(() => {
    console.log(keycloak);
    tryToGetContact(keycloak)
    
    }, []);

    const tryToGetContact = async (keycloak: any) => {
      const userInfo = await getUserInfo(keycloak)
      console.log(userInfo)
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
      setId(userInfo.id);
      setTimeout(()=> {}, 1000)
      getDataBaseUser(userInfo.email,userInfo.firstName,userInfo.lastName);
      
    }
    const getDataBaseUser = (email: String, firstName : String, lastName : String) => {
      const body = {email: email, first_name: firstName, last_name: lastName, birthday: "", phone_number: "", password: ""};
      console.log(body)
      const result = httpCall("GET", `http://localhost:8090/api/users/${email}`,null, sessionStorage.getItem("token"), (result) => {
        setBirthday(result.birthday);
        setPhoneNumber(result.phone_number)
        return result
      });
      if(result != null){
        httpCall("POST", `http://localhost:8090/api/users`,body, sessionStorage.getItem("token"), (result) => {
        console.log("USER : ", result)
      })
      }
      
    }

    const onClick = () => {
      httpCall("PUT", `http://localhost:8090/api/users/${email}`,{email: email, first_name: firstName, last_name: lastName, birthday: birthday, phone_number: phoneNumber, password: null}, sessionStorage.getItem("token"), (result) => {
        console.log("USER : ", result)
        // SET LES ATTRIBUTS EN + SI IL EN A
    })
    }

  return (
    // AFFICHER LES RESULTATS DANS Un FORMULAIRE POUR POUVOIR MODIFIER LES INFORMATIONS
    <div style={{ display : "flex", flexDirection: "column"}}>
      <div>
      <FormControl >
        <InputLabel htmlFor="my-input">email</InputLabel>
        <Input disabled value={email} onChange={ (value) => {setEmail(value.target.value)}} id="my-input"/>
      </FormControl>
      </div>
      <div>
      <FormControl>
        <InputLabel htmlFor="my-input2">firstName</InputLabel>
        <Input disabled value={firstName} onChange={ (value) => {setFirstName(value.target.value)}} id="my-input2"/>
      </FormControl>
      </div>
      <div>
      <FormControl>
        <InputLabel htmlFor="my-input2">lastName</InputLabel>
        <Input disabled value={lastName} onChange={ (value) => {setLastName(value.target.value)}} id="my-input2"/>
      </FormControl>
      </div>
      <div>
      <FormControl>
        <InputLabel htmlFor="my-input4">birthday</InputLabel>
        <Input value={birthday} onChange={ (value) => {setBirthday(value.target.value)}} id="my-input4"/>
      </FormControl>
      </div>
      <div>
      <FormControl>
        <InputLabel htmlFor="my-input5">phoneNumber</InputLabel>
        <Input value={phoneNumber} onChange={ (value) => {setPhoneNumber(value.target.value)}} id="my-input4"/>
      </FormControl>
      </div>

      <div style={{marginTop: 20}}>
      <Button variant="contained" color="primary" onClick={() =>  {onClick()}}>
          Update
      </Button>
      </div>

    </div>
  );
  
}
export default UserInfo;


