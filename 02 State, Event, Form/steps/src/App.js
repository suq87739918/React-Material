import React, { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    // return setStep(step > 1 ? step - 1 : 1);
    if (step > 1) setStep((currStep) => currStep - 1);
  }

  function handleNext() {
    //return setStep(step > 2 ? 3 : step + 1);
    if (step < 3) setStep((currStep) => currStep + 1);
  }

  function handleIsOpen() {
    return setIsOpen((isOpen) => !isOpen), setStep(1);
  }

  return (
    <>
      <button className="close" onClick={handleIsOpen}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>

          {/* <p className="message">
            <h3>
              Step {step} : {messages[step - 1]}
            </h3>
          </p> */}

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              textColor="#fff"
              bgColor="#7950f2"
              onClick={handlePrevious}
              // text="Previous"
              // emoji="👈"
            >
              <span>👈</span> Previous
            </Button>
            <Button
              textColor="#fff"
              bgColor="#7950f2"
              onClick={handleNext}
              // text="Next"
              // emoji="👉"
            >
              {/* 这部分就是Button组件标签之间的内容，会被作为children传递 */}
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  // children 是一个特殊的 prop（属性），用于传递组件标签之间的内容。这是 React 组件模型的一个重要特性，因为它允许我们将组件组合在一起，形成更复杂的 UI 结构。
  // 当一个组件有开标签和闭标签，并且标签之间有内容时，这些内容会作为 children prop 自动传递给该组件。
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default App;
