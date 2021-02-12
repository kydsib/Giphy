import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Giphy from '../Giphy'

describe('<Giphy />', () => {
	let props

	beforeEach(() => {
		props = {
			id: '123123wqeq',
			giphySrc: 'www.photo.jpeg',
			giphyDescription: 'testing'
		}
	})

	it('renders correctly', () => {
		render(<Giphy {...props} />)

		expect(screen.getByTestId('image')).toBeInTheDocument()
	})

	it('pop up appears on clicking image', () => {
		render(<Giphy {...props} />)

		userEvent.click(screen.getByTestId('container'))
		expect(screen.getByTestId('opened-image')).toBeTruthy()

		userEvent.click(screen.getByTestId('pop-up'))
		expect(screen.getByTestId('image')).toBeInTheDocument()
	})
})
