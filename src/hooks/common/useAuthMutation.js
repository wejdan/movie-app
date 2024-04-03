import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { logout } from "../../store/authSlice";
import { toast } from "react-hot-toast";
import { isTokenValid } from "../../utils/authUtils";
import { useModalWindow } from "../../components/UI/Modal";

export const useAuthMutation = (mutationFn, config) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { closeAllModals } = useModalWindow();
  const mutation = useMutation({
    mutationFn: (data) => {
      // Check if the token is valid before making the API call
      if (!isTokenValid(user.token)) {
        closeAllModals();
        dispatch(logout());
        navigate("/login");

        // Throw an error or return a promise rejection to halt the mutation
        return Promise.reject(new Error("Session expired"));
      }
      return mutationFn(user.token, data);
    },
    ...config,
    onError: (error) => {
      // Handle the error
      toast.dismiss(); // Dismiss any existing toast first

      if (error.status === 403 || error.status === 401) {
        toast.error("Session expired. Please log in again.", {
          duration: 5000,
          // isClosable is not a supported option in react-hot-toast
        });
        closeAllModals();
        dispatch(logout());
        navigate("/login");
      } else if (config.onError) {
        config.onError(error);
      }
    },
  });

  return mutation;
};
