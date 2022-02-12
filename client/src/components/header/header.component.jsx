import * as React from "react";
import './header.styles.css'
import {Link} from "react-router-dom";

const Header = () => (
    <div>
        <Link to="/" >
            home
        </Link>
        <Link to="/signin" >
            sign in
        </Link>
    </div>
);

export default Header;
