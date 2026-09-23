import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AppButton from "../components/AppButton";
import PasswordField from "../components/PasswordField";

const Login = () => {
  const { login, loading } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
    } catch {
      // Login feedback is handled inside AuthContext.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <div style={styles.card}>
        <div style={styles.eyebrow}>Welcome back</div>
        <h1 style={styles.heading}>Sign in to your account</h1>
        <p style={styles.subText}>Continue your product journey with us.</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={styles.form} noValidate>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                style={styles.input}
              />
              <ErrorMessage name="email" component="p" style={styles.errorText} />

              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <PasswordField
                id="password"
                name="password"
                placeholder="Enter your password"
                style={styles.input}
              />
              <ErrorMessage name="password" component="p" style={styles.errorText} />

              <AppButton
                text={isSubmitting || loading ? "Signing in..." : "Sign in"}
                textColor="#ffffff"
                bgColor="#ff1491d0"
                useBorder="12px"
                type="submit"
                disabled={isSubmitting || loading}
              />
            </Form>
          )}
        </Formik>

        <p style={styles.footerText}>
          New here?{" "}
          <Link to="/signup" style={styles.link}>
            Create an account
          </Link>
        </p>
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
    // background: "rgba(255, 20, 145, 0.16)",
    filter: "blur(46px)",
    top: "-70px",
    left: "-80px",
  },
  glowTwo: {
    position: "absolute",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    background: "rgba(76, 175, 160, 0.18)",
    filter: "blur(42px)",
    bottom: "-60px",
    right: "-80px",
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    padding: "32px",
    borderRadius: "18px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    boxShadow: "0 20px 46px rgba(35, 23, 8, 0.15)",
    zIndex: 1,
  },
  eyebrow: {
    color: "#c2185b",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  heading: {
    fontSize: "30px",
    color: "#1f1a17",
    margin: "8px 0 0",
  },
  subText: {
    marginTop: "8px",
    marginBottom: "18px",
    color: "#5b5046",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    marginTop: "8px",
    fontWeight: 600,
    color: "#2c2420",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d8cbc0",
    borderRadius: "10px",
    padding: "12px 13px",
    fontSize: "15px",
    backgroundColor: "#fffdf9",
    outline: "none",
  },
  errorText: {
    color: "#c1361c",
    minHeight: "18px",
    fontSize: "13px",
    margin: "2px 0 0",
  },
  footerText: {
    margin: "22px 0 0",
    textAlign: "center",
    color: "#5b5046",
    fontSize: "14px",
  },
  link: {
    color: "#c2185b",
    fontWeight: 700,
    textDecoration: "none",
  },
};

export default Login;