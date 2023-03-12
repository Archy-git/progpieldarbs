import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import styles from "./Register.module.css";

function Register() {
  // Inicializē stāvokļa mainīgos
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // Saņem funkciju registerUser no AuthContext
  const { registerUser } = useContext(AuthContext);


  // Šis komponents definē veidlapas iesniegšanas apstrādātāja funkciju, kas pārbauda, vai parole atbilst noteiktām prasībām, pirms izsauc funkciju, lai reģistrētu jaunu lietotāju.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);
    console.log(hasUpperCase)
    console.log(hasLowerCase)
    console.log(hasNumber)
    console.log(hasSpecialChar)
    if (
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    ) {
      registerUser(username, password, password2);
    } else {
      window.alert("Password must be at least 8 characters long, contain a digit, one capital letter and one special character.");
    }
  };

  //Definē reģistrācijas veidlapu, kas no lietotāja ievāc lietotājvārdu, paroli un apstiprinājuma paroli un parāda kļūdas ziņojumu, ja paroles nesakrīt. Kad lietotājs iesniedz veidlapu, tiek izsaukta funkcija handleSubmit, lai apstiprinātu paroli un reģistrētu lietotāju.
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>Register</h1>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            className={styles.input}
            type="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className={styles.input}
            type="password"
            id="confirm-password"
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <p className={styles.error}>
            {password2 !== password ? "Passwords do not match" : ""}
          </p>
        </div>
        <button className={styles.button}>Register</button>
      </form>
    </div>
  );
}

export default Register;
