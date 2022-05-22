const Person = ({ person, removePerson }) => {
	return (
		<div>
			<span>{person.name}</span>
			<span> {person.number} </span>
			<button value={person.id} onClick={() => removePerson(person.id)}>delete</button>
		</div>
	)
}
export default Person