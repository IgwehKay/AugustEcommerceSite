import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { Moon, ShoppingCart } from "lucide-react";

import AppButton from "./AppButton";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../pages/AddCart.jsx";


const Nav = ({ dark, theme }) => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const { items, itemCount, cartTotal, removeFromCart, changeQuantity, clearCart } = useCart();
  const isAuthenticated = Boolean(token && user);

  const handleSignUp = () => {
    navigate("/signup")
  };

  const handleLogin = () => {
    navigate("/login")
  };


  return (
    <>
      <header style={{
        ...style.header,
        backgroundColor: dark ? "#222" : "#E8E8E8",
        "--nav-bg": dark ? "#222" : "#E8E8E8",
      }}>
        <nav className="site-nav" style={{ width: "80%", margin: "auto", display: "flex", justifyContent: 'space-between', alignItems: 'center', padding: '15px 0 15px 0', gap: '1.5rem' }}>
        <div className="nav-brand-group" style={{ display: "flex", gap: "4em", alignItems: 'center' }}>

          <Link to={"/"} style={{ textDecoration: 'none', color: "#ff1491d0" }}>
            <h1>AugEcommerce</h1>
          </Link>

          <ul className={`nav-links${menuOpen ? " menu-open" : ""}`} style={{ display: 'flex', gap: "2em", alignItems: 'center' }}>
            <li style={{ listStyle: "none" }}>
              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: dark ? "white" : "#222",
                }}
              >Products
              </Link>
            </li>

            {isAuthenticated && (
              <>
                <li style={{ listStyle: "none" }}>
                  <Link
                    to="/create-product"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      color: dark ? "white" : "#222",
                    }}
                  >
                    Add Product
                  </Link>
                </li>

                <li style={{ listStyle: "none" }}>
                  <Link
                    to="/Orders"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      color: dark ? "white" : "#222",
                    }}
                  >
                    Orders
                  </Link>
                </li>
              </>
            )}

            <li style={{ listStyle: "none" }}>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: dark ? "white" : "#222",
                }}
              >About
              </Link>
            </li>


            {isAuthenticated && (
              <li className="mobile-menu-logout" style={{ listStyle: "none" }}>
                <AppButton
                  text="Logout"
                  bgColor="white"
                  useBorder="5px"
                  handleClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                />
              </li>
            )}

            {!isAuthenticated ? (
              <>
                <li className="mobile-menu-auth" style={{ listStyle: "none" }}>
                  <AppButton
                    text="Login"
                    bgColor="white"
                    useBorder="5px"
                    handleClick={() => {
                      setMenuOpen(false);
                      handleLogin();
                    }}
                  />
                </li>
                <li className="mobile-menu-auth" style={{ listStyle: "none" }}>
                  <AppButton
                    text="Signup"
                    bgColor="blue"
                    textColor="white"
                    useBorder="5px"
                    handleClick={() => {
                      setMenuOpen(false);
                      handleSignUp();
                    }}
                  />
                </li>
              </>
            ) : null}
          </ul>
        </div>



        <div className="nav-controls" style={{ display: "flex", gap: "2rem", alignItems: "center", justifyContent: "center", marginLeft: "1.5rem" }}>
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

          {token && user && (
            <button
              id="cart-icon"
              type="button"
              aria-label="Open shopping cart"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart
                style={{
                  background: "none",
                  border: "none",
                  color: dark ? "#E8E8E8" : "#222",
                }}
              />
              <span
                className="cart-item-count"
                style={{ visibility: itemCount > 0 ? "visible" : "hidden" }}
              >
                {itemCount}
              </span>
            </button>
          )}
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


        {isAuthenticated ? (
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
              className="desktop-logout"
              text="Logout"
              bgColor="white"
              useBorder="5px"
              handleClick={logout}
            />
          </div>
        ) : (

          //shown when logged out
          <div className="auth-actions" style={{ display: "flex", gap: "1em" }}>
            <AppButton
              text="Login"
              // textColor="blue"
              bgColor="white"
              useBorder="5px"
              handleClick={handleLogin}

            />

            <AppButton
              text="Signup"
              bgColor="#ff1491d0"
              textColor="white"
              useBorder="5px"
              handleClick={handleSignUp}

            />
          </div>
        )}

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        </nav>
      </header>

      <div className={`cart${cartOpen ? " active" : ""}`}>
        <h2 className="cart-title">Your Cart</h2>
        <div className="cart-content">
          {items.length === 0 ? (
            <p>{purchaseMessage || "Your cart is empty."}</p>
          ) : items.map((item) => (
            <div className="cart-box" key={item.id}>
              <img src={item.image} alt={item.title} className="cart-img" />
              <div className="cart-detail">
                <h2 className="cart-product-title">{item.title}</h2>
                <span className="cart-price">${item.price.toFixed(2)}</span>
                <div className="cart-quantity">
                  <button type="button" onClick={() => changeQuantity(item.id, -1)}>-</button>
                  <span className="number">{item.quantity}</span>
                  <button type="button" onClick={() => changeQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              <button type="button" className="cart-remove" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.title}`}>
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="total">
            <div className="total-title">Total</div>
            <div className="total-price">${cartTotal.toFixed(2)}</div>
        </div>
        <button
          className="btn-buy"
          type="button"
          onClick={() => {
            if (items.length > 0) {
              clearCart();
              setPurchaseMessage("Thank you for your purchase");
            }
          }}
          disabled={!items.length}
        >
          Buy Now
        </button>
        <button
          className="cart-close"
          id="cart-close"
          type="button"
          aria-label="Close shopping cart"
          onClick={() => setCartOpen(false)}
        >
          ×
        </button>
      </div>
    </>

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
  },
}



export default Nav;
