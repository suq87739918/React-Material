function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })} //在这个button被点击的时候，通过useReducer来改变status
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
