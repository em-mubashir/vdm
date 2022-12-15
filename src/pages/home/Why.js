import { Box, Typography } from "@mui/material";
import React from "react";

function Why() {
  return (
    <div className='flex flex-col'>
      <p className='text-[50px] text-center w-full font-bold p-[1.4rem] md:text-[3rem] md:p-[40px] xs:text-black-400 2xl:p-[80px]'>
        Why Choose Us
      </p>
      <Box className='grid grid-cols-2 w-full md:p-12 xs:p-8 gap-x-10 gap-y-20 xs:grid-cols-1 xs:order-last md:grid-cols-2'>
        {/* md:grid-cols-1 */}
        <Box className='place-self-center md:w-2/3 md:text-[1rem]'>
          <img src='/assets/manager-selling.png' />
        </Box>
        <Box className='md:pr-24 md:w-[80%] xs:w-[100%] text-[1.6rem] font-thin	place-self-center md:w-full md:text-[1.6rem] 2xl:text-[2.5rem] xs:text-[1.3rem] xs:pr-0'>
          Using our platform connects you with the best of the best in the
          industry. Never be left without personnel due to sudden increases in
          business, employment vacancies, employee sickness, employee family
          issues, or whatever the reason.
        </Box>
      </Box>
      <Box className='md:grid grid-cols-2 w-full md:p-12 xs:p-8 gap-x-10 gap-y-20 xs:grid-cols-1 xs:order-last md:grid-cols-2 xs:flex-col-reverse xs:flex'>
        <Box className='md:pl-24 md:w-[80%] xs:w-[100%] text-[1.6rem] font-thin	place-self-center md:w-full md:text-[1.6rem] 2xl:text-[2.5rem] xs:text-[1.3rem] xs:pr-0'>
          {/* md:row-start-4 */}
          Our presentations, from beginning to end, are recorded to ensure 100%
          compliance. These videos are reviewed by our team, and also provided
          to the Dealership's appointed personnel for review and storage. This
          allows us to make sure every delivery is transparent, ethical, and
          follows the steps and information demanded from our clients.
        </Box>
        <Box className='place-self-center md:w-2/3 md:text-[1rem]'>
          <img src='/assets/salesman.png' />
        </Box>
      </Box>
      <Box className='grid grid-cols-2 w-full md:p-12 xs:p-8 gap-x-10 gap-y-20 xs:grid-cols-1 xs:order-last md:grid-cols-2'>
        <Box className='place-self-center md:w-2/3 md:text-[1rem]'>
          <img src='/assets/blockimg1.jpeg' width='100%' />
        </Box>
        <Box className='md:pr-24 md:w-[80%] xs:w-[100%] text-[1.6rem] font-thin place-self-center md:w-full md:text-[1.6rem] 2xl:text-[2.5rem] xs:text-[1.3rem] xs:pr-0'>
          Get linked to top rated professionals that will present the products
          that your Dealership wants to be presented, nothing more, nothing
          less, every time. ESCs, CL & AH, GAP, alarms, etc, whatever products
          you want sold are the ones we will present. We will not mark up rate
          unless specifically directed to from the Owner or General Manager. We
          get paid for performance. We don't get paid to show up.
        </Box>
      </Box>
      <Box className='md:grid grid-cols-2 w-full md:p-12 xs:p-8 gap-x-10 gap-y-20 xs:grid-cols-1 xs:order-last md:grid-cols-2 xs:flex-col-reverse xs:flex'>
        <Box className='md:pl-24 md:w-[80%] xs:w-[100%] text-[1.6rem] font-thin place-self-center md:w-full md:text-[1.6rem] 2xl:text-[2.5rem] xs:text-[1.3rem] xs:pr-0'>
          {/* md:row-start-4 */}
          No customer sensitive information is uploaded and/or disclosed to us.
          We have your team input customer name, what they are buying, terms
          agreed upon, and our agents will take it from there. Any tablet,
          laptop, or desktop with a microphone and camera can be used to perform
          the presentation.
        </Box>
        <Box className='place-self-center md:w-2/3 md:text-[1rem]'>
          <img src='/assets/blockimg2.jpeg' width='100%' />
        </Box>
      </Box>
    </div>
  );
}

export default Why;
