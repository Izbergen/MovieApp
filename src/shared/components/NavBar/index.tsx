import {NavLink} from "react-router-dom";
import {ILink} from "../../types/ILink.ts";
import classes from "./style.module.css";

const Links: ILink[] = [
    {
        text: "Home",
        to: '/'
    },
    {
        text: "Favorites",
        to: '/favorites',
    },
    {
        text: 'Auth',
        to: '/auth'
    }
];
function renderLinks(links: ILink[]) {
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