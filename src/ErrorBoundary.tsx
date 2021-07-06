import { Component } from 'react';
import Header from './Header';

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err: any) {
    return { hasError: true };
  }

  componentDidCatch(err: any, errInfo: any) {
    console.log(err, errInfo);
  }

  render() {
    const { hasError }: any = this.state;
    if (hasError) {
      return (
        <div>
          <Header />
          <h2>Sorry Something went wrong</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
