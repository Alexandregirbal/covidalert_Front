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

  handleClick = () => {
    fetch(this.props.uri, this.authorizationHeader())
      .then((response) => {
        if (response.status === 200) {
          let json = response.json();
          return json;
        } else return { status: response.status, message: response.statusText };
      })
      .then((json) => {
        this.setState((state, props) => ({
          response: json.message,
        }));
      })
      .catch((err) => {
        this.setState((state, props) => ({ response: err.toString() }));
      });
  };

  render() {
    return (
      <li className="QueryAPI">
        <p>
          {`Click this button to ${this.props.description}: `}
          <button style={{}} onClick={this.handleClick}>
            {this.props.buttonDescription}
          </button>
          <APIResponse response={this.state.response} />
        </p>
      </li>
    );
  }
}

export default QueryAPI;
