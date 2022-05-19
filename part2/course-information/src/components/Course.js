const Course = ({ course }) => {
	return (
	  <>
		<Header name={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	  </>
	)
  }

  const Header = ({ name }) => <h1>{name}</h1>

  const Total = ({ parts }) =>
	<p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)} </p>

  const Part = ({ part }) =>
	<p>
	  {part.name} {part.exercises}
	</p>

  const Content = ({ parts }) =>
	<>
	  {parts.map(part =>
		<Part key={part.id} part={part} />
	  )}
	</>

export default Course