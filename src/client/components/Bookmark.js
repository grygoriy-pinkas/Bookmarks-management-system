import React, { Component } from "react";

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.onEditingData = this.onEditingData.bind(this);
  }

  onEditingData(event) {
    this.props.managerEdit(this.props.title, this.props.link, this.props.id);
  }
  render() {
    return (
      <tr className="row">
        <td className="col1">
          <a href={this.props.link}>{this.props.title}</a>
        </td>
        <td className="col2">
          <span> </span>
          <p onClick={this.onEditingData}>Edit</p>
        </td>
      </tr>
    );
  }
}

export default Bookmark;
