import React from 'react';
import { Button } from 'components/buttons'

type FallbackProps = {
  children: JSX.Element;
};

export const Page = (props: FallbackProps): JSX.Element => (
  <div>
    <p>{'test the components here'}</p>

    <Button label="good afternoon"/>

    <p>{' this is a page '}</p>

    {props.children}
  </div>
);
