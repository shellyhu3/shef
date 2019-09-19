import React from 'react';
import '../../App.css'

class ErrorBoundary extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true})
  }


  render() {
    if (this.state.hasError) {
      return <h3 className='error_msg'>Oops, something went wrong! Try again.</h3>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;