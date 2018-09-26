import React, { Component } from "react";
import Bookmark from "./Bookmark";
import Container from "muicss/lib/react/container";
import { Table } from "react-bootstrap";
import CreateEditBookmark from "./CreateEditBookmark";

import Pagination from "react-js-pagination";
import { paginationDefaults } from "../../config";

class BookmarkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      createEditBookmark: false,
      editingData: { title: null, link: null, id: null },
      TOTAL_ITEMS_COUNT: null
    };
    this.renderList = this.renderList.bind(this);
    this.managerCreateEditForm = this.managerCreateEditForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.handleCreateBookmark = this.handleCreateBookmark.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.calculatePagination = this.calculatePagination.bind(this);
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

  calculatePagination(arrSearchFiltered, values) {
    let begin, end;
    if (this.state.activePage === 1) {
      begin = 0;
      end = paginationDefaults.ITEMS_COUNT_PER_PAGE;
    } else if (arrSearchFiltered != values) {
      begin = 0;
      end = this.state.activePage * paginationDefaults.ITEMS_COUNT_PER_PAGE;
    } else {
      begin =
        this.state.activePage * paginationDefaults.ITEMS_COUNT_PER_PAGE -
        paginationDefaults.ITEMS_COUNT_PER_PAGE;
      end = this.state.activePage * paginationDefaults.ITEMS_COUNT_PER_PAGE;
    }

    let arrPaginated = arrSearchFiltered.slice(begin, end);
    const TOTAL_ITEMS_COUNT = arrSearchFiltered.length || values.length;
    localStorage.setItem("TOTAL_ITEMS_COUNT", TOTAL_ITEMS_COUNT);
    return arrPaginated;
  }

  renderList() {
    const values = Object.values(this.props.links);
    //search filter
    let arrSearchFiltered;
    let goal = localStorage.getItem("searchText");
    if (goal) {
      arrSearchFiltered = values.filter((item, i) => {
        if (item.title.toLowerCase().indexOf(goal.toLowerCase()) !== -1) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      arrSearchFiltered = values;
    }

    if (this.props.links) {
      return this.calculatePagination(arrSearchFiltered, values).map((item, i) => {

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
          label="Save"
          title="Edit"
          {...this.props}
        />
      );
    } else if (this.state.createEditBookmark === "create") {
      createEditBookmark = (
        <CreateEditBookmark
          cancelForm={this.cancelForm}
          label="Create"
          title="Create"
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
              itemsCountPerPage={paginationDefaults.ITEMS_COUNT_PER_PAGE}
              totalItemsCount={localStorage.getItem("TOTAL_ITEMS_COUNT")}
              pageRangeDisplayed={paginationDefaults.PAGE_RANGE_DISPLAYED}
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
