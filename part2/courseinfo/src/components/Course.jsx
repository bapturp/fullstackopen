const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((acc, val) => acc + val.exercises, 0)
  return <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>
}

const Course = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map((p) => (
        <Part key={p.id} part={p}></Part>
      ))}
      <Total parts={course.parts}></Total>
    </>
  )
}

export default Course
