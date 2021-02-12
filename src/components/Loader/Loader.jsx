import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Loader() {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<CircularProgress className={classes.root} color="inherit" />
		</div>
	)
}

const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		width: '100%'
	},
	root: {
		margin: '0 auto'
	}
}))
