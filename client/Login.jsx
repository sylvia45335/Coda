import * as _ from 'lodash';
import * as React from "react";

function Login() {
   const PORT = process.env.REACT_APP_PORT;

    return (
        <div className="login">
            <div className="loginLogo">
              <a href={`http://localhost:${PORT}/api/login`} className="loginName">Login</a>
            </div>
        </div>
    )
};

export default Login;