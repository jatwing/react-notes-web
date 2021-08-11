import { useEffect, useState } from 'react';

const Form = () => {
  const [name, setName] = useState('Mary');
  useEffect(() => {
    localStorage.setItem('formData', name);
  });
  const [surname, setSurname] = useState('Poppins');
  useEffect(() => {
    document.title = name + ' ' + surname;
  });
};

const RulesOfHooks = () => {
  return (
    <>
      <Form />
    </>
  );
};

export default RulesOfHooks;
