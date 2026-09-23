// import { useState, useEffect } from "react";

// const Fetch = ({ dark }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

//     fetch(`${apiUrl}/product/getallproduct`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(async (response) => {
//         const data = await response.json().catch(() => null);

//         if (!response.ok) {
//           const message = data?.message || "Failed to fetch products";
//           throw new Error(message);
//         }

//         const productList = data?.data?.products || data?.products || [];
//         setProducts(productList);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <main style={{ ...style.page, backgroundColor: dark ? "#111" : "#fff", color: dark ? "#f5f5f5" : "#171717" }}>
//       <h1 style={style.heading}>All products collection</h1>
//       {loading && <p style={style.message}>Loading products...</p>}
//       {error && <p style={{ ...style.message, color: "#c62828" }}>{error}</p>}
//       <div style={style.container}>
//         {products.map((product) => (
//           <div
//             style={{
//               ...style.cards,
//               backgroundColor: dark ? "#222" : "#fff",
//               border: dark ? "1px solid #555" : "1px solid #222",
//               color: dark ? "#f5f5f5" : "#171717",
//             }}
//             key={product.id}
//           >
//             <img style={{ width: "250px" }} src={product.product_image} alt={product.title} />

//             <h2>{product.title}</h2>

//             <p>{product.description}</p>

//             {/* <p>Category: {product.category}</p> */}

//             <p>Price: ${product.price}</p>

//             {/* <p>Rating: {product.rating.rate}</p> */}

//             {/* <p>Reviews: {product.rating.count}</p> */}
//           </div>
//         ))}
//       </div>
//     </main>


//   );
// };


// const style = {
//   page: {
//     minHeight: "calc(100vh - 150px)",
//     paddingBottom: "60px",
//     transition: "background-color 0.3s ease, color 0.3s ease",
//   },
//   heading: {
//     padding: "40px 0 0 8%",
//   },
//   message: {
//     width: "85%",
//     margin: "24px auto 0",
//   },
//   container: {
//     width: "90%",
//     // maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "30px 20px",
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     justifyItems: "center",
//     columnGap: "2rem",
//     rowGap: "2rem",
//     boxSizing: "border-box",
//     // border: "1px solid black"
//   },
//   cards: {
//     width: "100%",
//     maxWidth: "290px",
//     padding: "1rem",
//     boxSizing: "border-box",
//     transition: "background-color 0.3s ease, color 0.3s ease",
//   }
// }


import { useState, useEffect } from "react";
import AppButton from "../components/AppButton";

const Fetch = ({ dark }) => {
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

      <div style={style.container}>
        {products.map((product) => (
          <div
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

            <h3 style={{ ...style.productTitle, color: dark ? "#fff" : "#222" }}>
              {product.title}
            </h3>

            <p style={style.p}>{product.description}</p>
            <span style={style.price}>${product.price}</span>

            <button
              style={style.actionButton}
              onClick={() => console.log("View product", product._id || product.id)}
            >
              View Product
            </button>

            <div style={{ height: "12px" }} />

            <button
              style={style.actionButton}
              onClick={() => console.log("Add to cart", product._id || product.id)}
            >
              Add to Cart
            </button>
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
    width: "100%",
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
};

export default Fetch;


