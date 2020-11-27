import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Header from "../../component/header";
import Secured from "../../Secured";

interface Props {}

const MainPage = (props: Props) => {
  return (
    <Container>
      <Header title="Covid Alert front end" />
      <Secured></Secured>
    </Container>
  );
};

export default MainPage;
