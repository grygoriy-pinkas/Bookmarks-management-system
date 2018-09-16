import React, { Component } from "react";
import services from "../../services/bookmarks";

class PrintBookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    services.get().then(snapshot => {
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
      setTimeout(() => window.print(), 2000);
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
