import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import FormInput from "../components/UI/FormInput";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../services/auth";
import { authenticate, setIsAdmin, setUserData } from "../store/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const isDisabled =
    loading || Object.values(formData).some((value) => value.trim() === "");

  const onChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the right state based on input name
    }));
  };

  const onSubmit = async () => {
    setIsLoading(true);
    toast.dismiss(); // Dismiss any existing toasts before showing a new one
    try {
      const result = await login(formData.email, formData.password);

      const userInfo = {
        uid: result.user.id,
        token: result.token,
        // Assuming this field exists in your response
      };
      dispatch(authenticate({ user: userInfo }));
      dispatch(setUserData({ userData: result.user }));
      dispatch(setIsAdmin(result.user.isAdmin));
      // Redirect or show success message
    } catch (error) {
      toast.error(error.message); // Simplified toast error call
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto w-full max-w-md px-6">
      <Container>
        <h2 className="text-lg font-bold text-center">Sign In</h2>
        <form>
          <FormInput
            label="Email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={onChange}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={onChange}
          />
          <Button
            variant="solid"
            className="w-full mt-3"
            isLoading={loading}
            onClick={onSubmit}
            isDisabled={isDisabled}
          >
            Sign In
          </Button>
          <div className="flex justify-between items-center mt-6">
            <NavLink
              to="/forgot-password"
              className="text-sm text-gray-400 hover:underline"
            >
              Forgot password?
            </NavLink>
            <NavLink
              to="/singup"
              className="text-sm text-gray-400 hover:underline"
            >
              Sign Up
            </NavLink>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default LoginPage;
