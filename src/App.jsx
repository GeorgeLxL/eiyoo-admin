import './assets/css/style.css'
import React from 'react'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'

import routes from './Routes'


const Routing = () => {
    let routing = useRoutes(routes);
    return(routing)
}

const App = () => {
    return(
        <div className="container">
            <Router>
                <Routing />
            </Router>
        </div>
    )
}

export default App