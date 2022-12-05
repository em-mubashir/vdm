import React from "react";
// import facebookSvg from `${process.env.PUBLIC_URL }/assets/Facebook.svg`;
// import twitterSvg from "images/Twitter.svg";
// import googleSvg from "images/google.svg";
import Header from "../home/Header";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: `${process.env.PUBLIC_URL}/assets/Facebook.svg`,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: `${process.env.PUBLIC_URL}/assets/twitter.svg`,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: `${process.env.PUBLIC_URL}/assets/google.svg`,
  },
];

const Login = ({ className = "" }) => {
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id='PageLogin'>
      <Helmet>
        <title>Login || Booking React Template</title>
      </Helmet>
      <div className='container mb-24 mt-48 lg:mb-32'>
        <h2 className='my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Login
        </h2>
        <div className='max-w-md mx-auto space-y-6'>
          <div className='grid gap-3'>
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className='nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]'
              >
                <img
                  className='flex-shrink-0'
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className='flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm'>
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className='relative text-center'>
            <span className='relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900'>
              OR
            </span>
            <div className='absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800'></div>
          </div>
          {/* FORM */}
          <form className='grid grid-cols-1 gap-6' action='#' method='post'>
            <label className='block'>
              <span className='text-neutral-800 dark:text-neutral-200'>
                Email address
              </span>
              <input
                type='email'
                placeholder='example@example.com'
                className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1`}
              />
            </label>
            <label className='block'>
              <span className='flex justify-between items-center text-neutral-800 dark:text-neutral-200'>
                Password
                <Link to='/forgot-pass' className='text-sm'>
                  Forgot password?
                </Link>
              </span>
              <input
                type='password'
                className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1`}
              />
            </label>
            <button
              //   disabled={disabled || loading}
              className={`nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 text-neutral-700 dark:text-neutral-200 ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 `}
              //   onClick={onClick}
              type='submit'
            >
              Continue
            </button>
          </form>

          {/* ==== */}
          <span className='block text-center text-neutral-700 dark:text-neutral-300'>
            New user? {` `}
            <Link to='/signup'>Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
