import React, { Component } from "react";
import Container from "muicss/lib/react/container";

import {setLocalStorageValues as defaultValues} from "../../config";
class Reset extends Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
  }

  reset() {
    defaultValues();
    this.props.reset();
  }

  render() {
    return (
      <Container className="resetArea">
        <span className="resetAreaBtn" onClick={this.reset}>
          Reset
        </span>
        <p className="resetAreaDescr">
          Restore settings to their original defaults
        </p>
      </Container>
    );
  }
}

export default Reset;
