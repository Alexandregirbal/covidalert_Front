import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Logout extends Component {
  logout() {
    this.props.history.push("/");
    this.props.keycloak.logout();
  }

  render() {
    return (
      <li>
        <p>
          {`Click this button to ${this.props.description}: `}
          <button onClick={() => this.logout()}>Logout</button>
        </p>
      </li>
    );
  }
}
export default withRouter(Logout);
