import SyncLoader from 'react-spinners/SyncLoader';
import LoadingOverlay from 'react-loading-overlay';
import React from 'react';

const Loader = ({ children }: any) => {
  return (
    <LoadingOverlay active={true} spinner={<SyncLoader />}>
      {children}
    </LoadingOverlay>
  );
};

export default Loader;
