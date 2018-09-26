import React, { Component } from "react";
import Container from "muicss/lib/react/container";

import PageNavigator from "../components/PageNavigator";
import People from "../components/People";
import Appearance from "../components/Appearance";
import Printers from "../components/Printers";
import Reset from "../components/Reset";

import {getDefaultValues} from "../../config";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reset: false,
      backgroundColor: "",
      fontSize: "",
      zoom: ""
    };

    this.changeFont = this.changeFont.bind(this);
    this.changeZoom = this.changeZoom.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
      this.setState({
        backgroundColor: getDefaultValues.backgroundColor,
        fontSize: getDefaultValues.fontSize,
        zoom: getDefaultValues.zoom
      });
    // }
  }
  changeColor = event => {
    this.setState({
      backgroundColor: event.target.value
    });
    localStorage.setItem("backgroundColor", event.target.value);
    console.log("change color");
  };
  changeFont = event => {
    this.setState({
      fontSize: event.target.value
    });
    localStorage.setItem("fontSize", event.target.value);
    console.log("change font");
  };

  changeZoom = event => {
    let zoom = event.target.value.slice(0, 3);
    window.innerWidth = zoom;
    this.setState({
      zoom: `${zoom}%`
    });
    localStorage.setItem("zoom", zoom + "%");
    console.log("change zoom");
  };
  reset() {
    this.setState({
      backgroundColor: "white",
      fontSize: "Small",
      zoom: "100%"
    });
  }

  render() {
    const bodyStyle = document.body.style;

    if (this.state.backgroundColor === "black") {
      bodyStyle.backgroundColor = "black";
      bodyStyle.fontSize= this.state.fontSize;
      bodyStyle.zoom = this.state.zoom;
      bodyStyle.color = 'red';

    } else {
      bodyStyle.backgroundColor = "white";
      bodyStyle.fontSize= this.state.fontSize;
      bodyStyle.zoom = this.state.zoom;
    }
    return (
      <Container className="settings">
        <Container className="settingsHeader">
          <Container className="settingsHeaderLeft">
            <p>Settings part</p>
          </Container>
          <Container className="settingsHeaderRigth" />
        </Container>
        <Container className="settingsBody">
          <Container className="settingsBodyLeft" />
          <Container className="pageNavigator">
            <PageNavigator />
          </Container>
          <Container className="settingsBodyRigth">
            <Container className="peopleTitle">
              <p>People</p>
            </Container>
            <Container className="settingsBodyPeople">
              <People />
            </Container>
            <Container className="peopleTitle">
              <p>Appearance</p>
            </Container>

            <Container className="settingsBodyAppearence">
              <Appearance
                changeColor={this.changeColor}
                changeFont={this.changeFont}
                changeZoom={this.changeZoom}
                backgroundColor={this.state.backgroundColor}
                zoom={this.state.zoom}
                fontSize={this.state.fontSize}
              />
            </Container>

            <Container className="peopleTitle">
              <p>Advanced</p>
            </Container>

            <Container className="settingsBodyAdvanced">
              <Container className="peopleTitle">
                <p>Printing</p>
              </Container>

              <Container className="printing">
                <Printers />
              </Container>
              <Container className="peopleTitle">
                <p>Reset</p>
              </Container>

              <Container className="reset">
                <Reset reset={this.reset} />
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default Settings;
