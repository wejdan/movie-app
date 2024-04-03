import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { isTokenValid } from "../../utils/authUtils";

export const useAuthQuery = (queryKey, queryFn, config = {}, ...args) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Determine if the query should be enabled based on the existence of a user and a valid token
  const isQueryEnabled = user !== null && isTokenValid(user.token);

  const query = useQuery({
    queryKey: [...queryKey, user?.uid], // Ensure `user?.uid` is used safely with optional chaining
    queryFn: async () => {
      // Now that the query is conditionally enabled, no need to check token validity here as it's handled by `isQueryEnabled`
      return queryFn(user.token, ...args);
    },
    ...config,
    enabled: isQueryEnabled, // Only enable the query if there's a logged-in user with a valid token
  });
  return query;
};
