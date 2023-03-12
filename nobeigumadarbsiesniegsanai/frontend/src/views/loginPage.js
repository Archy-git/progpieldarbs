import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./LoginPage.css";

//Tiek renderēta login forma un izmantots "AuthContext"
const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };
  //Tiek atgriezta login forma
  return (
    <section className="login-page">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter Username" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
