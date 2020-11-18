import React, { Component, useEffect } from "react";
import Keycloak from "keycloak-js";
import UserInfo from "./UserInfo";
import Logout from "./Logout";
import QueryAPI from "./services/QueryApi";
import SendLocalisation from "./component/SendLocalisation";

class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
    });
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated)
        return (
          <>
            <div style={{ marginLeft: 30, marginBottom: 50 }}>
              <p style={{ textDecoration: "underline" }}>
                You are authenticated with the following information:
              </p>
              <UserInfo keycloak={this.state.keycloak} />
            </div>
            <div>
              <ul>
                <QueryAPI
                  description="declare yourself covided #RIP"
                  buttonDescription="Send alert"
                  keycloak={this.state.keycloak}
                />
                <Logout description="logout" keycloak={this.state.keycloak} />
                <SendLocalisation
                  authenticated={this.state.authenticated}
                  keycloak={this.state.keycloak}
                />
              </ul>
            </div>
          </>
        );
      else return <div>Unable to authenticate!</div>;
    }
    return <div>Initializing Keycloak...</div>;
  }
}
export default Secured;
