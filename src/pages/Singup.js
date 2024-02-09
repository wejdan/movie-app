import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import FormInput from "../components/UI/FormInput";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { signUp, signup } from "../services/auth"; // Assuming you have a signup service
import { authenticate, setIsAdmin, setUserData } from "../store/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const isDisabled =
    loading || Object.values(formData).some((value) => value.trim() === "");

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    setIsLoading(true);
    toast.dismiss(); // Dismiss any existing toasts before showing a new one
    try {
      // Assuming your signup function needs a name, email, and password
      const result = await signUp(
        formData.email,
        formData.password,
        formData.name
      );

      // You might need to adjust these lines depending on how your signup function works and what it returns
      const userInfo = { uid: result.user.id, token: result.token };
      dispatch(authenticate({ user: userInfo }));
      dispatch(setUserData({ userData: result.user }));
      dispatch(setIsAdmin(result.user.isAdmin));

      toast.success("Signup successful!"); // Display success message
      // Redirect to dashboard or another page
    } catch (error) {
      toast.error(error.message || "Signup failed."); // Display error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto w-full max-w-md px-6">
      <Container>
        <h2 className="text-lg mb-3 font-bold text-center">Sign up</h2>
        <form>
          <FormInput
            label="Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={onChange}
          />
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
            onClick={onSubmit}
            variant="solid"
            className="w-full mt-3"
            isLoading={loading}
            isDisabled={isDisabled}
          >
            Sign up{" "}
          </Button>
          <div className="flex justify-between items-center mt-6">
            <NavLink
              to="/forgot-password"
              className="text-sm text-gray-400 hover:underline"
            >
              Forgot password?
            </NavLink>
            <NavLink
              to="/login"
              className="text-sm text-gray-400 hover:underline"
            >
              Sign in
            </NavLink>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default Signup;
