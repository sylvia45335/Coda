import * as _ from 'lodash';
import * as React from "react";
import axios from 'axios';
import Tracks from './components/Tracks.jsx';

function Home() {
    return (
        <div>
            <Tracks />
        </div>
    )
};

export default Home;