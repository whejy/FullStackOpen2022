import { useState } from "react";

const Button = (props) => (
  <>
    <button onClick={props.handleClick}>{props.text}</button>
  </>
);

const Anecdotes = (props) => (
  <>
    <h1>Anecdote of the Day</h1>
    {props.anecdote}
    <div>Votes: {props.votes}</div>
    <Button
      text="Vote"
      handleClick={() => {
        props.vote();
      }}
    />
    <Button text="Next Anecdote" handleClick={() => props.getRandomQuote()} />
    <div>
      <h1>Most Voted</h1>
      {props.max && (
        <div>
          {props.max.anecdote}
          <div>Votes: {props.max.points}</div>
        </div>
      )}
    </div>
  </>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const getRandomQuote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const getMax = () => anecdotes[points.indexOf(Math.max(...points))];

  const vote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  return (
    <div>
      <Anecdotes
        getRandomQuote={getRandomQuote}
        anecdote={anecdotes[selected]}
        vote={vote}
        votes={points[selected]}
        max={
          Math.max(...points) > 0
            ? { anecdote: getMax(), points: Math.max(...points) }
            : null
        }
      />
    </div>
  );
};

export default App;
