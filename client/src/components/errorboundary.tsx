import React from 'react';
export default class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (!!this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="container flex justify-center items-center">
          <h1 className="error-title">
            Woops! <br />
            Something went wrong :(
          </h1>
          <h2 className="error-subtitle">Have you tried turning it off and on again?</h2>
        </div>
      );
    }

    return this.props.children;
  }
}
