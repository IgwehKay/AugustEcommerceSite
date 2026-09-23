import React from "react";

import { useNavigate, Link } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();

    return (
        <footer style={style.footer}>
            <div style={style.footerMainContainer}>
                <div style={style.footerContainer}>
                    <h2 style={{ marginBottom: "15px" }}>August Ecommerce</h2>
                    <p style={{ lineHeight: "1.6", color: "#ccc" }}>Your trusted destination for quality beauty and skincare products.</p>
                </div>

                <div style={style.footerContainer}>
                    <h4 style={{ marginBottom: "15px" }}>Contact Us</h4>
                    <p style={{ lineHeight: "1.6", color: "#ccc" }}>Email: info@beautystore.com</p>
                    <p style={{ lineHeight: "1.6", color: "#ccc" }}>Phone: +234 800 000 0000</p>
                </div>

                <div>
                    <h4 style={{ marginBottom: "15px" }}>
                        Business Hours
                    </h4>

                    <p style={{ color: "#ccc" }}>
                        Monday - Friday: 9:00 AM - 6:00 PM
                    </p>

                    <p style={{ color: "#ccc" }}>
                        Saturday: 10:00 AM - 4:00 PM
                    </p>

                    <p style={{ color: "#ccc" }}>
                        Sunday: Closed
                    </p>
                </div>
            </div>

            <div style={{textAlign: "center", padding: "15px"}}>
                    <p>
                        © 2026 August Ecommerce. All rights reserved.
                    </p>

                </div>
        </footer>
    );
};

const style = {
    footer: {
        backgroundColor: "#222",
        color: "white",
        marginTop: "50px",
        // display: "flex",
        // margin: "auto",
        // gap: "2em"
    },

    footerMainContainer: {
        display: "flex",
        width: "80%",
        margin: "auto",
        padding: "20px 0 10px 0",
        alignItems: "center",
        justifyContent: "space-evenly",
        // border: "1px solid white",
        gap: "7em"
    },

    footerContainer: {
        maxWidth: "1200px",
        // margin: "0 auto",
        // padding: "40px 30px",
        // display: "grid",
        // gridTemplateColumns: "2fr 1fr 1fr",
        // gap: "40px"
    }
}

export default Footer;