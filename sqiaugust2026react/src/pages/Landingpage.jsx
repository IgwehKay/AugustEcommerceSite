import { useCart } from "./AddCart.jsx";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Landingpage = ({ dark }) => {
  const { addToCart } = useCart();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = Boolean(token && user);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate("/signup");
      return;
    }

    addToCart(product);
  };

  const products = [
    ["img-one.jpg", "Sun Block Forever Plus", "Provides effective sun protection while helping keep your skin shielded from harmful UV rays.", 29.99],
    ["img-two.jpg", "Elf", "High-quality beauty essentials designed to enhance your natural look with simple, effective products.", 28.99],
    ["img-three.jpg", "UV-Protector", "Helps protect your skin from harmful ultraviolet rays while keeping it looking healthy and radiant.", 27.99],
    ["img-four.jpg", "Secret", "A gentle personal-care essential designed to provide lasting freshness and confidence throughout the day.", 26.99],
    ["img-five.jpg", "Cinnabari Soap", "A refreshing cleansing soap that helps remove dirt and impurities while leaving the skin feeling clean and smooth.", 25.99],
    ["img-six.jpg", "Rosehip Oil", "A nourishing facial oil that helps moisturize the skin and supports a soft, smooth, radiant appearance.", 24.99],
  ];

  return (
    <>
    {/* <Nav/> */}
   <section>
    <h2 style={{
      width: "80%", 
      margin: "auto", 
      marginTop: "40px",
      color: dark ? "#ffffff" : "#222",
      opacity: 1,
      }}
      >Welcome to our products collection.
    </h2>
    
    <div className="landing-products" style={containerStyle.parentContainer}>
      {products.map(([image, title, description, price]) => {
        const product = { id: title, image: `./images/${image}`, title, description, price };
        return (
          <div style={containerStyle.productCards} className="product-box" key={product.id}>
            <img style={containerStyle.productCardImg} src={product.image} alt={product.title}/>
            <h3 style={{fontSize: "20px", margin: "20px 20px 10px", color: "#222"}} className="product-title">{product.title}</h3>
            <p style={containerStyle.p}>{product.description}</p>
            <span style={containerStyle.price} className="price">${product.price}</span>
            <div className="product-actions">
              <button style={containerStyle.button}>View Product</button>
              <button style={containerStyle.button2} className="add-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        );
      })}
    </div>

    
   </section>
    </>

  )
}


const containerStyle = {
  parentContainer: {
    width: '90%',
    // backgroundColor: 'blue',
    maxWidth: '1200px',
    margin: '50px auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px'
  },

  productCards: {
    background: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '12px',
    overflow: 'hidden',
    paddingBottom: '20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  
  productCardImg: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    display: 'block',
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
    margin: "0 20px",
    width: "calc(100% - 40px)",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#111",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.3s ease"
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
    transition: "background 0.3s ease"

}
// .product-card button:hover {
    // background: #333;
// }
}


export default Landingpage;