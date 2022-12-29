import Header from '@components/headers/header';
import Seo from '@components/SEO/seo';
import { NextPage } from 'next';
import React from 'react';

const HomePage: NextPage = () => {
  return (
    <>
      <Seo path="/home" title="Stay updated on your professional world with todolist" />
      <>
        <main>
          <Header />
        </main>
      </>
    </>
  );
};

export default HomePage;
