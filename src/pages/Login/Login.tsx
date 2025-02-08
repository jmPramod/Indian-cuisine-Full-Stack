import React, { useEffect, useState } from 'react';
import { styles } from "./styles";
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../utils/API.services';

import { motion } from "framer-motion";
import { GlobalContext } from '../../Context/GlobalContext';

import { ToastMsg } from '../../components/ToastMsg/ToastMsg';
import { User } from '../../types/foodTypes';

interface LoginResponse {
  status: number;
  data?: {
    user: User;
    token: string;
    message?: string;
  };
  error?: string;
}

const Login: React.FC = () => {
  
  const navigate = useNavigate();
    const { setUser,user } = React.useContext(GlobalContext);
  const [formData, setFormData] = useState<{ email: string; password: string }>({ email: "", password: "" });
  const [error, setError] = useState<string | null|undefined>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit login request
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await userLogin(formData) as LoginResponse | undefined; // Ensure type safety

      if (res && res.status === 200 && res.data?.token) {
            setUser(res.data.user)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user)); // Convert object to string
        localStorage.setItem("userType", res.data.user.isAdmin); // Store user type separately
      
        navigate("/");
      }
      else {
        setError( res?.error);
      }
    } catch (error: any) {
      setError(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const containerVariants = {
    hidden: { width: "100%",opacity: 0, x: -200 },
    visible: {
      width: "100%",
      opacity: 1,
      x: 0,
      transition: {
        duration: 1, 
        ease: "easeInOut",
      },
    },
  };
  const textVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, delay: 1 }, 
    },
  };
  useEffect(()=>{
    if((Object.keys(user).length>0 )){
      navigate("/")
    }
  },[user])
  return (
    <motion.div 
    variants={containerVariants}
    initial="hidden"
    animate="visible"

    >
    <styles.outerContainer>


      <styles.leftContainer>
        <styles.image src='one1.png' />
      </styles.leftContainer>

      <styles.rightContainer>
      <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >


        <styles.loginForm onSubmit={login}>
          <styles.heading>Login</styles.heading>

          {error && <styles.errorText>{error}</styles.errorText>}

          <styles.input 
            type='email' 
            placeholder='Email' 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />

          <styles.input 
            type='password' 
            placeholder='Password' 
            name='password' 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />

          <styles.button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </styles.button>

          <p>Don't have an account? <u style={{cursor:"pointer"}}onClick={() => navigate("/register")}>Register</u></p>
        </styles.loginForm>
          </motion.div>
      </styles.rightContainer>
    </styles.outerContainer>
    <ToastMsg  message={error||""} intent="error"/>
     
    </motion.div>
  );
};

export default Login;
