import React from "react";
import { Link } from "react-router-dom";
import SocialsList1 from "./SocialList1";

const widgetMenus = [
  {
    id: "5",
    title: "VDM",
    menus: [
      { href: "/", label: "Home" },
      { href: "/contact-us", label: "Contact Us" },
      { href: "/login", label: "Login" },
      { href: "/signup", label: "Signup" },
    ],
  },
];

const info = [
  {
    icon: `${process.env.PUBLIC_URL}/assets/icon1.svg`,
    desc: "514 Maple St, Ramona, Ca., 92065",
  },
  {
    icon: `${process.env.PUBLIC_URL}/assets/icon2.svg`,
    desc: "chris.pozek@veteransrideshare.com",
  },
  {
    icon: `${process.env.PUBLIC_URL}/assets/icon3.svg`,
    desc: "(888)270-4324",
  },
];

const Footer = () => {
  const renderWidgetMenuItem = (menu, index) => {
    return (
      <div key={index} className='text-sm pl-40 xs:pl-0'>
        <h2 className='font-semibold text-white dark:text-white'>
          {menu.title}
        </h2>
        <ul className='mt-5 space-y-4'>
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className='text-white dark:text-white hover:text-black dark:hover:text-white'
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className=' nc-Footer bg-[#262626] relative pb-24 pt-40  border-t border-black	 dark:border-black	'>
      <div className='container grid grid-cols-3 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-50 xs:grid-cols-1'>
        <div className='grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col xs:col-span-1'>
          <div className='col-span-2 md:col-span-1'>
            <Link
              to='/'
              className={`ttnc-logo inline-block text-white focus:outline-none focus:ring-0 w-24`}
            >
              <img
                className={`block max-h-12 dark`}
                src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
                alt='Logo'
              />
            </Link>
          </div>
          <div className='col-span-2 flex items-center md:col-span-3 '>
            <SocialsList1 className='flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start' />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
        <div className='max-w-sm space-y-3 gap-5'>
          <h2 className='font-semibold text-white dark:text-white mb-5 '>
            Contact
          </h2>
          {info.map((item, index) => (
            <div key={index} className='flex flex-row m-0'>
              <img src={item.icon} className='mt-1.5' />
              <span className='flex pl-3 block mt-2 text-white dark:text-white-400'>
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
