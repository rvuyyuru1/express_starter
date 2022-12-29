import { NextPage } from 'next';
import React, { useEffect } from 'react';
import Logo from '../../components/common/logo';
import Seo from '../../components/SEO/seo';
import { Formik, Form, ErrorMessage } from 'formik';
import Button from '../../components/common/button';
import Link from '../../components/common/link';
import cn from 'classnames';
import * as Yup from 'yup';
import { useUI } from 'src/context/uicontext';
import { PostApi } from 'src/services/http/_http';
import { APP_ENDPOINTS } from 'src/services/http/APPendpoints';
import { useRouter } from 'next/router';
const Header = () => {
  return (
    <header className="h-16 p-4">
      <nav className="w- 3/4 mx-auto sm:mx-32 relative top-0 left-0">
        <Logo className="mx-0 my-auto" />
      </nav>
    </header>
  );
};
const LoginPage: NextPage = () => {
  const router = useRouter();
  const { setApploading, authorize } = useUI();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('This feild is required!'),
    password: Yup.string().min(3, 'Password must be 3 characters at minimum').required('Password is required!'),
  });
  const handleLogin = (values: any) => {
    setApploading(true);
    PostApi(APP_ENDPOINTS.login, {
      userName: values.email,
      password: values.password,
    })
      .then((res: any) => {
        setApploading(false);
        if (res) {
          localStorage.setItem('U_TOKEN', res.token);
          router.replace('/home');
          authorize();
        }
      })
      .catch((err: any) => {
        console.log(err);
        setApploading(false);
      });
  };
  return (
    <>
      <Seo path="/auth/login" title="Log in to Todolist" defaultTitle="Log in to Todolist" />
      <>
        <Header />
        <main>
          <div className="h-fit sm:h-screen bg-white relative flex flex-col space-y-8 justify-center items-center">
            <div className="bg-white md:shadow-lg shadow-none rounded p-6 w-96">
              <h1 className="text-3xl font-bold leading-normal">Login In</h1>
              <p className="text-sm  text-coolGray-400 leading-normal">Stay updated on your professional world with todolist</p>
              <Formik
                validationSchema={LoginSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                  console.log(values);
                  handleLogin(values);
                }}
                validateOnChange={true}
                validateOnBlur={true}
                validateOnMount={true}
              >
                {({ touched, errors, values, handleChange, handleBlur }) => {
                  return (
                    <>
                      <Form className="space-y-5 mt-5">
                        <input type="text" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Phone or Email" className={cn('form-input px-4 py-3 w-full focus:shadow-md focus:ring-coolGray-400  rounded-sm', touched?.email && errors?.email ? 'border-red-500' : '')} /> {/* error */}
                        <ErrorMessage component="div" name="email" className="text-red-500 text-md font-semibold my-0 " />
                        <input type="password" onChange={handleChange} onBlur={handleBlur} value={values.password} name="password" placeholder="Enter password" className={cn('form-input px-4 py-3 w-full focus:shadow-md focus:ring-coolGray-400  rounded-sm', touched?.password && errors?.password ? 'border-red-500' : '')} /> {/* error */}
                        <ErrorMessage component="div" name="password" className="text-red-500 text-md font-semibold " />
                        <div className="flex justify-end">
                          <a className="font-bold text-primary hover:bg-red-100 hover:underline py-2 px-4 rounded-full" href="#">
                            Forgot password?
                          </a>
                        </div>
                        <Button buttonType="submit">Login now</Button>
                      </Form>
                    </>
                  );
                }}
              </Formik>
            </div>
            <p className="text-center text-sm font-medium">
              New to Todolist?
              <Link className="text-primary font-bold hover:bg-red-100 hover:underline transition duration-200 ease-in-out py-2 px-4 rounded-full" href={'/auth/signup'}>
                Register
              </Link>
            </p>

            <p className="mx-4 text-xs font-normal text-coolGray-500">By continuing, you agree to Todoist's Terms of Service and Privacy Policy.</p>
          </div>
        </main>
      </>
    </>
  );
};

export default LoginPage;
