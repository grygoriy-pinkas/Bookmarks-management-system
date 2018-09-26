import React, { Component } from "react";
import { FormControl, FormGroup } from "react-bootstrap";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleChange(event) {
    this.props.handleSearch(event.target.value);
    localStorage.setItem("searchText", event.target.value);
    event.preventDefault();
  }

  handleSearch(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className="search">
        <FormGroup bsSize="large" onSubmit={this.handleSearch}>
          <FormControl
            bsClass="searchInput"
            type="text"
            placeholder="Search"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
}

export default Search;
