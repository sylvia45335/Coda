import * as _ from 'lodash';
import * as React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Artists from './components/Artists.jsx';
import Tracks from './components/Tracks.jsx';

function Home() {
    return (
        <div>
            <Tracks />
        </div>
    )
};

export default Home;