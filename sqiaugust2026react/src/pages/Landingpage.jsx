import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "./AddCart.jsx";

const Landingpage = ({ dark }) => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = Boolean(token && user);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`${apiUrl}/product/getallproducts`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch products");
      }

      setProducts(data?.data?.products || data?.products || []);
    };

    getProducts().catch((error) => {
      console.error(error);
    });
  }, [apiUrl]);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    addToCart({
      id: product._id || product.id,
      image: product.product_image || product.image,
      title: product.title,
      description: product.description,
      price: Number(product.price),
    });
  };

  return (
    <section
      style={{
        ...containerStyle.section,
        backgroundColor: dark ? "#111" : "#fff",
        color: dark ? "#fff" : "#222",
      }}
    >
      <h2 style={{ ...containerStyle.h2, color: dark ? "#fff" : "#222" }}>
        Welcome to our products collection.
      </h2>

      <div style={containerStyle.parentContainer} className="landing-products">
          {products.map((product) => (
            <div
              style={containerStyle.productCards}
              key={product._id || product.id}
              className="product-box"
            >
              <img
                className="product-card-image"
                style={containerStyle.productCardImg}
                src={product.product_image || product.image}
                alt={product.title}
              />
              <h3 style={containerStyle.h3}>{product.title}</h3>
              <p style={containerStyle.p}>{product.description.slice(0,100)}...</p>
              <p style={containerStyle.price}>${product.price}</p>
              <button
                type="button"
                style={containerStyle.button}
                onClick={() => navigate(`/product/${product._id || product.id}`)}
              >
                View Product
              </button>
              <button
                type="button"
                style={containerStyle.button2}
                className="add-cart"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </section>
  );
};

const containerStyle = {
  section: {
    minHeight: "calc(100vh - 150px)",
    paddingBottom: "60px",
  },
  parentContainer: {
    width: "90%",
    maxWidth: "1200px",
    margin: "50px auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
  },
  productCards: {
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    overflow: "hidden",
    paddingBottom: "20px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
  },
  productCardImg: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
  },
  p: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#666",
    margin: "0 20px 15px",
  },
  price: {
    display: "block",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#111",
    margin: "0 20px 18px",
  },
  button: {
    margin: "0 20px 20px",
    width: "calc(100% - 40px)",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#111",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
  },
  button2: {
    margin: "0 20px",
    width: "calc(100% - 40px)",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#ff1491d0",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
  },
  h2: {
    padding: "40px 10px 0",
    width: "80%",
    margin: "auto",
  },
  h3: {
    marginLeft: "18px",
  },
};

export default Landingpage;
