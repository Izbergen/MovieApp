import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import FeaturesPage from "./pages/Features";
import MovieDetailPage from "./pages/Movie";
import PrivateRoute from "./components/PrivateRoute";
import AuthPage from "./pages/AuthPage"; // Импортируйте ваш PrivateRoute

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path={'auth'} element={<AuthPage />} />
                    <Route path={'features'} element={
                        <PrivateRoute>
                            <FeaturesPage />
                        </PrivateRoute>
                    } />
                    <Route path={'/movie/:id'} element={<MovieDetailPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
