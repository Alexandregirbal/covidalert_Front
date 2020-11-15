import React, { Component } from "react";
import getUserInfo from "./services/keycloak/getUserInfo";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      id: "",
    };
  }
  componentDidMount() {
    getUserInfo(this.props.keycloak).then((userInfo) => {
      this.setState({ ...userInfo });
    });
  }

  render() {
    return (
      <div className="UserInfo">
        <p>Firstname: {this.state.firstName}</p>
        <p>Lastname: {this.state.lastName}</p>
        <p>Email: {this.state.email}</p>
        <p>ID: {this.state.id}</p>
      </div>
    );
  }
}
export default UserInfo;
