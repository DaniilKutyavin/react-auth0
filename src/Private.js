import React, { Component } from "react";

export default class Public extends Component {
  state = {
    message: ""
  };

  componentDidMount = () => {
    fetch("/private", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Networt response was not ok");
      })
      .then(({ message }) => this.setState({ message }))
      .catch(({ message }) => this.setState({ message }));
  };

  render() {
    return <p>{this.state.message}</p>;
  }
}
