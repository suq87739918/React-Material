import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function Avatar() {
  return <h1>Here could be a img</h1>;
}

function Intro() {
  return (
    <div>
      <h2>Yueqian</h2>
      <p>My name is Yueqian, graduate from Mcmaster University Major in CS</p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill skill="React" color="red"/>
      <Skill skill="JS" color="blue"/>
      <Skill skill="Java" color="purple"/>
      <Skill skill="Python" color="green"/>
      <Skill skill="Spring Boot" color="yellow"/>
    </div>
  );
}

function Skill(props) {
  return <div className="skill" style={{backgroundColor: props.color}}>{props.skill}</div>;
}

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
