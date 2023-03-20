const Sum = ({ parts }) => {
  //
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);
  return <p>total of {total} exercices</p>;
};

export default Sum;
