import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import '../assets/css/Login.css';

interface LoginData {
  email: string;
  password: string;
}

interface JwtPayload {
  role: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email: string, password: string) => {
    const item: LoginData = { email, password };
    console.warn(item);

    try {
      const result = await axios.post("http://localhost:8000/api/login", item, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token: authToken } = result.data;
      localStorage.setItem("jwt", authToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

      Cookies.set('jwt', authToken);
      Cookies.set('isAuthenticated', 'true');

      const storedToken = localStorage.getItem('jwt');
      if (storedToken !== null) {
        const decodedToken: JwtPayload = jwtDecode(storedToken);
        const role = decodedToken.role;

        if (role === 'admin') {
          navigate("/admin-dashboard");
        } else if (role === 'seller') {
          navigate("/seller-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        console.log('No token found in local storage');
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  // Add a form element to call handleSubmit
  return (
    <div className="login-container">
      {/* <form onSubmit={handleSubmit}> */}
        {/* Add input fields for email and password */}
        {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button> */}
      {/* </form> */}
    </div>
  );
};
export default Login