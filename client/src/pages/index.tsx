import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '../components/common/button';
import HomeHeader from '../components/headers/homeheader';
import Seo from '../components/SEO/seo';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Seo path="/" title="A To-Do List to Organise Your Work and Life" />
      <HomeHeader
        menulist={[
          {
            title: 'Features',
            link: '/',
          },
          {
            title: 'Templates',
            link: '/',
          },
          {
            title: 'For Teams',
            link: '/',
          },
          {
            title: 'Pricing',
            link: '/',
          },
        ]}
      />
      <main>
        <section>
          <div className="flex items-center justify-between py-10 px-4 flex-col">
            <h1 className="font-extrabold text-coolGray-800 text-2xl sm:text-5xl my-4 text-center leading-18 tracking-wide capitalize">
              Organize your
              <br />
              work and life, finally.
            </h1>
            <Button
              onClick={() => {
                router.push('/auth/signup');
              }}
              mode="fill"
              className="mx-3"
            >
              Start for Free
            </Button>
            <h2 className="my-2 sm:my-4 mx-6 font-semibold text-xs sm:font-semibold sm:text-md text-coolGray-600 text-center">
              Become focused, organized, and calm with Todoist.
              <br />
              The world\'s #1 task manager and to-do list app.
            </h2>
          </div>
          <div className="flex">
            <Image src="/assets/bg-left.webp" layout="intrinsic" width={500} height={900} />
            <Image src="/assets/illustration.avif" width={1500} height={900} />
            <Image src="/assets/bg-left.webp" layout="intrinsic" width={500} height={900} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
