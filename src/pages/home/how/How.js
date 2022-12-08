import { Box, Typography } from "@mui/material";
import React from "react";
import HowComponent from "./HowComponent";

function How() {
  return (
    <div className='flex flex-col img-text-div mt-[4rem]'>
      <p className='lg:text-[3rem] text-center w-[100%] font-bold pt-[5rem] text-[1.5rem]'>
        How Does It Work
      </p>
      <Box className='grid grid-cols-3 w-full pb-40 xs:grid-cols-1 md:grid-cols-3'>
        <HowComponent
          imgSrc={"/assets/Group 238080.svg"}
          title={"Customer Contact Seller"}
          description={
            "The Dealership Representative logs into our app. The Representative inputs basic information"
          }
        />
        <div className='mt-[6rem] w-full'>
          <HowComponent
            width={"17%"}
            imgSrc={"/assets/Vector.svg"}
            title={"Video Conference Between Customer And Presenter"}
            description={
              "Once complete, the app will connect the Representative and the Presenter to begin discussing the deal. Then the Representative introduces the customer to the Presenter and they go through a menu presentation"
            }
          />
        </div>

        <HowComponent
          imgSrc={"/assets/Group 238082.svg"}
          title={"Close The Deal"}
          description={
            "The Representative then prints the paperwork with the products that were sold, then the video conference is completed."
          }
        />
      </Box>
    </div>
  );
}

export default How;
