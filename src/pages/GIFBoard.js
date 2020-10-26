//Api Key Giphy
//V5Xmrg24QFvDHu7iFP1dAflkXoGf6xA4

import React, { Component } from "react";
import "../assets/scss/pages/GIFBoard.scss";
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
// use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
const gf = new GiphyFetch('V5Xmrg24QFvDHu7iFP1dAflkXoGf6xA4')
// configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
const fetchGifs = (offset) => gf.trending({ offset, limit: 15 })


class GIFBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Grid width={800} columns={3} fetchGifs={fetchGifs} />
        )
    }
}

export default GIFBoard;