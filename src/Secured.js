import React, { Component, useEffect } from "react";
import Keycloak from "keycloak-js";
import UserInfo from "./component/UserInfo";
import Logout from "./Logout";
import QueryAPI from "./services/QueryApi";
import SendLocalisation from "./component/SendLocalisation";
import Alerts from "./container/Alerts";


class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false , email : ""};
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
    });
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated){
        return (
          <>
            <div style={{ marginLeft: 30, marginBottom: 50 }}>
              
              <Logout description="logout" keycloak={this.state.keycloak} />
              <UserInfo keycloak={this.state.keycloak} />
            </div>
            <div>
              <ul>
                
                <SendLocalisation
                  authenticated={this.state.authenticated}
                  keycloak={this.state.keycloak}
                />
              </ul>
            </div>
            <Alerts keycloak={this.state.keycloak}/>
          </>
        );
      }
      else return <div>Unable to authenticate!</div>;
    }
    return <div>Initializing Keycloak...</div>;
  }
}
export default Secured;
