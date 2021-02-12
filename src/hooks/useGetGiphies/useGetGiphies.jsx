import { useState, useEffect } from 'react'

export default function useGetGiphies(searchQuery, showGipfyFromNumber) {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(false)
	const [giphies, setGiphies] = useState([])
	const [hasMore, setHasMore] = useState(false)
	const [nothingFound, setNothingFound] = useState(false)

	useEffect(() => {
		setGiphies([])
	}, [searchQuery])

	useEffect(() => {
		const APIKEY = 'BuqSHXIUmOKTbldv1X8YGbCrwdOhDp8Z'
		async function getGiphies() {
			setIsLoading(true)
			setError(false)

			try {
				const response = await fetch(
					`https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${APIKEY}&limit=12&offset=${showGipfyFromNumber}`
				)

				if (response.status === 200) {
					let data = await response.json()

					setGiphies(prev => [...prev, ...data.data])
					setHasMore(data.pagination.total_count > 1)
					setNothingFound(data.data.length < 1)
				}

				setIsLoading(false)
				return
			} catch (ex) {
				console.log(`Wooops something went wrong ${ex.message}`)
				setError(true)
			}
		}

		getGiphies()
	}, [searchQuery, showGipfyFromNumber])

	return { giphies, error, isLoading, hasMore, nothingFound }
}
