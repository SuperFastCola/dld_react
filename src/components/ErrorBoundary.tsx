import React from "react";

interface Props{
    children:any;
}

interface State{
    hasError:boolean;
    error:any;
    errorInfo:any;
}

class ErrorBoundary extends React.Component<Props,State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error:null, errorInfo:null };
  }

  static getDerivedStateFromError(errorObject) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: errorObject};
  }

  componentDidCatch(errorObject, errorInfoObject) {
    // You can also log the error to an error reporting service
    this.setState({error:errorObject, errorInfo:errorInfoObject});
    return null;
  }

  render() {
    if (this.state.hasError) {      // You can render any custom fallback UI
      return <h1>Something Went Wrong</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;