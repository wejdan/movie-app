import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/UI/Navbar";
import PageLayout from "./components/UI/PageLayout";
import Modal from "./components/UI/Modal";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Home from "./pages/dashbord/Home";
import Main from "./navigation/Main";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevents queries from refetching on window focus
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Modal>
        <Toaster />
        <Main />
      </Modal>
    </QueryClientProvider>
  );
}

export default App;
