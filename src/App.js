import React, { Component } from "react";
import "./App.css";

import Bookmarks from "./client/pages/Bookmarks";
import Settings from "./admin/pages/Settings";

import { Router, Route, NavLink } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import PrintBookmarks from "./admin/components/PrintBookmarks";

const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    let options = {
      backgroundColor: localStorage.getItem("backgroundColor") || "white",
      fontSize: localStorage.getItem("fontSize") || "Small",
      zoom: localStorage.getItem("zoom") | "100%"
    };

    document.body.style = `background-color:${options.backgroundColor};
    font-size: ${options.fontSize};
    zoom: ${options.zoom};
    `;
  }
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <ul className="menu">
              <li>
                <NavLink to="/bookmarks" activeclassname="selected">
                  Bookmarks
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" activeclassname="selected">
                  Settings
                </NavLink>
              </li>
            </ul>

            <Route exact path="/bookmarks" component={Bookmarks} />
            <Route path="/settings" component={Settings} />
            <Route path="/print" component={PrintBookmarks} />
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
