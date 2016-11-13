import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Layout = (props) => {
  return (
    <MuiThemeProvider>
      {props.children}
    </MuiThemeProvider>
  )
}

Layout.propTypes = {
  children: React.PropTypes.object
}

export default Layout
