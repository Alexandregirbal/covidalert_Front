import React, { useState, useEffect } from "react";
import getUserInfo from "./getUserInfo";

export const getEmail = async (keycloak : any) => {
    return await getUserInfo(keycloak).then((userInfo) => {
        return userInfo?.email;
      });

}
