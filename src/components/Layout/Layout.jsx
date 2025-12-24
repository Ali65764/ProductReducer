import React from 'react'
import NavBar from './NavBar'

function Layout({ children }) {
    return (
        <React.Fragment>
            <NavBar />
            {children}
        </React.Fragment>
    )
}

export default Layout