import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'

import { server }  from '../../../mocks/server'
import GipshySearch from '../GiphySearch'

it('displays giiphies from server', async() => {
     render(<GipshySearch />)

    const allGiphies = await screen.findAllByRole('img')
    expect(allGiphies).toHaveLength(3)

    const allTexts = allGiphies.map(item => item.alt)
    expect(allTexts).toEqual(['dogo', 'dog', 'dogie'])

})

it('handles errors and shows alert',  async () => {
    server.resetHandlers(
        rest.get('https://api.giphy.com/v1/gifs/search', (req, res, ctx) => {
            res(ctx.status(500))
        })
    )

    render(<GipshySearch />)

    
    await waitFor(async() => {
        const alertMsg = screen.getByText(/or try latter.$/i)
        expect(alertMsg).toBeDefined()
    })
})