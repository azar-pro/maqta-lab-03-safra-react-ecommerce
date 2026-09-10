import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('SAFRA render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="section app-error">
          <div className="shell empty-state empty-state-card">
            <span className="empty-icon" aria-hidden="true">!</span>
            <p className="eyebrow">Something went wrong</p>
            <strong>SAFRA could not render this view.</strong>
            <p>Reload the page to restart the demo store. Your saved cart and wishlist should remain in this browser.</p>
            <button className="btn btn-dark" type="button" onClick={() => window.location.reload()}>Reload store</button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
