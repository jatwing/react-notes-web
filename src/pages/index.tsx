import { Button } from 'components/buttons';
import { TestIcon } from 'components/svg-icons';
import React from 'react';

const Page = (): JSX.Element => {
  const a = 'test';
  return (
    <>
      <div>
        <Button
          label="text"
          type="text"
          icon={TestIcon}
          isIconLeading={false}
        />
      </div>
      <div>
        <Button
          label="outlined"
          type="outlined"
          icon="bookmark"
          isIconLeading={false}
        />
      </div>
      <div>
        <Button label="contained" type="contained" isFullwidth={true} />
      </div>
    </>
  );
};

export default Page;
