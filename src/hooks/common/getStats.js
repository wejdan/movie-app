import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  fetchTotalMovies,
  fetchTotalReviews,
  fetchTotalUsers,
  fetchRecentUploads,
  fetchHighestRatedMovies,
} from "../../services/stats"; // Adjust import paths as necessary
import { useDispatch, useSelector } from "react-redux";
import { isTokenValid } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

const useStats = () => {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalReviews: 0,
    totalUsers: 0,
    recentUploads: [],
    mostRatedMovies: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; // Flag to manage cleanup

    // Check token validity inside useEffect
    if (!isTokenValid(user?.token)) {
      dispatch(logout());
      navigate("/login");
      return; // Exit the effect if not authenticated
    }

    const fetchData = async () => {
      try {
        const results = await Promise.all([
          fetchTotalMovies(user.token),
          fetchTotalReviews(user.token),
          fetchTotalUsers(user.token),
          fetchRecentUploads(user.token),
          fetchHighestRatedMovies(user.token),
        ]);

        if (isMounted) {
          // Assuming each fetch function returns an object with a key matching the stat name
          setStats({
            totalMovies: results[0].totalMovies,
            totalReviews: results[1].totalReviews,
            totalUsers: results[2].totalUsers,
            recentUploads: results[3],
            mostRatedMovies: results[4],
          });
        }
      } catch (error) {
        toast.dismiss(); // Dismiss any existing toast first
        if (error.status === 401 || error.status === 403) {
          // Handle 401 Unauthorized errors by logging out and redirecting to login page
          toast.error(error.message);
          dispatch(logout());
          navigate("/login");
        } else {
          // Handle other errors normally
          toast.error(`Failed to fetch stats: ${error.message}`);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    }; // Cleanup function to set isMounted to false
  }, [user.token, dispatch, navigate]);

  return [stats, loading];
};

export default useStats;
