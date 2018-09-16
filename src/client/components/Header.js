import React, { Component } from "react";
import Container from "muicss/lib/react/container";
import Logo from "./Logo";
import Search from "./Search";

class Header extends Component {
  render() {
    return (
      <Container className="header">
        <Container className="title">
          <p>Website page part</p>
        </Container>

        <Logo />
        <Search {...this.props} />
      </Container>
    );
  }
}

export default Header;
