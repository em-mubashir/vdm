import React from "react";
import { Link } from "react-router-dom";
import SocialsList1 from "./SocialList1";

const widgetMenus = [
  {
    id: "5",
    title: "Getting started",
    menus: [
      { href: "#", label: "Installation" },
      { href: "#", label: "Release Notes" },
      { href: "#", label: "Upgrade Guide" },
      { href: "#", label: "Browser Support" },
      { href: "#", label: "Editor Support" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "#", label: "Design features" },
      { href: "#", label: "Prototyping" },
      { href: "#", label: "Design systems" },
      { href: "#", label: "Pricing" },
      { href: "#", label: "Security" },
    ],
  },
  {
    id: "2",
    title: "Resources",
    menus: [
      { href: "#", label: "Best practices" },
      { href: "#", label: "Support" },
      { href: "#", label: "Developers" },
      { href: "#", label: "Learn design" },
      { href: "#", label: "Releases" },
    ],
  },
];

const Footer = () => {
  const renderWidgetMenuItem = (menu, index) => {
    return (
      <div key={index} className='text-sm'>
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
    <div className=' nc-Footer bg-[#262626] relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700'>
      <div className='container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 '>
        <div className='grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col'>
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
          <div className='col-span-2 flex items-center md:col-span-3'>
            <SocialsList1 className='flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start' />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  );
};

export default Footer;
