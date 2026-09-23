import { useState } from "react";
import { Field } from "formik";
import { Eye, EyeOff } from "lucide-react";

const PasswordField = ({ id, name, placeholder, style }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={styles.wrapper}>
      <Field
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        style={{ ...style, paddingRight: "44px" }}
      />
      <button
        type="button"
        onClick={() => setVisible((currentVisible) => !currentVisible)}
        style={styles.toggle}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        title={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
  },
  toggle: {
    position: "absolute",
    top: "50%",
    right: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    padding: 0,
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    color: "#5b5046",
    cursor: "pointer",
  },
};

export default PasswordField;