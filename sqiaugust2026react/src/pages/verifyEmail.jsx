import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const VerifyEmailPage = () => {
  const { email, verificationToken } = useParams();
  const { verifyEmail } = useAuth();

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const runVerification = async () => {
      if (!email || !verificationToken) {
        setStatus("error");
        setErrorMessage("Verification link is missing required information.");
        return;
      }

      try {
        await verifyEmail(email, verificationToken);
        setStatus("success");
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error?.response?.data?.message || "Email verification failed. Please try again.",
        );
      }
    };

    runVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, verificationToken]);

  return (
    <section style={styles.page}>
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <div style={styles.card}>
        {status === "verifying" && (
          <>
            <h1 style={styles.heading}>Verifying your email...</h1>
            <p style={styles.subText}>Please wait while we confirm your email address.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 style={styles.heading}>Email verified!</h1>
            <p style={styles.subText}>
              Your email has been verified successfully. You can now log in to your account.
            </p>
            <Link to="/login" style={styles.linkButton}>
              Go to Login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 style={styles.heading}>Verification failed</h1>
            <p style={styles.errorText}>{errorMessage}</p>
            <Link to="/signup" style={styles.linkButton}>
              Back to Signup
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px 16px",
    position: "relative",
    overflow: "hidden",
  },
  glowOne: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    filter: "blur(46px)",
    top: "-70px",
    left: "-80px",
  },
  glowTwo: {
    position: "absolute",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    filter: "blur(42px)",
    bottom: "-60px",
    right: "-80px",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    padding: "28px",
    borderRadius: "18px",
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    boxShadow: "0 20px 46px rgba(35, 23, 8, 0.15)",
    zIndex: 1,
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    color: "#1f1a17",
    margin: 0,
    letterSpacing: "0.2px",
  },
  subText: {
    marginTop: "10px",
    marginBottom: "18px",
    color: "#5b5046",
    fontSize: "14px",
  },
  errorText: {
    marginTop: "10px",
    marginBottom: "18px",
    color: "#c1361c",
    fontSize: "14px",
  },
  linkButton: {
    display: "inline-block",
    marginTop: "6px",
    border: "none",
    borderRadius: "12px",
    padding: "13px 20px",
    background: "crimson",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 600,
    textDecoration: "none",
  },
};

export default VerifyEmailPage;
