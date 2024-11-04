import {FC} from "react";
import classes from "./style.module.css";
import MoviesCatalog from "@/modules/MoviesCatalog";


const HomePage: FC = () => {


   return <div className={'container'}>
       <main className={classes.main}>
           <MoviesCatalog />
       </main>
   </div>
};

export default HomePage;
