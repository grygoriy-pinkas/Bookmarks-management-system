import React, { Component } from "react";
import Container from "muicss/lib/react/container";
import { Button, FormControl } from "react-bootstrap";

import firebase from "../../firebase";

import * as images from "../../static/";

import ChooseIcon from "./ChooseIcon";

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUser: {},
      id: "",
      ifEdit: false,
      manageOtherPeople: false,
      chooseIcon: false,
      icon: "",
      choosenIcon: "",
      changeIcon: false,
      name: "",
      email: "",
      errorMassage: ""
    };
    this.getLastUsers = this.getLastUsers.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.addPerson = this.addPerson.bind(this);
    this.onChooseIcon = this.onChooseIcon.bind(this);
    this.onCloseChooseIcon = this.onCloseChooseIcon.bind(this);
    this.handleFormAddUser = this.handleFormAddUser.bind(this);
    this.onInputChangeName = this.onInputChangeName.bind(this);
    this.onInputChangeEmail = this.onInputChangeEmail.bind(this);
    this.cancelManageOtherPeopleForm = this.cancelManageOtherPeopleForm.bind(
      this
    );
    this.handleEditForm = this.handleEditForm.bind(this);
    this.onChangeIcon = this.onChangeIcon.bind(this);
    this.onCloseChangeIcon = this.onCloseChangeIcon.bind(this);
  }
  componentDidMount() {
    this.getLastUsers();
  }
  getLastUsers() {
    var rootRef = firebase.database().ref("people");
    rootRef.once("value").then(snapshot => {
      let people = Object.values(snapshot.val());
      let keys = Object.keys(snapshot.val());
      this.setState({
        id: keys[0],
        lastUser: people[0],
        icon: people[0].icon
      });
    });
  }
  handleFormAddUser(event) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) {
      this.setState({
        errorMassage: "Uncorrect email"
      });
    } else {
      firebase
        .database()
        .ref("people/")
        .push({
          name: this.state.name,
          email: this.state.email,
          icon: this.state.choosenIcon
        });
      this.setState({ manageOtherPeople: false });
    }

    event.preventDefault();
  }

  onEdit() {
    this.setState({
      ifEdit: true,
      name: this.state.lastUser.name,
      email: this.state.lastUser.email
    });
  }
  addPerson() {
    this.setState({ manageOtherPeople: true });
  }
  onChooseIcon() {
    this.setState({
      chooseIcon: true
    });
  }
  onCloseChooseIcon(arg) {
    this.setState({
      chooseIcon: false,
      choosenIcon: arg
    });
    console.log(this.state);
  }
  onInputChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }
  onInputChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  cancelManageOtherPeopleForm() {
    this.setState({
      manageOtherPeople: false
    });
  }
  handleEditForm() {
    let updates = {};
    updates["/people/" + this.state.id] = {
      email: this.state.email,
      icon: this.state.icon,
      name: this.state.name
    };
    firebase
      .database()
      .ref()
      .update(updates);
    this.setState({
      ifEdit: false,
      lastUser: { name: this.state.name, email: this.state.email }
    });
  }
  onChangeIcon() {
    this.setState({ changeIcon: true });
  }
  onCloseChangeIcon(arg) {
    this.setState({
      changeIcon: false,
      icon: arg
    });
  }
  render() {
    let chooseIcon;
    if (this.state.chooseIcon) {
      chooseIcon = <ChooseIcon close={this.onCloseChooseIcon} />;
    } else {
      chooseIcon = null;
    }
    let changeIcon;
    if (this.state.changeIcon) {
      changeIcon = <ChooseIcon close={this.onCloseChangeIcon} />;
    } else {
      changeIcon = null;
    }

    let manageOtherPeople;
    if (!this.state.manageOtherPeople) {
      manageOtherPeople = (
        <Container className="peopleManageOtherPeople">
          <p className="peopleManageOtherPeopleBtn" onClick={this.addPerson}>
            Manage other people
          </p>
        </Container>
      );
    } else {
      manageOtherPeople = (
        <Container className="peopleManageOtherPeople">
          <form
            onSubmit={this.handleFormAddUser}
            className="manageOtherPeopleForm"
          >
            <p className="errorMassage">{this.state.errorMassage}</p>
            <div className="manageOtherPeopleFormInputs">
              <FormControl
                ref="name"
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.onInputChangeName}
              />
              <FormControl
                type="text"
                name="email"
                ref="email"
                placeholder="Email"
                onChange={this.onInputChangeEmail}
              />
            </div>
            <div className="manageOtherPeopleFormChooseIcon">
              <Button
                bsStyle="info"
                className="chooseIconBtn"
                onClick={this.onChooseIcon}
              >
                {" "}
                Choose Icon
              </Button>
            </div>
            <div className="manageOtherPeopleFormButtons">
              <Button
                className="createEditBookmarkBtnCancel"
                onClick={this.cancelManageOtherPeopleForm}
              >
                Cancel
              </Button>
              <Button
                bsStyle="success"
                className="createEditBookmarkBtnSave"
                type="submit"
                onClick={this.handleFormAddUser}
              >
                Save
              </Button>
            </div>
          </form>
          {chooseIcon}
        </Container>
      );
    }
    if (!this.state.ifEdit) {
      return (
        <Container>
          <Container className="peopleRenderUser">
            <img src={images[this.state.icon]} alt="avatar" className="peopleUserAvatar" />
            <div className="peopleUserInfo">
              <p className="peopleUserInfoName">{this.state.lastUser.name}</p>
              <p>{this.state.lastUser.email}</p>
            </div>
            <div className="peopleUserEdit">
              <p onClick={this.onEdit}>Edit</p>
            </div>
          </Container>
          {manageOtherPeople}
        </Container>
      );
    } else {
      return (
        <Container>
          <Container className="peopleRenderUser">
            <img
              src={images[this.state.icon]}
              alt="avatar"
              onClick={this.onChangeIcon}
              className="peopleUserAvatar"
            />
            <div className="peopleUserInfo">
              <form onSubmit={this.handleEditForm}>
                <FormControl
                  type="text"
                  name="name"
                  defaultValue={this.state.lastUser.name}
                  onChange={this.onInputChangeName}
                />
                <FormControl
                  type="text"
                  name="name"
                  defaultValue={this.state.lastUser.email}
                  onChange={this.onInputChangeEmail}
                />
              </form>
              {changeIcon}
            </div>
            <div className="peopleUserEdit">
              <p onClick={this.handleEditForm}>Save</p>
            </div>
          </Container>
          {manageOtherPeople}
        </Container>
      );
    }
  }
}

export default People;
