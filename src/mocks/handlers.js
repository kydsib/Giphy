import {rest } from 'msw'

export const handlers = [
    // rest or graphQl based on api
    rest.get("https://api.giphy.com/v1/gifs/search", (req, res, ctx) => {
        return res(
            ctx.json({ data: [
                
                {id: 1, 
                    images: {
                        downsized: {
                            url: 'www.dogo.gif'
                        }
                    },
                 title: 'dogo'},
                 {id: 2, 
                    images: {
                        downsized: {
                            url: 'www.dog.gif'
                        }
                    },
                 title: 'dog'},
                 {id: 3, 
                    images: {
                        downsized: {
                            url: 'www.dogie.gif'
                        }
                    },
                 title: 'dogie'},
      
            ],
          
            
            })
        )
    }),
]