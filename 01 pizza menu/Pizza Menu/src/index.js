import { func } from "prop-types";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = { color: "blue", fontSize: "48px", textTransform: "uppercase" };
  // return <h1 style={style}>Fast React Pizza Co.</h1>;
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const pizzasNumber = pizzas.length;
  return (
    <main className="menu">
      <h2>our menu</h2>

      {pizzasNumber > 0 ? (
        <>
          {/* 这个表明这是一个react fragment,这样的话<p></p>和<ul></ul>都会在特定情况下才会被render,而且不会影响到他们之间的格式 */}
          <p>Authentic Italian cuisine. 6 creative dishes to choose from</p>

          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza
                pizzaObj={pizza}
                key={pizza.name}
                // pizzaName={pizza.name}
                // pizzaImg={pizza.photoName}
                // pizzaDescription={pizza.ingredients}
                // price={pizza.price}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>We are current working on the menu, please check back later</p>
      )}
      {/* <Pizza
        pizzaName="Pizza Prosciutto"
        pizzaImg="pizzas/prosciutto.jpg"
        pizzaDescription="Tomato, mozarella, ham, aragula, and burrata cheese"
        price={10}
      />
      <Pizza
        pizzaName="Pizza Salamino"
        pizzaImg="pizzas/salamino.jpg"
        pizzaDescription="Tomato, mozarella, and pepperoni"
        price={15}
      /> */}
    </main>
  );
}

function Pizza(props) {
  // if (props.pizzaObj.soldOut) {
  //   return null;
  // }
  return (
    <li className={`pizza ${props.pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name}></img>
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>
          {props.pizzaObj.soldOut ? "Sold Out" : props.pizzaObj.price}
        </span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>
          We are happy to welcome you between {openHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  );
}

function Order(props) {
  return (
    <div className="order">
      <p>
        We're open untill {props.closeHour}:00, come visit us or order online
      </p>
      <button className="btn">order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
