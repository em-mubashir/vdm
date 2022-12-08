import React from "react";
import { Box, TextField, Button } from "@mui/material";
// import { withStyles } from "@mui/styles";

// const CustomTextField = withStyles({
//   root: {
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderRadius: `0.6rem`,
//       },
//     },
//   },
// })(TextField);

function Register() {
  return (
    <Box className='flex flex-col w-full h-full mb-6 xs:m-5 xs:mb-0 xs:ml-[3.5rem] xs:w-[80%] xs:mb-20 md:mb-6 md:w-full'>
      <div className='flex flex-col relative top-28 bg-white p-20 z-50 rounded border-2 border-gray-100 mx-80 xs:mx-0 xs:top-0 xs:p-10 md:mx-80 md:top-36 md:p-20'>
        <span className='font-bold text-[54px] text-center w-full p-[1.4rem] sm:text-[2.4rem] sm:p-[10px] md:p-[1.4rem]'>
          Let's stay in touch
        </span>
        {/* <span className='place-self-center font-bold text-[1.3rem] text-center w-[40%]  sm:text-[1.3rem] sm:w-[80%] '>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in
        nibh vel sem commodo malesuada ac
      </span> */}
        <Box className='flex items-center place-self-center gap-5 mt-10 w-2/3 '>
          <Box className='flex justify-items-center gap-x-10 md:gap-y-10 place-self-center md:flex-row xs:w-full xs:flex-col xs:gap-y-8 md:w-full '>
            <TextField
              id='standard-number'
              label='Email Address'
              InputLabelProps={{
                shrink: true,
              }}
              variant='outlined'
              fullWidth={true}
            />
            {/* <CustomTextField
              id='outlined-password-input '
              className='emailText w-[680px] place-self-center rounded-2xl sm:w-[80%] md:w-[80%] '
              label='Enter Email'
            /> */}
            <Button
              variant='contained'
              className='registerButton h-fit place-self-center'
              color='secondary'
            >
              <span className='px-6'>Register</span>
            </Button>
          </Box>
        </Box>
      </div>
    </Box>
  );
}

export default Register;
