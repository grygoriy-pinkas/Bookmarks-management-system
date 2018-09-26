import React, { Component } from "react";
import Container from "muicss/lib/react/container";
import { NavLink } from "react-router-dom";

class Printers extends Component {
 
  render() {
    return (
      <Container>
        <NavLink to="/print" activeClassName="selected">
          <p className="printingBtn"> Printers</p>
        </NavLink>
      </Container>
    );
  }
}

export default Printers;
