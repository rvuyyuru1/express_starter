import React from 'react';
export interface State {
  isAuthorized: boolean;
  apploading: boolean;
  userDetails: any;
}
const initialState: State = {
  isAuthorized: false,
  apploading: false,
  userDetails: undefined,
};

interface UIProviderState extends State {
  authorize: () => void;
  unauthorize: () => void;
  setApploading: (apploading: boolean) => void;
  setUserDetails: (userDetails: any) => void;
}
type Action =
  | {
      type: 'SET_AUTHORIZED';
    }
  | {
      type: 'SET_UNAUTHORIZED';
    }
  | {
      type: 'SET_APPLOADING';
      apploading: boolean;
    }
  | {
      type: 'SET_USERDETAILS';
      userDetails: any;
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
    case 'SET_APPLOADING': {
      return {
        ...state,
        apploading: action.apploading,
      };
    }
    case 'SET_USERDETAILS': {
      return {
        ...state,
        userDetails: action.userDetails,
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
  const setApploading = (apploading: boolean) => dispatch({ type: 'SET_APPLOADING', apploading });
  const setUserDetails = (userDetails: any) =>
    dispatch({
      type: 'SET_USERDETAILS',
      userDetails,
    });
  const value = React.useMemo(
    () => ({
      ...state,
      authorize,
      unauthorize,
      setApploading,
      setUserDetails,
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

export const ManagedUIContext: React.FC<{ children: React.ReactNode }> = ({ children }) => <UIProvider>{children}</UIProvider>;
