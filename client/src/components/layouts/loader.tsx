import SyncLoader from 'react-spinners/SyncLoader';
import LoadingOverlay from 'react-loading-overlay';
import React from 'react';
import { useUI } from 'src/context/uicontext';

const Loader = ({ children }: any) => {
  const { apploading } = useUI();
  return (
    <LoadingOverlay className="h-screen w-screen" active={apploading} spinner={<SyncLoader />}>
      {children}
    </LoadingOverlay>
  );
};

export default Loader;
