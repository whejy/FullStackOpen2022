const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const Total = ({ parts }) => {
  const sum = parts.reduce((acc, current) => acc + current.exercises, 0);
  return (
    <>
      <b>Total of {sum} exercises</b>
    </>
  );
};

const Course = (props) => {
  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  );
};

export default Course;
