import React, { Component } from "react";

export default class Courses extends Component {
  state = {
    courses: []
  };

  componentDidMount = () => {
    fetch("/course", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Networt response was not ok");
      })
      .then(({ courses }) => this.setState({ courses }))
      .catch(({ message }) => this.setState({ message }));

    fetch("/admin", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Networt response was not ok");
      })
      .then(response => console.log(response))
      .catch(response => console.log(response));
  };

  render() {
    return (
      <ul>
        {this.state.courses.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    );
  }
}
