import { useContext } from "react";

import AuthContext from "../context/AuthContext";
import "./homePage.css";
//Tiek izmanots "AuthContext"
const Home = () => {
  const { user } = useContext(AuthContext);
  //Tiek renderēta Sākuma lapa
  return (
    <section className="container">

      <header className="header">
        <h1 className="title">Financial Planner and Manager</h1>
        <p className="subtitle">A simple way to manage your finances</p>
      </header>
      <main className="main">
        <section className="section">
          <h2 className="section-title">Track Your Expenses and Incomes</h2>
          <p className="section-text">
            Phasellus ut turpis purus. Proin elementum ultricies dignissim. Donec pharetra nisi nibh, quis dapibus diam iaculis vel. Donec cursus velit a pulvinar suscipit. Proin eleifend mauris metus, eget pulvinar orci interdum sit amet. Integer ut sem porta, faucibus tellus a, vehicula nunc. Curabitur at egestas neque. Vestibulum gravida porttitor elit, at vehicula odio lacinia eget. Cras eleifend magna vitae sollicitudin accumsan. Morbi lacinia posuere ante in dictum. Phasellus eu augue elementum, tristique leo volutpat, mattis ex. Nullam feugiat nisl risus, sed consectetur turpis tempus non.          </p>
        </section>
        <section className="section">
          <h2 className="section-title">Create Budgets and Goals</h2>
          <p className="section-text">
            Phasellus ut turpis purus. Proin elementum ultricies dignissim. Donec pharetra nisi nibh, quis dapibus diam iaculis vel. Donec cursus velit a pulvinar suscipit. Proin eleifend mauris metus, eget pulvinar orci interdum sit amet. Integer ut sem porta, faucibus tellus a, vehicula nunc. Curabitur at egestas neque. Vestibulum gravida porttitor elit, at vehicula odio lacinia eget. Cras eleifend magna vitae sollicitudin accumsan. Morbi lacinia posuere ante in dictum. Phasellus eu augue elementum, tristique leo volutpat, mattis ex. Nullam feugiat nisl risus, sed consectetur turpis tempus non.
          </p>
        </section>
        <section className="section">
          <h2 className="section-title">Get Insights and Recommendations</h2>
          <p className="section-text">
            Phasellus ut turpis purus. Proin elementum ultricies dignissim. Donec pharetra nisi nibh, quis dapibus diam iaculis vel. Donec cursus velit a pulvinar suscipit. Proin eleifend mauris metus, eget pulvinar orci interdum sit amet. Integer ut sem porta, faucibus tellus a, vehicula nunc. Curabitur at egestas neque. Vestibulum gravida porttitor elit, at vehicula odio lacinia eget. Cras eleifend magna vitae sollicitudin accumsan. Morbi lacinia posuere ante in dictum. Phasellus eu augue elementum, tristique leo volutpat, mattis ex. Nullam feugiat nisl risus, sed consectetur turpis tempus non.
            Phasellus ut turpis purus. Proin elementum ultricies dignissim. Donec pharetra nisi nibh, quis dapibus diam iaculis vel. Donec cursus velit a pulvinar suscipit. Proin eleifend mauris metus, eget pulvinar orci interdum sit amet. Integer ut sem porta, faucibus tellus a, vehicula nunc. Curabitur at egestas neque. Vestibulum gravida porttitor elit, at vehicula odio lacinia eget. Cras eleifend magna vitae sollicitudin accumsan. Morbi lacinia posuere ante in dictum. Phasellus eu augue elementum, tristique leo volutpat, mattis ex. Nullam feugiat nisl risus, sed consectetur turpis tempus non.
          </p>
        </section>
      </main>
    </section>
  );
};

export default Home;
