import {FC} from "react";
import classes from "./style.module.css";

import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar';
import MoviesList from '@/components/MoviesList';

const HomePage: FC = () => {


   return <div className={'container'}>
       <main className={classes.main}>
           <div className={classes.searchBarWrapper}>
               <SearchBar />
           </div>
           <div className={classes.contentWrapper}>
               <FilterBar />
               <MoviesList />
           </div>
       </main>
   </div>
};

export default HomePage;
