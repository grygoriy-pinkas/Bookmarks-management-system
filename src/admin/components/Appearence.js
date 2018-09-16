import React, { Component } from "react";
import Container from "muicss/lib/react/container";

import firebase from "../../firebase";

class Appearence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "",
      fontSize: "",
      zoom: "",
      title: "",
      link: ""
    };
    this.changeColor = this.changeColor.bind(this);
    this.changeFont = this.changeFont.bind(this);
    this.changeZoom = this.changeZoom.bind(this);
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.onAddBookmarkChange = this.onAddBookmarkChange.bind(this);
  }

  componentDidMount() {
    let options = {
      backgroundColor: localStorage.getItem("backgroundColor"),
      fontSize: localStorage.getItem("fontSize"),
      zoom: localStorage.getItem("zoom")
    };
    if (Object.keys(options).length) {
      this.setState({
        backgroundColor: options.backgroundColor || "white",
        fontSize: options.fontSize || "Small",
        zoom: options.zoom || "100%"
      });
    }
  }

  changeColor = event => {
    this.setState({
      backgroundColor: event.target.value
    });
    localStorage.setItem("backgroundColor", event.target.value);
  };
  changeFont = event => {
    this.setState({
      fontSize: event.target.value
    });
    localStorage.setItem("fontSize", event.target.value);
  };

  changeZoom = event => {
    let zoom = event.target.value.slice(0, 3);
    console.log(zoom);
    window.innerWidth = zoom;
    this.setState({
      zoom: `${zoom}%`
    });
    localStorage.setItem("zoom", zoom + "%");
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
    if (this.state.backgroundColor === "white") {
      document.body.style = `background-color: white;
      font-size: ${this.state.fontSize};
      zoom: ${this.state.zoom};
      `;
    } else {
      document.body.style = `background-color: black;
      font-size: ${this.state.fontSize};
      color: red;
      zoom: ${this.state.zoom}`;
    }

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
              checked={this.state.backgroundColor === "white" ? true : false}
            />
            <label htmlFor="black">Black</label>
            <input
              type="radio"
              id="black"
              name="black"
              value="black"
              checked={this.state.backgroundColor === "black" ? true : false}
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
            <hr />
          </Container>
          <Container className="appearenceAddBookmarkSwitch">
            <p>Show bookmarks</p>
            <input type="radio" className="appearenceAddBookmarkSwitchInput" />
          </Container>
          <Container className="appearenceFont">
            <p className="appearenceFontTitle">Font size</p>
            <select
              value={this.state.fontSize}
              onChange={this.changeFont}
              className="appearenceFontInput"
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </Container>
          <Container className="appearenceZoom">
            <p className="appearenceFontTitle">Page zoom</p>
            <select
              value={this.state.zoom}
              onChange={this.changeZoom}
              className="appearenceFontInput"
            >
              <option value="100%">100%</option>
              <option value="120%">120%</option>
              <option value="140%">140%</option>
            </select>
          </Container>
        </form>
      </Container>
    );
  }
}
export default Appearence;
