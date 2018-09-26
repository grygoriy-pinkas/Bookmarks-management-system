import React, { Component } from "react";

import Container from "muicss/lib/react/container";
import { FormGroup, FormControl } from "react-bootstrap";

import firebase from "../../firebase";

class Appearence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      link: ""
    };
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.onAddBookmarkChange = this.onAddBookmarkChange.bind(this);
  }

  changeColor = event => {
    this.props.changeColor(event);
  };
  changeFont = event => {
    this.props.changeFont(event);
  };
  changeZoom = event => {
    this.props.changeZoom(event);
  };
  onAddBookmarkChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  handleAddBookmark() {
    if (this.state.link.search(/(http|https:\/\/)/) !== -1) {
      let obj = {
        link: this.state.link,
        title: this.state.title
      };

      firebase
        .database()
        .ref("links/")
        .push(obj);
    } else {
      console.log("Enter please correct URL");
    }
  }

  render() {
    return (
      <Container className="">
        <form>
          <Container className="appearenceThemes">
            <p className="appearenceInsideTitleArea">Themes</p>

            <label htmlFor="white">White</label>
            <input
              type="radio"
              id="white"
              name="white"
              value="white"
              onClick={this.changeColor}
              checked={this.props.backgroundColor === "white" ? true : false}
            />
            <label htmlFor="black">Black</label>
            <input
              type="radio"
              id="black"
              name="black"
              value="black"
              checked={this.props.backgroundColor === "black" ? true : false}
              onClick={this.changeColor}
            />
          </Container>

          <Container className="appearenceAddBookmark">
            <p className="appearenceInsideTitleArea">Add bookmark</p>
            <p className="appearenceAddBookmarkTitle">Bookmark title</p>
            <span>
              <input
                type="text"
                onChange={this.onAddBookmarkChange}
                name="title"
                className="appearenceAddBookmarkInput"
              />
            </span>
            <p className="appearenceAddBookmarkTitle">Bookmark URL</p>
            <span>
              <input
                onChange={this.onAddBookmarkChange}
                name="link"
                type="text"
                className="appearenceAddBookmarkInput"
              />
              <p
                className="appearenceAddBookmarkBtnAdd"
                onClick={this.handleAddBookmark}
              >
                Add
              </p>
            </span>
          </Container>
          <Container className="appearenceAddBookmarkSwitch">
            <p>Show bookmarks</p>
            <input type="radio" className="appearenceAddBookmarkSwitchInput" />
          </Container>
          <Container className="appearenceFont">
            <p className="appearenceFontTitle">Font size</p>

            <FormGroup controlId="formControlsSelect">
              <FormControl
                className="appearenceSelects"
                componentClass="select"
                placeholder="select"
                value={this.props.fontSize}
                onChange={this.changeFont}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </FormControl>
            </FormGroup>
          </Container>
          <Container className="appearenceZoom">
            <p className="appearenceFontTitle">Page zoom</p>
            <FormGroup controlId="formControlsSelect">
              <FormControl
                componentClass="select"
                placeholder="select"
                value={this.props.zoom}
                onChange={this.changeZoom}
                className="appearenceSelects"
              >
                <option value="100%">100%</option>
                <option value="120%">120%</option>
                <option value="140%">140%</option>
              </FormControl>
            </FormGroup>
          </Container>
        </form>
      </Container>
    );
  }
}
export default Appearence;
