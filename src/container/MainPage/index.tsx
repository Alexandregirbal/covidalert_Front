import React, { useState, useEffect } from "react";
import Header from "../../component/header";
import Secured from "../../Secured";

interface Props {}

const MainPage = (props: Props) => {
  return (
    <>
      <Header title="Covid Alert front end" />
      <Secured></Secured>
    </>
  );
};

export default MainPage;
