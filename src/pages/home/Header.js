import { Typography } from "@mui/material";
import React from "react";

// .centered {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }

function Header() {
  return (
    <div className='home-container xs:mt-[5rem]'>
      <Typography className='centered-text-img flex flex-col'>
        <span className='  whitespace-nowrap md:text-[2.5rem] xs:text-[1rem] lg:text-[3.5rem] '>
          Income producing personnel available 24/7
        </span>
        <span className=' text-[54px] whitespace-wrap md:text-[1.4rem] xs:text-[0.7rem] lg:text-[2rem] '>
          Finance Managers, Business Managers, Sales People, Service Writers,
          and many more!
        </span>
      </Typography>
      <img
        src='/assets/car-dealer.png'
        className='object-contain'
        width='100%'
      />
    </div>
  );
}

export default Header;
