import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}: </td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const calcAverage = (good, neutral, bad) =>
    (good - bad) / (good + neutral + bad);

  const calcPositive = (good, neutral, bad) =>
    ((100 * good) / (good + neutral + bad)).toFixed(1) + "%";

  return (
    <>
      <h1>Statistics</h1>
      {good === 0 && neutral === 0 && bad === 0 ? (
        <p>No Feedback Given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="Total" value={good + neutral + bad} />
            <StatisticLine
              text="Average"
              value={
                good + neutral + bad !== 0 ? calcAverage(good, neutral, bad) : 0
              }
            />
            <StatisticLine
              text="Positive"
              value={
                good + neutral + bad !== 0
                  ? calcPositive(good, neutral, bad)
                  : 0
              }
            />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
