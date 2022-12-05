import React from "react";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "./SectionSubscribe2";
import SocialsList from "../../components/SocialsList";
import Label from "../../components/Label";
// import Input from "shared/Input/Input";
import Textarea from "../../components/Textarea";
import SectionClientSay from "./SectionClientSay";
import BackgroundSection from "./BackgroundSection";

const info = [
  {
    title: "🗺 ADDRESS",
    desc: "Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter",
  },
  {
    title: "💌 EMAIL",
    desc: "nc.example@example.com",
  },
  {
    title: "☎ PHONE",
    desc: "000-123-456-7890",
  },
];

const ContactUs = ({ className = "" }) => {
  return (
    <div className={`nc-PageContact overflow-hidden `} data-nc-id='PageContact'>
      <Helmet>
        <title>Contact || Booking React Template</title>
      </Helmet>
      <div className='mb-24 mt-48 lg:mb-32'>
        <h2 className='my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Contact
        </h2>
        <div className='container max-w-7xl mx-auto'>
          <div className='flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 '>
            <div className='max-w-sm space-y-8'>
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
                    {item.title}
                  </h3>
                  <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className='uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider'>
                  🌏 SOCIALS
                </h3>
                <SocialsList className='mt-2' />
              </div>
            </div>
            <div>
              <form className='grid grid-cols-1 gap-6' action='#' method='post'>
                <label className='block'>
                  <Label>Full name</Label>
                  <input
                    type='text'
                    placeholder='Example Doe'
                    className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1`}
                  />
                </label>
                <label className='block'>
                  <Label>Email address</Label>

                  <input
                    type='email'
                    placeholder='example@example.com'
                    className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1`}
                  />
                </label>
                <label className='block'>
                  <Label>Message</Label>

                  <Textarea className='mt-1' rows={6} />
                </label>
                <div>
                  <button
                    //   disabled={disabled || loading}
                    className={`nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6 text-neutral-700 dark:text-neutral-200 ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 `}
                    //   onClick={onClick}
                    type='submit'
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <div className='container'>
        <div className='relative py-16'>
          <BackgroundSection />
          <SectionClientSay uniqueClassName='Pagecontact_' />
        </div>
        <SectionSubscribe2 className='py-24 lg:py-32' />
      </div>
    </div>
  );
};

export default ContactUs;
