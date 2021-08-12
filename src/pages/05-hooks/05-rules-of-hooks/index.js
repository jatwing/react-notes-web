import { useEffect, useState } from 'react';

/** react relies on the order in which hooks are called */
const Form = () => {
  const [name, setName] = useState('Mary');
  useEffect(() => {
    localStorage.setItem('formData', name);
  });
  const [surname, setSurname] = useState('Poppins');
  useEffect(() => {
    /** put that condition inside our hook  */
    if (name !== '') {
      document.title = name + ' ' + surname;
    }
  });
  return <></>;
};

const RulesOfHooks = () => {
  return (
    <>
      <Form />
    </>
  );
};

export default RulesOfHooks;
