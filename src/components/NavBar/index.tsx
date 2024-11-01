import {NavLink} from "react-router-dom";
import {Link} from "./../../types/Link";
import classes from "./style.module.css";

const Links: Link[] = [
    {
        text: "Home",
        to: '/'
    },
    {
        text: "Features",
        to: '/features'
    },
    {
        text: 'Auth',
        to: '/auth'
    }
];
function renderLinks(links: Link[]) {
    return links.map((link) => (
        <li className={classes.navLinksItem} key={link.to}>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? `${classes.navLink} ${classes.navLinkActive}`
                        : classes.navLink
                }
                to={link.to}
            >
                {link.text}
            </NavLink>
        </li>
    ));
}


const NavBar = () => {
    return (
        <nav className={classes.nav}>
            <ul className={classes.navLinks}>
                {renderLinks(Links)}
            </ul>
        </nav>
    )
}

export default NavBar;