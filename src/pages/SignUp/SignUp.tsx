import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styles } from "./styles";

import { motion } from "framer-motion";

// Define Form Data Type
interface FormData {
  firstName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Yup Validation Schema
const validationSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp: React.FC = () => {
  const navigate = useNavigate();

const[loading,setLoading]=useState(false)  // Initialize Formik
  const formik = useFormik<FormData>({
    initialValues: {
      firstName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      console.log("Form submitted successfully", values);
      // Redirect to login page or make API request
      // navigate("/login");
    },
  });
  const containerVariants = {
    hidden: { width: "100%",opacity: 0, y: 200 },
    visible: {
      width: "100%",
      opacity: 1,
      y: 0,
      transition: {
        duration: 1, 
        ease: "easeInOut",
      },
    },
  };
  const textVariants = {
    hidden: { opacity: 0, y: -200 ,width:"100%"},
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 1 }, 
    },
  };
  return (    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
  
      >
        
    <styles.outerContainer>
      <styles.rightContainer>
         <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                  >

        <styles.loginForm onSubmit={formik.handleSubmit}>
          <styles.heading>Sign Up</styles.heading>

          {/* First Name */}
          <styles.input
            type='text'
            name="firstName"
            placeholder='First Name'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p style={{ color: "red", fontSize: "12px" }}>{formik.errors.firstName}</p>
          )}

          {/* Phone Number */}
          <styles.input
            type='tel'
            name="phone"
            placeholder='Phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p style={{ color: "red", fontSize: "12px" }}>{formik.errors.phone}</p>
          )}

          {/* Email */}
          <styles.input
            type='email'
            name="email"
            placeholder='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p style={{ color: "red", fontSize: "12px" }}>{formik.errors.email}</p>
          )}

          {/* Password */}
          <styles.input
            type='password'
            name="password"
            placeholder='Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p style={{ color: "red", fontSize: "12px" }}>{formik.errors.password}</p>
          )}

          {/* Confirm Password */}
          <styles.input
            type='password'
            name="confirmPassword"
            placeholder='Re-Enter Password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p style={{ color: "red", fontSize: "12px" }}>{formik.errors.confirmPassword}</p>
          )}

          <styles.button type="submit" disabled={loading}>{loading?"Loading...":"Sign Up"}</styles.button>
          <p>
            Already have an account?{" "}
            <u onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>Login</u>
          </p>
        </styles.loginForm>
                  </motion.div>
      </styles.rightContainer>

      <styles.leftContainer>
        <styles.image src='one.png' />
      </styles.leftContainer>
    </styles.outerContainer>
      </motion.div>
  );
};

export default SignUp;
