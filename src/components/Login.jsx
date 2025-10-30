import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../css/Register.module.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address!")
      .required("Email is required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters!")
      .required("Password is required!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );

      if (existingUser) {
        setSuccessMessage("✅ Login successful!");
        setErrorMessage("");
        resetForm();
        setTimeout(() => {
          navigate("/todolist")
        }, 1500);
      } else {
        setErrorMessage("❌ Invalid email or password!");
        setSuccessMessage("");
      }
    },
  });

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <h2 className={styles.title}>Welcome Back 👋</h2>

//         <form onSubmit={formik.handleSubmit} className={styles.form}>
//           <label className={styles.label}>Email Address</label>
//           <input
//             type="text"
//             name="email"
//             placeholder="Enter your email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className={styles.input}
//           />
//           {formik.touched.email && formik.errors.email && (
//             <p className={styles.error}>{formik.errors.email}</p>
//           )}

//           <label className={styles.label}>Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className={styles.input}
//           />
//           {formik.touched.password && formik.errors.password && (
//             <p className={styles.error}>{formik.errors.password}</p>
//           )}

//           <div className={styles.checkboxContainer}>
//             <input type="checkbox" id="remember" />
//             <label htmlFor="remember">Remember me</label>
//           </div>

//           <p className={styles.forgot}>Forgot Password?</p>

//           <button type="submit" className={styles.button}>
//             Login
//           </button>

//           {successMessage && (
//             <p className={styles.message}>{successMessage}</p>
//           )}
//           {errorMessage && <p className={styles.error}>{errorMessage}</p>}

//           <div className={styles.backpage}>
//             <p>
//               Don’t have an account?{" "}
//               <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>
//                 Register here
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
return (
  <div className={`${styles.page} ${styles.circles}`}>
    <div className={styles.card}>
      <h2 className={styles.title}>Welcome Back 👋</h2>
      <p className={styles.subtitle}>Log in to continue your journey</p>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        {/* Email */}
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

        {/* Password */}
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
          Login
        </button>

        {successMessage && <p className={styles.message}>{successMessage}</p>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <div className={styles.loginLink}>
          Don’t have an account?{" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            <span>Register here</span>
          </Link>
        </div>
      </form>
    </div>
  </div>
);

};

export default LoginPage;








