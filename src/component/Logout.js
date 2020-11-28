import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Logout extends Component {
  logout() {
    this.props.history.push("/");
    this.props.keycloak.logout();
  }

  render() {
    return (
      
        <p>
          <button onClick={() => this.logout()}>Logout</button>
        </p>
      
    );
  }
}
export default withRouter(Logout);
