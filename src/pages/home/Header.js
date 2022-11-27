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
        <span className=' text-[100px] whitespace-nowrap md:text-[2.5rem] sm:text-[1.5rem] '>
          LUXURY & EXCLUSIVE
        </span>
        <span className=' text-[54px] whitespace-nowrap md:text-[1.4rem] sm:text-[0.9rem] '>
          CARS, SERVICES & EXPERIENCE
        </span>
      </Typography>
      <img src='/assets/car.png' className='object-contain' />
    </div>
  );
}

export default Header;
