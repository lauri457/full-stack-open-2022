import Person from "./Person"

const Persons = ({ personsToShow }) => personsToShow.map(person => <Person key={person.id} person={person} />)

export default Persons