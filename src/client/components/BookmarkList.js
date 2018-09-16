import React, { Component } from "react";
import Bookmark from "./Bookmark";
import Container from "muicss/lib/react/container";
import { Table } from "react-bootstrap";
import CreateEditBookmark from "./CreateEditBookmark";

import Pagination from "react-js-pagination";

var PAGE_RANGE_DISPLAYED = 4;
var ITEMS_COUNT_PER_PAGE = 10;
var TOTAL_ITEMS_COUNT;

class BookmarkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      createEditBookmark: false,
      editingData: { title: null, link: null, id: null }
    };
    this.renderList = this.renderList.bind(this);
    this.managerCreateEditForm = this.managerCreateEditForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.handleCreateBookmark = this.handleCreateBookmark.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  managerCreateEditForm(title, link, id) {
    this.setState({
      createEditBookmark: "edit",
      editingData: {
        title: title,
        link: link,
        id: id
      }
    });
  }

  //публікація закладок з фільтром на пагінацію
  renderList() {
    const values = Object.values(this.props.links);

    //search filter
    let arrSearchFiltered;
    if (localStorage.getItem("searchText")) {
      arrSearchFiltered = values.filter((item, i) => {
        if (
          item.title
            .toLowerCase()
            .indexOf(localStorage.getItem("searchText").toLowerCase()) !== -1
        ) {
          return true;
        } else {
          return false;
        }

      });
    } else {
      arrSearchFiltered = values;
    }

    //pagination filter
    let begin, end;
    if (this.state.activePage === 1) {
      begin = 0;
      end = ITEMS_COUNT_PER_PAGE;
    } else {
      begin =
        this.state.activePage * ITEMS_COUNT_PER_PAGE - ITEMS_COUNT_PER_PAGE;
      end = this.state.activePage * ITEMS_COUNT_PER_PAGE;
    }

    let arrPaginated = arrSearchFiltered.slice(begin, end);

    TOTAL_ITEMS_COUNT = arrSearchFiltered.length || values.length;

    if (this.props.links) {
      console.log(arrPaginated);

      return arrPaginated.map((item, i) => {
        let id = "";
        for (let element in this.props.links) {
          if (this.props.links[element] === item) {
            id = element;
          }
        }
        return (
          <Bookmark
            title={item.title}
            id={id}
            key={i}
            link={item.link}
            managerEdit={this.managerCreateEditForm}
          />
        );
      });
    } else {
      return {};
    }
  }
  handleCreateBookmark(event) {
    event.preventDefault();
    this.setState({
      createEditBookmark: "create"
    });
  }

  //callback for deactivation create-edit form
  cancelForm() {
    this.setState({
      createEditBookmark: false
    });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  render() {
    const list = this.renderList();
    let createEditBookmark;
    if (this.state.createEditBookmark === "edit") {
      createEditBookmark = (
        <CreateEditBookmark
          cancelForm={this.cancelForm}
          editingData={this.state.editingData}
          label="Edit"
          {...this.props}
        />
      );
    } else if (this.state.createEditBookmark === "create") {
      createEditBookmark = (
        <CreateEditBookmark
          cancelForm={this.cancelForm}
          label="Create"
          {...this.props}
        />
      );
    } else {
      createEditBookmark = null;
    }

    return (
      <Container className="bookmarkList">
        <Container className="table_area">
          <Table className="table">
            <tbody>{list}</tbody>
          </Table>
          <Container className="paginationArea">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={ITEMS_COUNT_PER_PAGE}
              totalItemsCount={TOTAL_ITEMS_COUNT}
              pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
              onChange={this.handlePageChange}
            />
          </Container>
        </Container>

        <Container>
          <p className="createBookmarkBtn" onClick={this.handleCreateBookmark}>
            Create bookmark
          </p>
        </Container>
        <Container className="createEditBookmarkArea">
          {createEditBookmark}
        </Container>
      </Container>
    );
  }
}

export default BookmarkList;
