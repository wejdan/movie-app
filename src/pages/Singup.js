import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import FormInput from "../components/UI/FormInput";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { requestOtp, signUp, signup, verifyOtp } from "../services/auth"; // Assuming you have a signup service
import { authenticate, setIsAdmin, setUserData } from "../store/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const [generatingOTP, setIsGeneratingOTP] = useState(false);
  const [verifyingOTP, setIsVerifyinggOTP] = useState(false);

  const [currentStep, setCurrentStep] = useState("requestOtp"); // 'requestOtp', 'verifyOtp', 'completeSignup'
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const isDisabled =
    loading ||
    Object.values(formData).some((value) => value.trim() === "") ||
    formData.password !== formData.confirmPassword;

  const onChange = (e) => {
    const { name, value } = e.target;
    // If the input field is 'email', convert its value to lowercase
    const updatedValue = name === "email" ? value.toLowerCase() : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
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
  const onRequestOtp = async (e) => {
    e.preventDefault();
    setIsGeneratingOTP(true);
    try {
      await requestOtp(formData.email);
      toast.success("OTP sent to your email.");
      setCurrentStep("verifyOtp");
    } catch (error) {
      toast.error(error.message || "Failed to send OTP.");
    } finally {
      setIsGeneratingOTP(false);
    }
  };
  const onVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await verifyOtp(formData.email, otp);
      toast.success("OTP verified.");
      setCurrentStep("completeSignup");
    } catch (error) {
      toast.error(error.message || "Failed to verify OTP.");
    } finally {
      setIsLoading(false);
    }
  };
  const requestOtpForm = (
    <form onSubmit={onRequestOtp}>
      <FormInput
        label="Email"
        type="email"
        name="email"
        placeholder="example@gmail.com"
        value={formData.email}
        onChange={onChange}
      />
      <Button
        variant="solid"
        className="w-full mt-3"
        isLoading={generatingOTP}
        isDisabled={formData.email.trim() === ""}
      >
        Request OTP
      </Button>
    </form>
  );
  const verifyOtpForm = (
    <form onSubmit={onVerifyOtp}>
      <FormInput
        label="OTP"
        type="text"
        name="otp"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button
        variant="solid"
        className="w-full mt-3"
        isLoading={loading || generatingOTP}
        isDisabled={otp.trim() === ""}
      >
        {generatingOTP ? "Requesting a new OTP" : " Verify OTP"}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto w-full max-w-md px-6">
      <Container>
        <h2 className="text-lg mb-3 font-bold text-center">Sign up</h2>
        {currentStep === "requestOtp" && requestOtpForm}
        {currentStep === "verifyOtp" && verifyOtpForm}
        {currentStep === "completeSignup" && (
          <form onSubmit={onSubmit}>
            <FormInput
              label="Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
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
            {/* Confirm Password input */}
            <FormInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={onChange} // Update to use the onChange handler
            />
            <Button
              variant="solid"
              className="w-full mt-3"
              isLoading={loading}
              isDisabled={isDisabled} // Button is disabled if passwords don't match or any field is empty
            >
              Sign up
            </Button>
          </form>
        )}
        {currentStep === "verifyOtp" ? (
          <Button onClick={onRequestOtp} variant={"link"}>
            Resend Token
          </Button>
        ) : (
          <div className="flex justify-between items-center mt-6">
            <NavLink
              to="/forgot-password"
              className="text-sm text-gray-700  dark:text-gray-400 hover:underline"
            >
              Forgot password?
            </NavLink>
            <NavLink
              to="/login"
              className="text-sm text-gray-700  dark:text-gray-400 hover:underline"
            >
              Sign in
            </NavLink>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Signup;
