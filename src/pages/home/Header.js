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
    <div className='home-container'>
      <Typography className='centered-text-img flex flex-col'>
        <span className=' text-[100px] whitespace-nowrap md:text-[2.5rem] xs:text-[1.3rem] '>
          Income producing personnel available 24/7
        </span>
        <span className=' text-[54px] whitespace-wrap md:text-[1.4rem] xs:text-[0.9rem] '>
          Finance Managers, Business Managers, Sales People, Service Writers,
          and many more!
        </span>
      </Typography>
      <img src='/assets/car.png' className='object-contain' />
    </div>
  );
}

export default Header;
