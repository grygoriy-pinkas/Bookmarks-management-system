import React, { Component } from "react";
import Container from "muicss/lib/react/container";
import { Button, FormControl } from "react-bootstrap";
import firebase from "../../firebase";

class CreateEditBookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      link: ""
    };

    this.handleForm = this.handleForm.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.setDefaultValue = this.setDefaultValue.bind(this);
  }

  componentDidMount() {
    if (this.props.editingData) {
      this.setState({
        title: this.props.editingData.title,
        link: this.props.editingData.link,
        id: this.props.editingData.id
      });
    }
  }

  handleForm(event) {
    event.preventDefault();
    //validation of the link to the protocol http/https
    if (this.state.link.search(/(http|https:\/\/)/) !== -1) {
      let obj = {
        link: this.state.link,
        title: this.state.title
      };
      if (this.props.label === "Edit") {
        let id = this.state.id;
        var updates = {};
        updates["/links/" + id] = obj;
        console.log(id);

        firebase
          .database()
          .ref()
          .update(updates);
        this.props.updateListAfterEdit(id, obj);
      } else {
        firebase
          .database()
          .ref("links/")
          .push(obj);
        this.props.updateListAfterCreate(obj);
      }
    } else {
      console.log("Error pattern link");
    }
    this.props.cancelForm();
  }

  onInputChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  //determination value of the field "defaultValue"
  setDefaultValue() {
    if (this.props.editingData !== undefined) {
      return {
        title: this.props.editingData.title,
        link: this.props.editingData.link
      };
    } else {
      return { title: null, link: null };
    }
  }

  render() {
    const defaultValue = this.setDefaultValue();
    return (
      <Container className="createEditBookmark">
        <h1 className="createEditBookmarkTitle">{this.props.label}</h1>
        <form onSubmit={this.handleForm} className="createEditBookmarkForm">
          <h5 className="createEditBookmarkLabel">Bookmark title</h5>
          <FormControl
            type="text"
            name="title"
            defaultValue={defaultValue.title}
            onChange={this.onInputChange}
            className="createEditBookmarkFormItem"
          />
          <h5 className="createEditBookmarkLabel">Bookmark URL</h5>
          <FormControl
            type="text"
            name="link"
            defaultValue={defaultValue.link}
            onChange={this.onInputChange}
            className="createEditBookmarkFormItem"
          />
          <Button
            className="createEditBookmarkBtnCancel"
            onClick={this.props.cancelForm}
          >
            Cancel
          </Button>

          <Button
            bsStyle="success"
            className="createEditBookmarkBtnSave"
            type="submit"
          >
            {this.props.label}
          </Button>
        </form>
      </Container>
    );
  }
}

export default CreateEditBookmark;
