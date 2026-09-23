import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useState } from "react";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Footer from "./components/Footer"
import Landingpage from "./pages/Landingpage";
import Createproduct from "./pages/Createproduct";
import Products from "./pages/Products";
import { AuthProvider } from "./contexts/AuthContext";
import VerifyEmailPage from "./pages/verifyEmail";
import Profile from "./pages/Profile";

const App = () => {
  const [dark, setDark] = useState(false);

  const theme = () => {
    setDark(!dark);

    document.body.style.backgroundColor = !dark
      ? "black"
      : "white";
  };

  return (
    <>
      <Router>
        <AuthProvider>
          <Nav dark={dark} theme={theme} />
          <Routes>
            <Route path="/" element={<Landingpage dark={dark} />} />
            <Route path="/about" element={<About />} />
            <Route path="/create-product" element={<Createproduct dark={dark} />} />
            <Route path="/products" element={<Products dark={dark} />} />
            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<VerifyEmailPage />} />
            <Route path="/verify/:email/:verificationToken" element={<VerifyEmailPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName="appToast"
            bodyClassName="appToastBody"
            progressClassName="appToastProgress"
          />

          <Footer/>
        </AuthProvider>

      </Router>
    </>
  );
};

export default App;
