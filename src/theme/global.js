import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
	createStyles({
		'@global': {
			'*': {
				boxSizing: 'border-box',
				margin: 0,
				padding: 0
			},
			html: {
				'-webkit-font-smoothing': 'antialiased',
				'-moz-osx-font-smoothing': 'grayscale',
				height: '100%',
				width: '100%'
			},
			body: {
				backgroundColor: '#fff',
				height: '100%',
				width: '100%',
				fontSize: '16px'
			},
			a: {
				textDecoration: 'none'
			},
			'#root': {
				height: '100%',
				width: '100%'
			},
			shadows: ['none']
		}
	})
)

const GlobalStyles = () => {
	useStyles()

	return null
}

export default GlobalStyles
