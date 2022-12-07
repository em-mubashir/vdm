import React from "react";
import NcImage from "../../components/NcImage/NcImage";
import Badge from "../../components/Badge";

const SectionSubscribe2 = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id='SectionSubscribe2'
    >
      <div className='flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5'>
        <h2 className='font-semibold text-4xl'>Join our newsletter 🎉</h2>
        <span className='block mt-5 text-neutral-500 dark:text-neutral-400'>
          Read and share new perspectives on just about any topic. Everyone’s
          welcome.
        </span>
        <ul className='space-y-4 mt-10'>
          <li className='flex items-center space-x-4'>
            <Badge name='01' />
            <span className='font-medium text-neutral-700 dark:text-neutral-300'>
              Get more discount
            </span>
          </li>
          <li className='flex items-center space-x-4'>
            <Badge color='red' name='02' />
            <span className='font-medium text-neutral-700 dark:text-neutral-300'>
              Get premium magazines
            </span>
          </li>
        </ul>
        <form className='mt-10 relative max-w-sm'>
          <input
            required
            type='email'
            placeholder='Enter your email'
            className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1 rounded-full`}
          />
          <button
            className={`ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 w-9 h-9 absolute transform top-1/2 -translate-y-1/2 right-[5px]`}
            type='submit'
          >
            <i className='las la-arrow-right text-xl'></i>
          </button>
        </form>
      </div>
      <div className='flex-grow'>
        <NcImage src={`${process.env.PUBLIC_URL}/assets/Asset 1.svg`} />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
