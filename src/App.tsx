import { Route, Routes } from "react-router-dom";
import Layout from "@/shared/components/Layout";
import HomePage from "./pages/Home";
import FavoritesPage from "./pages/Favorites";
import MovieDetailPage from "./pages/Movie";
import AuthPage from "./pages/AuthPage";

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path={'auth'} element={<AuthPage />} />
                    <Route path={'favorites'} element={<FavoritesPage />} />
                    <Route path={'movie/:id'} element={<MovieDetailPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
