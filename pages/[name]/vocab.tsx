import React from 'react';

import type { NextPage } from 'next'
import { useStateContext } from '@src/context/state';

const Vocab: NextPage = () => {
  const { name, token } = useStateContext();

  return (
    <div>Hello {name} - {token}</div>
  );
}

export default Vocab;
