import {FC} from "react";
import {Outlet} from "react-router-dom";

import classes from "./style.module.css";
import NavBar from "./../NavBar";



const Layout: FC = () => {
    return <>
        <div className={classes.headerWrapper}>
            <header className={classes.header}>
                <div className={'container'}>
                    <NavBar/>
                </div>
            </header>
        </div>
        <Outlet/>

    </>
}

export default Layout;