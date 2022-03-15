import React from 'react';

interface IMaybe {
  test: boolean;
  children: React.ReactNode;
}

export const Maybe = ({test, children}: IMaybe) => (
  <>{test ? children : null}</>
);
