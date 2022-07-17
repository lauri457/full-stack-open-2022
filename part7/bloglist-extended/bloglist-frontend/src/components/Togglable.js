import { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'

const Togglable = (props) => {
	const [open, setOpen] = useState(false)

	return (
		<div>
			<div>
				<Button
					onClick={() => setOpen(!open)}
					aria-controls="create new"
					aria-expanded={open}
				>
					{props.buttonLabel}
				</Button>
			</div>
			<Collapse in={open}>
				<div>{props.children}</div>
			</Collapse>
		</div>
	)
}

export default Togglable

// import { useState, forwardRef, useImperativeHandle } from 'react'
// import PropTypes from 'prop-types'

// const Togglable = forwardRef((props, refs) => {
// 	const [visible, setVisible] = useState(false)

// 	const hideWhenVisible = { display: visible ? 'none' : '' }
// 	const showWhenVisible = { display: visible ? '' : 'none' }

// 	const toggleVisibility = () => {
// 		setVisible(!visible)
// 	}

// 	useImperativeHandle(refs, () => {
// 		return {
// 			toggleVisibility
// 		}
// 	})

// 	return (
// 		<div>
// 			<div style={hideWhenVisible}>
// 				<Button onClick={toggleVisibility}>{props.ButtonLabel}</Button>
// 			</div>
// 			<div style={showWhenVisible} className='togglableContent'>
// 				{props.children}
// 				<Button onClick={toggleVisibility}>cancel</Button>
// 			</div>
// 		</div>
// 	)
// })

// Togglable.displayName= 'Togglable'

// Togglable.propTypes = {
// 	ButtonLabel: PropTypes.string.isRequired
// }

// export default Togglable
