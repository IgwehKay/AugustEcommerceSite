import { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import PasswordField from "../components/PasswordField";

const Profile = () => {
  const { user, loading, updateProfile, updateProfilePicture, updatePassword } = useAuth();
  const fileInputRef = useRef(null);

  const profileInitialValues = {
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    bio: user?.bio || "",
  };

  const profileValidationSchema = Yup.object({
    firstname: Yup.string().trim().required("First name is required"),
    lastname: Yup.string().trim().required("Last name is required"),
    bio: Yup.string().trim(),
  });

  const passwordInitialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const passwordValidationSchema = Yup.object({
    oldPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required")
      .notOneOf([Yup.ref("oldPassword")], "New password cannot be same as old password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Please confirm your new password"),
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await updateProfilePicture(file);
    } catch {
      // Toast feedback is already handled inside AuthContext.
    } finally {
      event.target.value = "";
    }
  };

  const handleProfileSubmit = async (values, { setSubmitting }) => {
    try {
      await updateProfile(values);
    } catch {
      // Toast feedback is already handled inside AuthContext.
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await updatePassword(values);
      resetForm();
    } catch {
      // Toast feedback is already handled inside AuthContext.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.avatarSection}>
            <div style={styles.avatarWrapper} onClick={handleAvatarClick}>
              {user?.profile_image ? (
                <img src={user.profile_image} alt={user.firstname} style={styles.avatarImage} />
              ) : (
                <div style={styles.avatarFallback}>
                  {user?.firstname?.charAt(0).toUpperCase()}
                </div>
              )}
              <div style={styles.avatarBadge}>Edit</div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <h1 style={styles.heading}>
              {user?.firstname} {user?.lastname}
            </h1>
            <p style={styles.emailText}>{user?.email}</p>
          </div>

          <Formik
            initialValues={profileInitialValues}
            validationSchema={profileValidationSchema}
            onSubmit={handleProfileSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form style={styles.form} noValidate>
                <label htmlFor="firstname" style={styles.label}>
                  First Name
                </label>
                <Field id="firstname" name="firstname" type="text" style={styles.input} />
                <ErrorMessage name="firstname" component="p" style={styles.errorText} />

                <label htmlFor="lastname" style={styles.label}>
                  Last Name
                </label>
                <Field id="lastname" name="lastname" type="text" style={styles.input} />
                <ErrorMessage name="lastname" component="p" style={styles.errorText} />

                <label htmlFor="email" style={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  style={styles.disabledInput}
                />

                <label htmlFor="bio" style={styles.label}>
                  Bio
                </label>
                <Field
                  id="bio"
                  name="bio"
                  as="textarea"
                  rows={3}
                  placeholder="Tell us a bit about yourself"
                  style={styles.textarea}
                />
                <ErrorMessage name="bio" component="p" style={styles.errorText} />

                <button
                  type="submit"
                  style={styles.submitButton}
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? "Saving..." : "Save Changes"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div style={styles.card}>
          <h2 style={styles.subHeading}>Update Password</h2>

          <Formik
            initialValues={passwordInitialValues}
            validationSchema={passwordValidationSchema}
            onSubmit={handlePasswordSubmit}
          >
            {({ isSubmitting }) => (
              <Form style={styles.form} noValidate>
                <label htmlFor="oldPassword" style={styles.label}>
                  Current Password
                </label>
                <PasswordField
                  id="oldPassword"
                  name="oldPassword"
                  placeholder="Enter current password"
                  style={styles.input}
                />
                <ErrorMessage name="oldPassword" component="p" style={styles.errorText} />

                <label htmlFor="newPassword" style={styles.label}>
                  New Password
                </label>
                <PasswordField
                  id="newPassword"
                  name="newPassword"
                  placeholder="Minimum 8 characters"
                  style={styles.input}
                />
                <ErrorMessage name="newPassword" component="p" style={styles.errorText} />

                <label htmlFor="confirmPassword" style={styles.label}>
                  Confirm New Password
                </label>
                <PasswordField
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter new password"
                  style={styles.input}
                />
                <ErrorMessage name="confirmPassword" component="p" style={styles.errorText} />

                <button
                  type="submit"
                  style={styles.submitButton}
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? "Updating..." : "Update Password"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "48px 16px",
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
  wrapper: {
    width: "100%",
    maxWidth: "520px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    zIndex: 1,
  },
  card: {
    width: "100%",
    padding: "28px",
    borderRadius: "18px",
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    boxShadow: "0 20px 46px rgba(35, 23, 8, 0.15)",
  },
  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "18px",
  },
  avatarWrapper: {
    position: "relative",
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    cursor: "pointer",
    marginBottom: "12px",
  },
  avatarImage: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid blue",
  },
  avatarFallback: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    backgroundColor: "blue",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "34px",
  },
  avatarBadge: {
    position: "absolute",
    bottom: "-2px",
    right: "-2px",
    backgroundColor: "crimson",
    color: "#fff",
    fontSize: "10px",
    fontWeight: 700,
    padding: "3px 8px",
    borderRadius: "10px",
    border: "2px solid #fff",
  },
  heading: {
    fontSize: "22px",
    color: "#1f1a17",
    margin: 0,
    letterSpacing: "0.2px",
  },
  subHeading: {
    fontSize: "20px",
    color: "#1f1a17",
    margin: "0 0 16px",
  },
  emailText: {
    marginTop: "4px",
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
    border: "1px solid #d8cbc0",
    borderRadius: "10px",
    padding: "12px 13px",
    fontSize: "15px",
    backgroundColor: "#fffdf9",
    outline: "none",
  },
  disabledInput: {
    width: "100%",
    border: "1px solid #e4dcd3",
    borderRadius: "10px",
    padding: "12px 13px",
    fontSize: "15px",
    backgroundColor: "#f1ede7",
    color: "#8a8078",
    outline: "none",
    cursor: "not-allowed",
  },
  textarea: {
    width: "100%",
    border: "1px solid #d8cbc0",
    borderRadius: "10px",
    padding: "12px 13px",
    fontSize: "15px",
    backgroundColor: "#fffdf9",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
  },
  errorText: {
    color: "#c1361c",
    minHeight: "18px",
    fontSize: "13px",
    margin: "2px 0 0",
  },
  submitButton: {
    marginTop: "12px",
    border: "none",
    borderRadius: "12px",
    padding: "13px 16px",
    background: "crimson",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(219, 63, 53, 0.33)",
  },
};

export default Profile;
