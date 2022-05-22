import Person from "./Person"

const Persons = ({ personsToShow, removePerson }) => personsToShow.map(person => <Person key={person.id} person={person} removePerson={removePerson}/>)

export default Persons