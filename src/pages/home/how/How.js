import { Box, Typography } from "@mui/material";
import React from "react";
import HowComponent from "./HowComponent";

function How() {
  return (
    <div className="flex flex-col">
      <p className="text-[54px] text-center w-[100%] font-bold p-[1.4rem]  sm:text-[1.5rem]">
        How Does It Work
      </p>
      <Box className="grid grid-cols-3 w-full img-text-div p-20 sm:grid-cols-1">
        <HowComponent
          imgSrc={"/assets/customerContactSeller.svg"}
          title={"Customer Contact Seller"}
          description={
            "Name the brand or type of car you are looking for in the search bar. Our app will find you the perfect match."
          }
        />
        <div className="mt-[3rem] w-full">
          <HowComponent
            imgSrc={"/assets/videoConference.svg"}
            title={"Video Conference Between Customer And Presenter"}
            description={
              "Name the brand or type of car you are  looking for in the search bar. Our app will find you the perfect match."
            }
          />
        </div>

        <HowComponent
          imgSrc={"/assets/closeTheDeal.svg"}
          title={"Close The Deal"}
          description={
            "Name the brand or type of car you are looking for in the search bar. Our app will find you the perfect match."
          }
        />
      </Box>
    </div>
  );
}

export default How;
