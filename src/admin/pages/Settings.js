import React, { Component } from "react";
import Container from "muicss/lib/react/container";

import PageNavigator from "../components/PageNavigator";
import People from "../components/People";
import Appearence from "../components/Appearence";
import Printers from "../components/Printers";
import Reset from "../components/Reset";


class Settings extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     reset: false
  //   }
  //   this.reset = this.reset.bind(this);
  // }

  // reset(){

  // }
  render() {
    return (
      <Container className="settings">
        <Container className="settingsHeader">
          <Container className="settingsHeaderLeft" >Settings part</Container>
          <Container className="settingsHeaderRigth" />
        </Container>
        <Container className="settingsBody">
          <Container className="settingsBodyLeft">
          </Container>
          <Container className="pageNavigator">
            <PageNavigator />
          </Container>
          <Container className="settingsBodyRigth">
          <Container className="peopleTitle"><p>People</p></Container>
            <Container className="settingsBodyPeople">
            <People/></Container>
          <Container className="peopleTitle"><p>Appearence</p></Container>

            <Container className="settingsBodyAppearence">
            <Appearence ></Appearence></Container>

          <Container className="peopleTitle"><p>Advanced</p></Container>

            <Container className="settingsBodyAdvanced">
          <Container className="peopleTitle"><p>Printing</p></Container>

              <Container className="printing" >
              <Printers/>
              </Container>
          <Container className="peopleTitle"><p>Reset</p></Container>
              
              <Container className="reset" ><Reset reset={this.reset}/></Container>
            </Container>
          </Container>
        </Container>
      </Container>
    ); 
  }
}

export default Settings;

