import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { withStyles } from "@mui/styles";

const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `0.6rem`,
      },
    },
  },
})(TextField);

function Register() {
  return (
    <Box className="flex flex-col w-full h-full">
      <span className="font-bold text-[54px]  text-center w-full p-[1.4rem] sm:text-[1.5rem] sm:p-[10px]">
        Be The First To Known
      </span>
      <span className="place-self-center font-bold text-[1.3rem] text-center w-[40%]  sm:text-[1.3rem] sm:w-[80%] ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in
        nibh vel sem commodo malesuada ac
      </span>
      <Box className="grid gap-5 mt-10 w-full">
        <Box className="flex justify-items-center gap-x-10 md:gap-y-10 place-self-center md:flex-col sm:w-full md:w-full ">
          <CustomTextField
            id="outlined-password-input "
            className="emailText w-[680px] place-self-center rounded-2xl sm:w-[80%] md:w-[80%] "
            label="Enter Email"
          />
          <Button
            variant="contained"
            className="registerButton h-fit place-self-center"
            color="secondary"
          >
            <span className="px-6">Register</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
