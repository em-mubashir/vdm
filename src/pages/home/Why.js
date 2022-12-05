import { Box, Typography } from "@mui/material";
import React from "react";

function Why() {
  return (
    <div className='flex flex-col'>
      <p className='text-[54px] text-center w-full font-bold p-[1.4rem] md:text-[1.8rem] md:p-[10px] xs:text-red-400'>
        Why Choose Us
      </p>
      <Box className='grid grid-cols-2 w-full img-text-div p-20 gap-x-10 gap-y-20 '>
        {/* md:grid-cols-1 */}
        <Box className='place-self-center md:w-full md:text-[1rem]'>
          <img src='/assets/manager-selling.png' />
        </Box>
        <Box className='p-10 w-[80%] text-[1.3rem] place-self-center md:w-full md:text-[1rem]'>
          Virtual Dealer Management is an innovative platform designed to launch
          automobile dealers into the 21st century by allowing those dealers to
          have income producing, product selling, finance managers available
          24/7.
        </Box>
        <Box className='p-10 w-[80%] text-[1.3rem] place-self-center md:w-full md:text-[1rem] '>
          {/* md:row-start-4 */}
          Our platform allows dealerships to have access to the most talented
          Business Managers in the country, at the touch of a button, while
          adding another layer of security to be 100% compliant to the entire
          sales process. Each one of our presentations are digitally recorded
          and reviewed by our company for compliance guidelines and also shared
          with the Ownership and General Management of the dealership.
        </Box>
        <Box className='place-self-center md:w-full md:text-[1rem]'>
          <img src='/assets/salesman.png' />
        </Box>
      </Box>
    </div>
  );
}

export default Why;
