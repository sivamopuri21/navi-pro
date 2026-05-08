"use client";
import { Component, ReactNode } from "react";
import { logError } from "@/lib/errorLogger";

interface Props {
  children: ReactNode;
  page?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    logError(error, this.props.page || window.location.pathname);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">Something went wrong</h2>
            <p className="text-gray-500 mb-4">An error has been logged. Please try refreshing the page.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
