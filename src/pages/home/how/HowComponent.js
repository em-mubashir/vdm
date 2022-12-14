import React from "react";
import { Box } from "@mui/material";
function HowComponent({ title, imgSrc, description, width }) {
  return (
    <Box className='flex flex-col w-full p-10 place-content-center gap-4'>
      <img
        src={imgSrc}
        width={width || "20%"}
        height='30%'
        className='place-self-center'
      />
      <span
        className='text-[1.4rem] font-bold 2xl:text-[2rem]'
        style={{ textAlign: "center" }}
      >
        {title}
      </span>
      <span
        className='text-[1.1rem] place-self-center 2xl:text-[1.7rem]'
        style={{ textAlign: "center", width: "80%" }}
      >
        {description}
      </span>
    </Box>
  );
}

export default HowComponent;
