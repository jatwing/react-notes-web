import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useAuthors = () => {
  const status = useSelector((state) => state.authors.status);
};
