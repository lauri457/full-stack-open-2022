import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
	const style = {
		marginBottom: 10
	}
	return (
		<div style={style}>
			filter <input id='filter' onChange={(e) => props.setFilter(e.target.value)} />
		</div>
	)
}

const mapDispatchToProps = {
	setFilter
}

const mapStateToProps = (state) => {
	return {
		filter: state.filter
	}
}

const ConnectedFilter = connect(
	mapStateToProps,
	mapDispatchToProps
)(Filter)

export default ConnectedFilter