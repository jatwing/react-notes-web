import React from 'react';

import { Button } from 'components/buttons';

const Page = (): JSX.Element => {
  const a = 'test';
  return (
    <>
    <div>
      <Button label="text" type="text" />
    </div>
    <div>
      <Button label="outlined" type="outlined" />
    </div>
    <div>
      <Button label="contained" type="contained" />
    </div>
    </>
  );
};

export default Page;
