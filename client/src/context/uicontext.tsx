import React from 'react';
export interface State {
  isAuthorized: boolean;
  apploading: boolean;
}
const initialState: State = {
  isAuthorized: false,
  apploading: false,
};

interface UIProviderState extends State {
  authorize: () => void;
  unauthorize: () => void;
}
type Action =
  | {
      type: 'SET_AUTHORIZED';
    }
  | {
      type: 'SET_UNAUTHORIZED';
    };

const uiReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_AUTHORIZED': {
      return {
        ...state,
        isAuthorized: true,
      };
    }
    case 'SET_UNAUTHORIZED': {
      return {
        ...initialState,
      };
    }
  }
};

export const UIProvider = (props: any) => {
  const savedinitialState: any = localStorage.getItem('savedinitialState');
  const [state, dispatch] = React.useReducer(uiReducer, !!savedinitialState ? JSON.parse(savedinitialState) : initialState);
  React.useEffect(() => {
    localStorage.setItem('savedinitialState', JSON.stringify(state));
  }, [state]);
  const authorize = () => dispatch({ type: 'SET_AUTHORIZED' });
  const unauthorize = () => dispatch({ type: 'SET_UNAUTHORIZED' });
  const value = React.useMemo(
    () => ({
      ...state,
      authorize,
      unauthorize,
    }),
    [state],
  );
  return <UIContext.Provider value={value} {...props} />;
};

export const UIContext = React.createContext<UIProviderState | any>(initialState);
UIContext.displayName = 'UIContext';
export const useUI = () => {
  const context = React.useContext<UIProviderState>(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext = ({ children }: any) => <UIProvider>{children}</UIProvider>;
