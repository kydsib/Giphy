import React, { useState, useRef, useCallback } from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Search from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import Alert from '@material-ui/lab/Alert'
import Loader from '../Loader/Loader'

import useGetGiphies from '../../hooks/useGetGiphies/useGetGiphies'
import Giphy from '../Giphy/Giphy'

const GipshySearch = () => {
	const [inputValue, setInputValue] = useState('')
	const [inputError, setInputError] = useState(false)
	const [errorMessage, SetErrorMessage] = useState('')
	const [searchQuery, setSearchQuery] = useState('space')
	const [showGipfyFromNumber, setShowGiphyFromNumber] = useState(1)

	const loadNumberOfNewResults = 12

	const classes = useStyles()

	const observer = useRef(null)

	const { giphies, error, isLoading, hasMore, nothingFound } = useGetGiphies(
		searchQuery,
		showGipfyFromNumber
	)

	// node coresponds to element with ref
	const loadMoreGiphyRef = useCallback(
		node => {
			if (isLoading) return

			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore) {
					setShowGiphyFromNumber(
						prevPageNumber =>
							prevPageNumber + loadNumberOfNewResults
					)
				}
			})
			if (node) observer.current.observe(node)
		},
		[isLoading, hasMore]
	)

	function handleSearchInput(event) {
		event.preventDefault()
		setSearchQuery(inputValue)

		event.target.reset()
	}

	function handleInput(event) {
		const regex = /^[a-zA-Z0-9 ]*$/
		const value = event.target.value
		if (value.match(regex)) {
			setInputValue(value)
			setInputError(false)
		} else if (!value.match(regex)) {
			setInputError(true)
			SetErrorMessage('No special characters allowed!')
		}
	}

	const ConditionalTextField = inputError ? (
		<TextField
			data-testid="error"
			error
			id="standard-error-helper-text"
			helperText={errorMessage}
			label="Error"
			variant="outlined"
			onChange={handleInput}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Button
							disableElevation
							disabled={inputError}
							type="submit"
							variant="contained"
							color="#f9f9f9"
						>
							<Search />
						</Button>
					</InputAdornment>
				)
			}}
			fullWidth="true"
		/>
	) : (
		<TextField
			id="standard-basic"
			data-testid="no-error"
			label="Search"
			variant="outlined"
			onChange={handleInput}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Button
							disableElevation
							disabled={inputError}
							type="submit"
							variant="contained"
							color="#f9f9f9"
						>
							<Search />
						</Button>
					</InputAdornment>
				)
			}}
			fullWidth="true"
		/>
	)

	return (
		<Container maxWidth="lg">
			<div className={classes.root}>
				<form
					className={classes.formContainer}
					onSubmit={handleSearchInput}
				>
					{ConditionalTextField}
				</form>
			</div>

			{error ? (
				<Alert className={classes.error} severity="warning">
					Something went wrong, check your internet connection or try
					latter.
				</Alert>
			) : null}
			<Grid container spacing={3}>
				{giphies.map((giphy, index) => {
					if (giphies.length === index + 1) {
						return (
							<Giphy
								refToGiphy={loadMoreGiphyRef}
								id={giphy.id}
								giphySrc={giphy.images.downsized.url}
								giphyDescription={giphy.title}
							/>
						)
					} else {
						return (
							<Giphy
								id={giphy.id}
								giphySrc={giphy.images.downsized.url}
								giphyDescriptio={giphy.title}
							/>
						)
					}
				})}
				{isLoading ? <Loader /> : null}
			</Grid>

			<div>{error && 'Error'}</div>
			{nothingFound ? (
				<Alert severity="info">
					We couldn't find anything, try again!
				</Alert>
			) : null}
		</Container>
	)
}

export default GipshySearch

const useStyles = makeStyles(theme => ({
	root: {
		height: '6rem',
		padding: '0 1rem',
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	formContainer: {
		marginTop: '0.75rem',
		width: '80vw',
		[theme.breakpoints.up('sm')]: {
			width: '50vw'
		},
		error: {
			marginBottom: '0.75rem',
			justifyContent: 'center'
		}
	}
}))
