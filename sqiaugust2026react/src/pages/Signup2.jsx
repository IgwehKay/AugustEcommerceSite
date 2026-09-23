import React, { useState } from 'react'

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {

    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);


    const userDetails = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password
    };

    try {

      const response = await fetch(
        "http://localhost:8000/api/v1/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(userDetails)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Signup failed:", data);
          setErrorMessage(data.message || "Signup failed.");

        return;
      }

      console.log("Signup successful:", data);

      setSuccessMessage("You have successfully created an account!");


    } catch (error) {

      console.log("Error connecting to backend:", error);

      setErrorMessage("Unable to connect to the server.");


    } finally {
      setLoading(false);
    }
  };
  return (

    <div style={style.parentDiv}>

      <h1>Signup Page</h1>
      <br />

      {successMessage && (
        <p style={style.successMessage}>
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p style={style.errorMessage}>
          {errorMessage}
        </p>
      )}


      <form onSubmit={handleSignup}>
        <label htmlFor="firstName">First Name</label> &nbsp;

        <input
          type="text"
          style={style.input}
          id="firstName"
          name="firstName"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required >
        </input>

        <br />
        <br />

        <label htmlFor="lastName">Last Name</label> &nbsp;
        <input
          type="text"
          style={style.input}
          id="lastName"
          name="lastName"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}

          required >
        </input>

        <br />
        <br />

        <label htmlFor="email">Email</label> &nbsp;
        <input
          type="email"
          style={style.inputEmail}
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}

          required >
        </input>

        <br />
        <br />

        <label htmlFor="password">Password</label> &nbsp;
        <input
          type="password"
          style={style.input}
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}

          required >
        </input>

        <br />
        <br />

        <button style={style.button} type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Submit"}
        </button>
      </form>

    </div>

  );
};

const style = {
  parentDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px",
    paddingBottom: "40px",
    lineHeight: "1.6",
    margin: "auto",
    marginTop: "60px",
    width: "60%",
    border: "none",
    backgroundColor: "#e8c7c7",
    fontSize: "16px",
  },

  input: {
    padding: "10px",
    width: "300px",
  },

  inputEmail: {
    marginLeft: "28px",
    padding: "10px",
    width: "300px",
  },

  button: {
    margin: "20px 0 0 0",
    width: "370px",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#111",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.3s ease"
  },

  successMessage: {
    padding: "12px",
    marginBottom: "20px",
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
    borderRadius: "6px",
  },

  errorMessage: {
    padding: "12px",
    marginBottom: "20px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
    borderRadius: "6px",
  },
}

export default Signup