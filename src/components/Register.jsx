import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../css/Register.module.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    userName: Yup.string().trim().required("Full name is required!"),
    email: Yup.string()
      .email("Please enter a valid email address!")
      .required("Email is required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters!")
      .required("Password is required!"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm, setStatus }) => {
      console.log("User Data:", values);

      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = existingUsers.some(
        (user) => user.email === values.email
      );

      if (userExists) {
        setStatus({ error: "User already registered with this email!" });
        return;
      }

      const updatedUsers = [...existingUsers, values];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setStatus({ success: "Registration successful!" });
      resetForm();

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.circles}></div>

      <div className={styles.card}>
        <h2 className={styles.title}>Create Your Account</h2>
        <p className={styles.subtitle}>Join us and explore new opportunities ✨</p>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            name="userName"
            placeholder="Enter your full name"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
          {formik.touched.userName && formik.errors.userName && (
            <p className={styles.error}>{formik.errors.userName}</p>
          )}

          <label className={styles.label}>Email Address</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={styles.error}>{formik.errors.email}</p>
          )}

          <label className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
          {formik.touched.password && formik.errors.password && (
            <p className={styles.error}>{formik.errors.password}</p>
          )}

          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button type="submit" className={styles.button}>
            Register
          </button>

          {formik.status && formik.status.error && (
            <p className={styles.error}>{formik.status.error}</p>
          )}
          {formik.status && formik.status.success && (
            <p className={styles.message}>{formik.status.success}</p>
          )}

          <p className={styles.loginLink}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;