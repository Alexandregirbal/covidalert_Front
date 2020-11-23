import React, { Component } from "react";

class APIResponse extends Component {
  render() {
    return this.props.response ? (
      <span style={{ marginLeft: 10, fontStyle: "italic", color: "#068227" }}>
        {this.props.response}
      </span>
    ) : (
      <span />
    );
  }
}

class QueryAPI extends Component {
  constructor(props) {
    super(props);
    this.state = { response: null };
  }

  authorizationHeader() {
    if (!this.props.keycloak) return {};
    return {
      headers: {
        Authorization: "Bearer " + this.props.keycloak.token,
      },
    };
  }

  handleClick = () => {};

  render() {
    return <></>;
  }
}

export default QueryAPI;
