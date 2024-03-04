import React from "react";
import "../css/Footer.css";

export default function Footer() {
    return (
        <footer className="Footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col 12">
                        <div>
                            <span style={{ display: "inline-block", marginTop: 5 }}>
                                Contact with Johny
                            </span>

                            <ul>
                                <li>
                                    <i className="fa fa-envelope"></i> info@johny_sphinks@gmail.com
                                </li>
                                <li>
                                    <i className="fa fa-phone"></i> +38099264473
                                </li>
                                <li>
                                    <i className="fa fa-map-marker"></i> Peremohy Avenue
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4 col-12" style={{ marginTop: 10 }}>
                        <h4 style={{ color: "lightgrey" }}>&nbsp;</h4>
                    </div>
                    <div className="col-md-4 col-12" style={{ marginTop: 10 }}>
                        <h4 style={{ color: "lightgrey", textAlign: "justify" }}>
                            {" "}
                            Terms & Policies{" "}
                        </h4>
                        <nav className="Navfooter">
                            <ul className="list-unstyled">
                                <li>
                                    <ul>Privacy Cat</ul>
                                </li>
                                <li>
                                    <ul>Terms &amp; Conditions</ul>
                                </li>
                                <li>
                                    <ul>Refund Cat</ul>
                                </li>
                                <li>
                                    <ul>Disclaimer Cat</ul>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className=" col-12" style={{ fontSize: 14, color: "lightgrey" }}>
                        &copy; {new Date().getFullYear()} ©Johny Systems | All Cat`s Reserved
                        <i className="fa fa-facebook-official" aria-hidden="true" style={{ padding: 10, color: "white", float: "right" }}>
                            {" "}
                        </i>
                        <i className="fa fa-twitter-square" aria-hidden="true" style={{ padding: 10, color: "white", float: "right" }}></i>
                        <i className="fa fa-github-square" aria-hidden="true" style={{ padding: 10, color: "white", float: "right" }}></i>
                    </div>
                </div>
            </div>
        </footer>
    );
}
