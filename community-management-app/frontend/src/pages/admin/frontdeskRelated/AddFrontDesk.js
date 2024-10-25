import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AddFrontDesk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const { status, response, error } = userState;

  const [frontdeskName, setFrontdeskName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = {
    frontdeskName,
    password,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(registerUser(fields, "Frontdesk"));
  };

  // Check response status and show message
  useEffect(() => {
    if (status === "success") {
      console.log("STATUS  >>>>>>", status);
      // setMessage(response?.data?.message || "Successfully registered.");
      // setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        // navigate(-1); // Navigate back after showing the message
      }, 3000); // Adjust the timeout as needed
    } else if (status === "error" && error) {
      console.log("ERROR >>>>>", error);
      setMessage(error.response?.data?.message || "An error occurred."); // Safely access the error message
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000); // Adjust the timeout as needed
    }
  }, [status, response, error, navigate]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Back button handler
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <div className="register" style={styles.container}>
  
        <form className="registerForm" onSubmit={submitHandler} style={styles.form}>
          <h2 style={styles.title}>Register FrontDesk Personnel</h2>
          <label style={styles.label}>Frontdesk Name</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter Frontdesk Personnel's name..."
            value={frontdeskName}
            onChange={(event) => setFrontdeskName(event.target.value)}
            autoComplete="name"
            required
          />
          <label style={styles.label}>Password</label>
          <div style={styles.passwordContainer}>
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Frontdesk Personnel's password..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
            <span onClick={togglePasswordVisibility} style={styles.eyeIcon}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button style={styles.button} type="submit">
            Register Frontdesk Personnel
          </button>
          <button style={styles.button2} onClick={handleBack} styleL>
            BACK
          </button>
        </form>
      </div>
      {showPopup && (
        <Popup
          message={message}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        />
      )}
    </>
  );
};

// Inline styles for better form appearance
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    marginBottom: "20px",
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  label: {
    fontSize: "18px",
    marginBottom: "10px",
    display: "block",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  passwordContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    fontSize: "18px",
    color: "#007BFF",
  },
  button: {
    marginBottom: "1rem",
    width: "100%",
    padding: "12px",
    fontSize: "18px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
  },

  button2: {
    width: "100%",
    padding: "12px",
    fontSize: "18px",
    backgroundColor: "grey",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
  },
};

export default AddFrontDesk;
