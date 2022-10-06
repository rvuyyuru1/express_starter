import { useRouter } from 'next/router';
import React from 'react';
import Button from '../common/button';
import Link from '../common/link';
import Logo from '../common/logo';

const HomeHeader = ({ menulist }: { menulist?: Array<any> }) => {
  const router = useRouter();
  return (
    <header className="h-16 p-4 shadow-sm">
      <nav className="w-full items-center flex justify-between mx-0 my-auto relative top-0 left-0 md:justify-center">
        {/* logo */}
        <Logo className="mx-0 my-auto" />
        {/* menu */}
        <div className="items-center justify-between hidden md:flex mx-10">
          <ul className="flex items-center justify-between">
            {menulist?.map((ele, index) => {
              return (
                <Link href={ele.link} className="hover:bg-gray-100 hover:rounded-md">
                  <li className="px-4 py-2 text-center text-coolGray-600 text-md font-medium" key={index}>
                    {ele.title}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        {/* login and signup */}
        <div className="hidden md:flex items-center justify-between mx-8">
          <Button
            mode="text"
            className="mx-3"
            onClick={() => {
              router.push('/auth/login');
            }}
          >
            Login
          </Button>
          {/*  */}
          <Button
            onClick={() => {
              router.push('/auth/signup');
            }}
            mode="fill"
            className="mx-3"
          >
            Start for Free
          </Button>
        </div>
        <div className="flex md:hidden items-center justify-between">
          <Button
            mode="text"
            className="mx-1"
            onClick={() => {
              router.push('/auth/login');
            }}
          >
            Login
          </Button>
          <Button
            mode="fill"
            className="mx-1"
            onClick={() => {
              router.push('/auth/signup');
            }}
          >
            Sign up
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;
