/* eslint-disable jsx-a11y/accessible-emoji */
import React, {useState, useEffect} from "react";
import "../css/Header.css";
import {CSSTransition} from "react-transition-group";
import Logout from "../../User/js/Logout";
import {Link} from "react-router-dom";

export default function Header() {
    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const isLoggedIn = localStorage.getItem('token') !== null; // Проверяем, есть ли токен в localStorage

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    const handleMediaQueryChange = (mediaQuery) => {
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };


    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
    };

    return (
        <header className="Header">
            <img src="/logo512.png" alt="Logo" className="Logo"/>

            <CSSTransition
                in={!isSmallScreen || isNavVisible}
                timeout={350}
                classNames="NavAnimation"
                unmountOnExit
            >
                <nav className="Nav">
                    <Link to="/product/">Products</Link>
                    <a href="/orders/">Orders</a>
                    {isLoggedIn ? (
                        <Logout/>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </nav>
            </CSSTransition>
        </header>
    );
}
