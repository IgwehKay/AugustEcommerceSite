import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "./AddCart.jsx";

const ProductDetails = ({ dark }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { addToCart } = useCart();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !user) {
      navigate("/login", { replace: true });
      return;
    }

    const getProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch product details");
        }

        setProduct(data?.data?.product || data?.product || null);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [apiUrl, id, navigate, token, user]);

  const handleAddToCart = () => {
    addToCart({
      id: product._id || product.id,
      image: product.product_image || product.image,
      title: product.title,
      description: product.description,
      price: Number(product.price),
    });
  };

  if (loading) {
    return <main style={styles.page}>Loading product details...</main>;
  }

  if (error || !product) {
    return (
      <main style={styles.page}>
        <p style={styles.error}>{error || "Product not found."}</p>
        <button type="button" style={styles.button} onClick={() => navigate(-1)}>
          Back to products
        </button>
      </main>
    );
  }

  return (
    <main
      style={{
        ...styles.page,
        backgroundColor: dark ? "#111" : "#fff",
        color: dark ? "#fff" : "#222",
      }}
    >
      <button type="button" style={styles.backButton} onClick={() => navigate(-1)}>
        Back to products
      </button>
      <article style={styles.content}>
        <img
          style={styles.image}
          src={product.product_image || product.image}
          alt={product.title}
        />
        <div>
          <h1>{product.title}</h1>
          <p style={styles.description}>
            {product.description || "No description available."}
          </p>
          <p style={styles.price}>${Number(product.price).toFixed(2)}</p>
          <button type="button" style={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </article>
    </main>
  );
};

const styles = {
  page: {
    minHeight: "calc(100vh - 150px)",
    padding: "40px 5% 80px",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "minmax(280px, 1fr) minmax(280px, 1fr)",
    gap: "40px",
    maxWidth: "1000px",
    margin: "24px auto",
    alignItems: "start",
  },
  image: {
    width: "100%",
    maxHeight: "500px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  description: {
    lineHeight: "1.8",
    whiteSpace: "pre-wrap",
    color: "#666",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "20px"
  },
  button: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#ff1491d0",
    color: "#fff",
    cursor: "pointer",
    marginTop: "20px",
  },
  backButton: {
    margin: "10px 130px 0 20px",
    width: "max-content",
    padding: "10px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#fff",
    border: "2px solid #ff1491d0",
    color: "black",
    fontSize: "15px",
    cursor: "pointer",
  },
  error: {
    color: "#c62828",
  },
};

export default ProductDetails;
