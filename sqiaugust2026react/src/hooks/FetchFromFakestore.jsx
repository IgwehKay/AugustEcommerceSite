import { useState, useEffect } from "react";

const Fetch = ({ dark }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json()

          .then((products) => {
            console.log(products)
            setProducts(products);
            setLoading(false);
          });
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ ...style.page, backgroundColor: dark ? "#111" : "#fff", color: dark ? "#f5f5f5" : "#171717" }}>
      <h1 style={style.heading}>All products collection</h1>
      {loading && <p style={style.message}>Loading products...</p>}
      {error && <p style={{ ...style.message, color: "#c62828" }}>{error}</p>}
      <div style={style.container}>
        {products.map((product) => (
          <div
            style={{
              ...style.cards,
              backgroundColor: dark ? "#222" : "#fff",
              border: dark ? "1px solid #555" : "1px solid #222",
              color: dark ? "#f5f5f5" : "#171717",
            }}
            key={product.id}
          >
            <img style={{ width: "250px" }} src={product.image} alt={product.title} />

            <h2>{product.title}</h2>

            <p>{product.description}</p>

            <p>Category: {product.category}</p>

            <p>Price: ${product.price}</p>

            <p>Rating: {product.rating.rate}</p>

            <p>Reviews: {product.rating.count}</p>
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
    padding: "40px 0 0 8%",
  },
  message: {
    width: "85%",
    margin: "24px auto 0",
  },
  container: {
    width: "85%",
    margin: "auto",
    padding: "20px",
    // marginTop: "60px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2em"
  },
  cards: {
    width: "400px",
    padding: "1rem",
    transition: "background-color 0.3s ease, color 0.3s ease",
  }
}


export default Fetch;
