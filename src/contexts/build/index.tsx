import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { BuildDispatchAction, getInitialState, reducer } from './reducer';
import { BuildState } from './types';

// CONTEXT
export type BuildContextProps = {
  state: BuildState,
  dispatch: React.Dispatch<BuildDispatchAction>,
};
export const BuildContext = createContext<BuildContextProps | null>(null);
BuildContext.displayName = 'BuildContext';


// HELPER HOOK
export function useBuildContext() {
  const ctx = useContext(BuildContext);
  if (!ctx) {
    throw new Error('BuildContext is null');
  }
  return ctx;
}


// PROVIDER
type BuildContextProviderProps = {
  children: React.ReactNode,
};
export const BuildContextProvider = ({ children }: BuildContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const ctxValue = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state, dispatch]);

  return (
    <BuildContext.Provider value={ctxValue}>
      {children}
    </BuildContext.Provider>
  );
};
