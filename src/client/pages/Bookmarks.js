import React, { Component } from "react";
import Header from "../components/Header";
import BookmarkList from "../components/BookmarkList";

import Container from "muicss/lib/react/container";

import bookmarkService from "../../services/bookmarks";

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      searchText: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.updateListAfterCreate = this.updateListAfterCreate.bind(this);
    this.updateListAfterEdit = this.updateListAfterEdit.bind(this);
  }

  componentDidMount() {
    // data for firebase
    bookmarkService.get().then(snapshot => {
      let links = snapshot.val();
      //record data in state with original keys from firebase
      this.setState({
        links
      });
    });
    if (this.state.searchText === "") {
      localStorage.removeItem("searchText");
    }
  }

  handleSearch(arg) {
    this.setState({ searchText: arg });
    localStorage.setItem("searchText", arg);
  }
  // updating after create new bookmark
  updateListAfterCreate(value) {
    //generate random key for temporary saving data in state
    const rand = Math.random() * 10000;
    let links = Object.assign(this.state.links, { [rand]: value });
    this.setState({
      links
    });
  }

  updateListAfterEdit(id, value) {
    let links = Object.assign({}, this.state.links);
    links[id] = value;
    this.setState({
      links
    });
  }

  render() {
    return (
      <Container>
        <Container>
          <Header handleSearch={this.handleSearch} />
        </Container>
        <Container>
          <BookmarkList
            links={this.state.links}
            updateListAfterCreate={this.updateListAfterCreate}
            updateListAfterEdit={this.updateListAfterEdit}
          />
        </Container>
      </Container>
    );
  }
}

export default Bookmarks;
