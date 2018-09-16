import React, { Component } from "react";
import Container from "muicss/lib/react/container";

class Reset extends Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
  }

  reset() {
    localStorage.setItem("backgroundColor", "white");
    localStorage.setItem("fontSize", "Small");
    localStorage.setItem("zoom", "100%");
    window.location.reload();
  }

  render() {
    return (
      <Container className="resetArea">
        <p className="resetAreaBtn" onClick={this.reset}>
          Reset
        </p>
        <p className="resetAreaDescr">
          Restore settings to their original defaults
        </p>
      </Container>
    );
  }
}

export default Reset;
