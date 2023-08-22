import * as _ from 'lodash';
import * as React from "react";

function Login() {
   const PORT = process.env.REACT_APP_PORT;

    return (
        <div>
            <a href={`http://localhost:${PORT}/api/login`}>Login</a>
        </div>
    )
};

export default Login;