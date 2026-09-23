import React from 'react'
import Nav from '../components/Nav';

const Landingpage = ({ dark }) => {
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
    
    <div style={containerStyle.parentContainer}>
      <div style={containerStyle.productCards}>
        <img style={containerStyle.productCardImg} src="./images/img-one.jpg" alt="Product 1"/>
        <h3 style={{fontSize: "20px", margin: "20px 20px 10px", color: "#222"}}>Sun Block Forever Plus</h3>
        <p style={containerStyle.p}>Provides effective sun protection while helping keep your skin shielded from harmful UV rays.</p>
        <span style={containerStyle.price}>$29.99</span>
        <br />
        <button style={containerStyle.button}>View Product</button>
        <br />
        <br />
        <button style={containerStyle.button}>Add to Cart</button>
      </div>

      <div style={containerStyle.productCards}>
        <img style={containerStyle.productCardImg} src="./images/img-two.jpg" alt="Product 1"/>
        <h3 style={{fontSize: "20px", margin: "20px 20px 10px", color: "#222"}}>Elf</h3>
        <p style={containerStyle.p}>High-quality beauty essentials designed to enhance your natural look with simple, effective products.</p>
        <span style={containerStyle.price}>$28.99</span>
        <br />
        <button style={containerStyle.button}>View Product</button>
        <br />
        <br />
        <button style={containerStyle.button}>Add to Cart</button>
      </div>

      <div style={containerStyle.productCards}>
        <img style={containerStyle.productCardImg} src="./images/img-three.jpg" alt="Product 1"/>
        <h3 style={{fontSize: "20px", margin: "20px 20px 10px", color: "#222"}}>UV-Protector</h3>
        <p style={containerStyle.p}>Helps protect your skin from harmful ultraviolet rays while keeping it looking healthy and radiant.</p>
        <span style={containerStyle.price}>$27.99</span>
        <br />
        <button style={containerStyle.button}>View Product</button>
        <br />
        <br />
        <button style={containerStyle.button}>Add to Cart</button>
      </div>

      <div style={containerStyle.productCards}>
        <img style={containerStyle.productCardImg} src="./images/img-four.jpg" alt="Product 1"/>
        <h3 style={{fontSize: "20px", margin: "20px 20px 10px", color: "#222"}}>Secret</h3>
        <p style={containerStyle.p}>A gentle personal-care essential designed to provide lasting freshness and confidence throughout the day.</p>
        <span style={containerStyle.price}>$26.99</span>
        <br />
        <button style={containerStyle.button}>View Product</button>
        <br />
        <br />
        <button style={containerStyle.button}>Add to Cart</button>
      </div>

      <div style={containerStyle.productCards}>
        <img style={containerStyle.productCardImg} src="./images/img-five.jpg" alt="Product 1"/>
        <h3 style={{fontSize: "20px", margin: "20px 20px 10px", color: "#222"}}>Cinnabari Soap</h3>
        <p style={containerStyle.p}>A refreshing cleansing soap that helps remove dirt and impurities while leaving the skin feeling clean and smooth.</p>
        <span style={containerStyle.price}>$25.99</span>
        <br />
        <button style={containerStyle.button}>View Product</button>
        <br />
        <br />
        <button style={containerStyle.button}>Add to Cart</button>
      </div>

      <div style={containerStyle.productCards}>
        <img style={containerStyle.productCardImg} src="./images/img-six.jpg" alt="Product 1"/>
        <h3 style={{fontSize: "20px", margin: "20px 20px 10px", color: "#222"}}>Rosehip Oil</h3>
        <p style={containerStyle.p}>A nourishing facial oil that helps moisturize the skin and supports a soft, smooth, radiant appearance.</p>
        <span style={containerStyle.price}>$24.99</span>
        <br />
        <button style={containerStyle.button}>View Product</button>
        <br />
        <br />
        <button style={containerStyle.button}>Add to Cart</button>
      </div>
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
}
// .product-card button:hover {
    // background: #333;
// }
}


export default Landingpage;