import Header from "./Header";
import Content from "./Content";
import Sum from "./Sum";

const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Sum parts={parts} />
    </>
  );
};

export default Course;
