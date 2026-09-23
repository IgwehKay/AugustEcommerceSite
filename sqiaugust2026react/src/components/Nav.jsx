import React from "react";

import { useNavigate, Link } from "react-router-dom";
import { Moon } from "lucide-react";

import AppButton from "./AppButton";
import { useAuth } from "../contexts/AuthContext";


const Nav = ({ dark, theme }) => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup")
  };

  const handleLogin = () => {
    navigate("/login")
  };


  return (
    <header style={{
      ...style.header,
      backgroundColor: dark ? "#222" : "#E8E8E8",
    }}>
      <nav style={{ width: "80%", margin: "auto", display: "flex", justifyContent: 'space-between', alignItems: 'center', padding: '15px 0 15px 0', gap: '1.5rem' }}>
        <div style={{ display: "flex", gap: "4em", alignItems: 'center' }}>

          <Link to={"/"} style={{ textDecoration: 'none', color: "#ff1491d0" }}>
            <h1>AugEcommerce</h1>
          </Link>


          <ul style={{ display: 'flex', gap: "2em", alignItems: 'center' }}>
            <li style={{ listStyle: "none" }}>
              <Link
                to="/about"
                style={{
                  textDecoration: 'none',
                  color: dark ? "white" : "#222",
                }}
              >About
              </Link>
            </li>

            <li style={{ listStyle: "none" }}>
              <Link
                to="/products"
                style={{
                  textDecoration: 'none',
                  color: dark ? "white" : "#222",
                }}
              >Products
              </Link>
            </li>

            <li style={{ listStyle: "none" }}>
              <Link
                to="/create-product"
                style={{
                  textDecoration: 'none',
                  color: dark ? "white" : "#222",
                }}
              >Create Product
              </Link>
            </li>

            <li style={{ listStyle: "none" }}>
              <Link
                to="/blog"
                style={{
                  textDecoration: 'none',
                  color: dark ? "white" : "#222",
                }}
              >Blog
              </Link>
            </li>
          </ul>
        </div>


        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "1.5rem" }}>
          <button
            onClick={theme}
            style={{
              cursor: "pointer",
              border: "none",
              background: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.4rem",
            }}
          >
            <Moon color={dark ? "#E8E8E8" : "#222"} />
          </button>
        </div>

        {/* <AppButton
          bgColor="#222"
          text="Login"
          textColor="#fff"
          handleClick={handleLogin}
          />

          <AppButton
          bgColor="#ff1491d0"
          text="Sign up"
          textColor="#fff"
          handleClick={handleSignUp}
          />
         */}


        {token && user ? (
          //shown when logged in
          <div style={style.profileGroup}>
            <Link
              to={"/profile"}
              style={{
                ...style.profileLink,
                color: dark ? "#E8E8E8" : "#222",
              }}
            >
              <span
                style={{
                  ...style.firstname,
                  color: dark ? "#E8E8E8" : "#222",
                }}
              >
                Welcome, {user.firstname}
              </span>

              {user.profile_image ? (
                <img src={user.profile_image} alt={user.firstname} style={style.avatarImage} />
              ) : (
                <div style={style.avatarFallback}>
                  {user.firstname?.charAt(0).toUpperCase()}
                </div>
              )}
            </Link>

            <AppButton
              text="Logout"
              bgColor="white"
              useBorder="5px"
              handleClick={logout}
            />
          </div>
        ) : (

          //shown when logged out
          <div style={{ display: "flex", gap: "1em" }}>
            <AppButton
              text="Login"
              // textColor="blue"
              bgColor="white"
              useBorder="5px"
              handleClick={handleLogin}

            />

            <AppButton
              text="Signup"
              bgColor="blue"
              textColor="white"
              useBorder="5px"
              handleClick={handleSignUp}

            />
          </div>
        )}

      </nav>
    </header>
  );
};


const style = {
  header: {
    backgroundColor: '#E8E8E8',
    boxShadow: '0px 2px 3px 3px grey'
  },
  button: {
    margin: "0 20px",
    width: "80px",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#111",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.3s ease"
  },

  buttonSignup: {
    background: "#ff1491d0",
    // margin: "0 20px",
    width: "80px",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    // background: "#111",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.3s ease"

  },
  profileGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    marginLeft: "auto",
  },
  profileLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    textDecoration: "none",
  },
  firstname: {
    fontSize: "0.95rem",
    fontWeight: 600,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  },
  avatarImage: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #fff",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
  },
  avatarFallback: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#ff1491d0",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "0.9rem",
  }
}

export default Nav;
