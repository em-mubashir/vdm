import React, { useState } from "react";
// import facebookSvg from `${process.env.PUBLIC_URL }/assets/Facebook.svg`;
// import twitterSvg from "images/Twitter.svg";
// import googleSvg from "images/google.svg";
import { ThreeDots } from "react-loader-spinner";
import Axios from "axios";
import Header from "../home/Header";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
const sign = require("jwt-encode");

const { REACT_APP_BACKEND_SERVER_URL } = process.env;

const Login = ({ className = "" }) => {
  const [authError, setAuthError] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = (email, pass) => {
    setAuthError(null);
    try {
      Axios.post(`${REACT_APP_BACKEND_SERVER_URL}/Users/Authenticate`, {
        p_user_name: email,
        p_user_pass: pass,
      }).then((response) => {
        setLoading(false);
        const jwt = sign(response, "vdm-secrete-private");
        console.log("tokennnnnnnn jwt", jwt);
        window.location.href = `http://localhost:3000/login?token=${jwt}`;
        if (!response.data.success) {
          setError(response.data.message);
        } else console.log("response", response, response.status);
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
    // signIn?.(passcode)
    //   .then(() => {
    //     history.replace(location?.state?.from || { pathname: "/" });
    //   })
    //   .catch((err) => setAuthError(err));
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    login(e.target[0].value, e.target[1].value);
  };
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id='PageLogin'>
      <Helmet>
        <title>Login || VDM</title>
      </Helmet>
      <div className='container mb-24 mt-48 lg:mb-32'>
        <h2 className='my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Login
        </h2>
        <div className='max-w-md mx-auto space-y-6'>
          {/* OR */}
          <div className='relative text-center'>
            <span className='relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900'>
              OR
            </span>
            <div className='absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800'></div>
          </div>
          {/* FORM */}
          <form className='grid grid-cols-1 gap-6' onSubmit={handleSubmit}>
            <label className='block'>
              <span className='text-neutral-800 dark:text-neutral-200'>
                Username \ Email
              </span>
              <input
                type='text'
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
            <span className='text-red-700'>{error}</span>
            {loading ? (
              <div className='flex items-center justify-center'>
                <ThreeDots
                  height='80'
                  width='80'
                  radius='9'
                  color='black'
                  ariaLabel='three-dots-loading'
                  wrapperStyle={{}}
                  wrapperClassName=''
                  visible={true}
                />
              </div>
            ) : (
              <button
                //   disabled={disabled || loading}
                className={`nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 text-neutral-700 dark:text-neutral-200 ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 `}
                //   onClick={onClick}
                type='submit'
              >
                Continue
              </button>
            )}
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
