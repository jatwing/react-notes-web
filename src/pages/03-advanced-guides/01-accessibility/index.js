/*
 * https://reactjs.org/docs/accessibility.html
 *
 *
 * see pointer
 */


import { useState, Fragment, useRef } from 'react';

/** web accessibility initiative - accessible rich internet applications */
const AccessibleRichInternetApplications = () => {
  const [value, setValue] = useState('');
  const label = 'label';
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <input
      type="text"
      aria-label={label}
      aria-required="true"
      onChange={handleChange}
      value={value}
      name="name"
    />
  );
};

/** semantic html */
const Glossary = (props) => {
  return (
    <dl>
      {props.items.map((item) => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
};

/** accessible forms */
const AccessibleForms = () => {
  return (
    <form>
      <label htmlFor="addressId">Address:</label>
      <input type="text" id="addressId" name="addressName" />
    </form>
  );
};

/** programmatically managing focus */

const CustomTextInput = (props) => {
  const { inputRef } = props;
  return (
    <div>
      <input ref={inputRef} />
    </div>
  );
};

const ManagingFocus = () => {
  const inputRef = useRef();
  const focus = () => {
    inputRef.current.focus();
  };
  return (
    <>
      <CustomTextInput inputRef={inputRef} />
      <button onClick={() => focus()}>focus</button>
    </>
  );
};

const Accessibility = () => {
  /**
   * source : http://wordnetweb.princeton.edu/perl/webwn
   *
   */
  const items = [
    {
      id: 1,
      term: 'apple',
      description:
        'fruit with red or yellow or green skin and sweet to tart crisp whitish flesh',
    },
    {
      id: 2,
      term: 'banana',
      description:
        'elongated crescent-shaped yellow fruit with soft sweet flesh',
    },
    {
      id: 3,
      term: 'cherry',
      description: 'a red fruit with a single hard stone',
    },
  ];

  return (
    <>
      <AccessibleRichInternetApplications />
      <Glossary items={items} />
      <AccessibleForms />
      <ManagingFocus />
    </>
  );
};

export default Accessibility;
