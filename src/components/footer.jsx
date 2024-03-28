import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer id="footer">
        <div className="row">
          <div
            id="footer-left-col"
            className="col-sm order-sm-1 order-2 d-flex align-items-center"
          >
            <div id="tosAndPp" className="row">
              <div className="col-xs">
                <Link to="/terms-of-service" id="tos">
                  Terms&nbsp;of&nbsp;Service
                </Link>
              </div>
              <div className="col-xs" id="pp">
                <Link to="/privacy-policy">Privacy&nbsp;Policy</Link>
              </div>
            </div>
          </div>
          <div className="col-sm order-sm-2 order-1 d-flex align-items-center justify-content-center">
            <a href="https://www.facebook.com/Guidex-1833148276731120">
              <i className="fa fa-facebook-square p-1" aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/guidexapp/">
              <i className="fa fa-instagram p-1" aria-hidden="true" />
            </a>
            <a href="mailto:info@guidex.app?subject=Hello, I am comming from your site!">
              <i className="fa fa-envelope-o p-1" aria-hidden="true" />
            </a>
          </div>
          <div id="copyright-col" className="col-sm order-sm-3 order-3">
            {/*<span id="copyright">
              Copyright © {new Date().getFullYear()} Guidex
    </span>*/}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
