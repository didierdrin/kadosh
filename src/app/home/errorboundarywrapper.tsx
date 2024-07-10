'use client';

import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({error}: {error: Error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default function ErrorBoundaryWrapper({ children }: {children: React.ReactNode}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}