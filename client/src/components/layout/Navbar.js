import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/dashboard"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              
              SUPWEATHER
            </Link>

          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;