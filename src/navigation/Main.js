import React, { useEffect } from "react";
import PageLayout from "../components/UI/PageLayout";
import HomePage from "../pages/HomePage";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Home from "../pages/dashbord/Home";
import Actors from "../pages/dashbord/Actors";
import Movies from "../pages/dashbord/Movies";
import AdminRoute from "../components/routes/AdminRoute";
import PublicRoute from "../components/routes/PublicRoute";
import ProtectedRoute from "../components/routes/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import Singup from "../pages/Singup";
import MovieDetails from "../pages/MovieDetails";
import MovieReview from "../pages/MovieReview";
import MoviesCategory from "../pages/MoviesCategory";
import NotFoundPage from "../pages/NotFoundPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logout } from "../store/authSlice";
import Loader from "../components/UI/Loader";
import { isTokenValid } from "../utils/authUtils";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import UpdatePasswordPage from "../pages/UpdatePasswordPage";
import { useScrollToTop } from "../hooks/common/useScrollToTop";
function ScrollToTopWrapper({ children }) {
  useScrollToTop(); // Call the custom hook inside a child component of Router
  return <>{children}</>;
}
function Main() {
  const { isAuthenticating, userData } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const isDarkMode = useSelector((state) => state.appSettings.isDarkMode);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && isTokenValid(user.token)) {
      dispatch(fetchUserData(user.token));
    } else {
      dispatch(logout());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  if (isAuthenticating || (user && !userData)) {
    return (
      <div className=" flex flex-col  min-h-screen ">
        <Loader />
      </div>
    );
  }
  return (
    <Router>
      <ScrollToTopWrapper>
        <Routes>
          <Route index path="/" element={<HomePage />} />

          <Route element={<PageLayout />}>
            <Route path="/movie/:movieId" element={<MovieDetails />} />
            <Route path="/movie/review/:movieId" element={<MovieReview />} />
            <Route path="/category/:id" element={<MoviesCategory />} />
            <Route
              path="/update-password"
              sensitive={false}
              element={
                <ProtectedRoute>
                  <UpdatePasswordPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgetPasswordPage />
                </PublicRoute>
              }
            />
            <Route
              path="/reset/:token"
              element={
                <PublicRoute>
                  <ResetPasswordPage />
                </PublicRoute>
              }
            />
            <Route
              path="/singup"
              element={
                <PublicRoute>
                  <Singup />
                </PublicRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route
            element={
              <AdminRoute>
                <DashboardLayout />
              </AdminRoute>
            }
          >
            <Route element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Home />} />

            <Route path="/movies" element={<Movies />} />

            <Route path="/actors" element={<Actors />} />

            {/* Add other routes as needed */}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ScrollToTopWrapper>
    </Router>
  );
}

export default Main;
