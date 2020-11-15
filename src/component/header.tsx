import React, { useState, useEffect } from "react";

interface Props {
  title: string;
}

const Header = (props: Props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>{props.title}</h1>
    </div>
  );
};

export default Header;
