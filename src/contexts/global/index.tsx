import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { getInitialState, GlobalDispatchAction, GlobalState, reducer } from './reducer';

// CONTEXT
export type GlobalContextProps = {
  state: GlobalState,
  dispatch: React.Dispatch<GlobalDispatchAction>,
};
export const GlobalContext = createContext<GlobalContextProps | null>(null);
GlobalContext.displayName = 'GlobalContext';

// HELPER HOOK
export function useGlobalContext() {
  const ctx = useContext(GlobalContext);
  if (!ctx) {
    throw new Error('GlobalContext is null');
  }
  return ctx;
}

// PROVIDER
type GlobalContextProviderProps = {
  children: React.ReactNode,
};
export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    try {
      window.localStorage.setItem('builds', btoa(JSON.stringify(state.builds)));
      window.sessionStorage.setItem('active-build', state.activeBuildIndex.toString());
    } catch (e) {
      console.error(e);
    }
  }, [state]);

  const ctxValue = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state]);

  return (
    <GlobalContext.Provider value={ctxValue}>
      {children}
    </GlobalContext.Provider>
  );
};
