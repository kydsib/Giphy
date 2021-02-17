import React, { useState } from 'react'
import { Grid, makeStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

const Giphy = ({ id, giphySrc, giphyDescription, refToGiphy }) => {
	const [open, setOpen] = useState(false)

	function toggleDialogOpen() {
		setOpen(prev => !prev)
	}

	const classes = useStyles()

	return (
		<Grid
			data-testid="container"
			onClick={toggleDialogOpen}
			className={classes.root}
			item
			lg={3}
			md={6}
			xs={12}
			ref={refToGiphy}
			key={id}
		>
			<img
				className={classes.image}
				src={giphySrc}
				alt={giphyDescription}
			/>

			<Dialog open={open} onClick={toggleDialogOpen}>
				<DialogActions>
					<Button
						onClick={toggleDialogOpen}
						color="primary"
						autoFocus
						
					>
						Close
					</Button>
				</DialogActions>
				<DialogContent>
					<img
						data-testid="opened-image"
						className={classes.image}
						src={giphySrc}
						alt={giphyDescription}
					/>
				</DialogContent>
			</Dialog>
		</Grid>
	)
}

export default Giphy

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: '25rem',
		[theme.breakpoints.up('lg')]: {
			maxWidth: '28rem',
			maxHeight: '28rem'
		}
	},
	image: {
		width: '100%',
		height: '100%',
		cursor: 'pointer'
	}
}))
