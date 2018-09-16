import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

import one from "../../static/one.jpg";
import two from "../../static/two.jpg";
import three from "../../static/three.jpg";
import four from "../../static/four.jpg";
import five from "../../static/five.jpg";

class ChooseIcon extends Component {
  constructor(props) {
    super(props);
    this.handleChoose = this.handleChoose.bind(this);
  }

  handleChoose(event) {
    let data = event.target.name;
    this.props.close(data);
  }

  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Choose Icon</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div onClick={this.handleChoose}>
              <img src={one} name="one" className="chooseIconImg" alt="avatar"/>
              <img src={two} name="Two" className="chooseIconImg" alt="avatar"/>
              <img src={three} name="three" className="chooseIconImg" alt="avatar"/>
              <img src={four} name="four" className="chooseIconImg" alt="avatar"/>
              <img src={five} name="five" className="chooseIconImg" alt="avatar"/>
            </div>
            <p>To select the icon, please click on!</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.close}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}
export default ChooseIcon;
