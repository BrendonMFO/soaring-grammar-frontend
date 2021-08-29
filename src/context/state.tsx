import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type stateContextType = {
  name: string;
  token: string;
  setName: Dispatch<SetStateAction<string>>
  setToken: Dispatch<SetStateAction<string>>
};

type Props = {
  children: ReactNode;
};

const StateContext = createContext<stateContextType>({
  name: '',
  token: '',
  setName: () => {},
  setToken: () => {}
});

export function StateContextProvider({ children }: Props) {
  const [name, setName] = useState<string>('');
  const [token, setToken] = useState<string>('');

  return (
    <>
      <StateContext.Provider value={{ token, setToken, name, setName }} >
        {children}
      </StateContext.Provider>
    </>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}