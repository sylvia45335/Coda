import * as _ from 'lodash';
import * as React from "react";
import axios from 'axios';

function Artists() {
    const PORT = process.env.REACT_APP_PORT;
    const apiURL = `http://localhost:${PORT}/api/artists`

    return(
        <div>
            Artists
        </div>
    )
}

export default Artists;