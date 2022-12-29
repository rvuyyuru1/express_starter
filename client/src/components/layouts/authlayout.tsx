import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useUI } from 'src/context/uicontext';
import { useDetails } from 'src/services/react-query/user';
const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, refetch } = useDetails();
  const router = useRouter();
  const { isAuthorized, setUserDetails, setApploading, authorize, unauthorize } = useUI();
  useEffect(() => {
    setApploading(true);
    if (localStorage.getItem('U_TOKEN')) {
      setApploading(false);
      router.replace('/home');
      authorize();
    } else {
      unauthorize();
      setApploading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthorized) refetch();
  }, [isAuthorized]);

  useEffect(() => {
    setUserDetails(data);
  }, [data]);
  return <>{children}</>;
};

export default AuthLayout;
