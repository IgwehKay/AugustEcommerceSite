import { useState, useEffect } from "react";
import { useCart } from "../pages/AddCart.jsx";

const Fetch = ({ dark }) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

    fetch(`${apiUrl}/product/getallproduct`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          const message = data?.message || "Failed to fetch products";
          throw new Error(message);
        }

        const productList = data?.data?.products || data?.products || [];
        setProducts(productList);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <main
      style={{
        ...style.page,
        backgroundColor: dark ? "#111" : "#fff",
        color: dark ? "#f5f5f5" : "#171717",
      }}
    >
      <h1 style={style.heading}>All products collection</h1>

      {loading && <p style={style.message}>Loading products...</p>}
      {error && <p style={{ ...style.message, color: "#c62828" }}>{error}</p>}

      <div className="products-grid" style={style.container}>
        {products.map((product) => (
          <div className='product-box'
            key={product._id || product.id}
            style={{
              ...style.productCards,
              backgroundColor: dark ? "#222" : "#fff",
              border: dark ? "1px solid #555" : "1px solid #e5e5e5",
              color: dark ? "#f5f5f5" : "#171717",
            }}
          >
            <img
              style={style.productCardImg}
              src={product.product_image}
              alt={product.title}
            />

            <h3 style={{ ...style.productTitle, color: dark ? "#fff" : "#222" }} className="product-title">
              {product.title}
            </h3>

            <p style={style.p}>{product.description}</p>
            <span className="price" style={style.price}>${product.price}</span>

            <div className="product-actions">
              <button
                style={style.actionButton}
                onClick={() => console.log("View product", product._id || product.id)}
              >
                View Product
              </button>

              <button
                className="add-cart"
                style={style.actionButton2}
                onClick={() => addToCart({
                  id: product._id || product.id,
                  image: product.product_image,
                  title: product.title,
                  description: product.description,
                  price: Number(product.price),
                })}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

const style = {
  page: {
    minHeight: "calc(100vh - 150px)",
    paddingBottom: "60px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  heading: {
    padding: "40px 10px 0 10px",
    width: "80%",
    margin: "auto"
  },
  message: {
    width: "85%",
    margin: "24px auto 0",
  },
  container: {
    width: "90%",
    maxWidth: "1200px",
    margin: "50px auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(250px, 1fr))",
    gap: "30px",
    boxSizing: "border-box",
  },
  productCards: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    paddingBottom: "20px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  productCardImg: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
  },
  productTitle: {
    fontSize: "20px",
    margin: "20px 20px 10px",
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
  actionButton: {
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#111",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    margin: "0 20px",
    width: "calc(100% - 40px)",
  },

  actionButton2: {
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#ff1491d0",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    margin: "0 20px",
    width: "calc(100% - 40px)",
  },
};

export default Fetch;
