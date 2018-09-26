import React, { Component } from "react";

import bookmarkService from "../../services/bookmarks";

class PrintBookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    bookmarkService.get().then(snapshot => {
      let links = snapshot.val();
      this.setState({
        links: Object.values(links)
      });
    });
  }

  render() {
    let row = this.state.links.map((item, i) => {
      return (
        <tr>
          <td>{item.title}</td>
          {item.link}
          <td />
          <hr />
        </tr>
      );
    });
    if (row) {
      setTimeout(() => window.print(), 1000);
    }
    return (
      <table className="tableToPrint">
        <thead />
        <tbody>{row}</tbody>
      </table>
    );
  }
}

export default PrintBookmarks;
