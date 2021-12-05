import React from 'react';

type FallbackProps = {
  children: JSX.Element;
};

export const Page = (props: FallbackProps): JSX.Element => (
  <div>
    <p>{'test the components here'}</p>

    <p>{' this is a page '}</p>

    {props.children}
  </div>
);
