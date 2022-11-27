import { Box, TextField, Button } from "@mui/material";
import React from "react";
function Contact() {
  return (
    <Box className='flex flex-col w-full h-full mt-16 p-20'>
      <span className='font-bold text-[54px] text-center w-full p-[1.4rem] sm:text-[1.5rem] sm:p-[10px]'>
        Contact Us
      </span>
      <Box className='grid contactUs sm:w-full p-40'>
        {/* ml-32 */}
        <Box className='w-full h-full grid sm:place-self-center '>
          <img className='sm:hidden p-9' src='/assets/logoBlack.svg' />

          <Box className='grid grid-flow-col grid-auto-2 ml-8 text-[1.3rem] md:text-[1rem] sm:justify-center sm:mt-[20px] '>
            <img
              src='/assets/location.svg'
              className='row-start-1 col-start-1 p-9'
            />
            <Box className='row-start-1 col-start-2 self-center p-9'>
              1980 lorem road usa
            </Box>
            <img
              src='/assets/message.svg'
              className='row-start-2 col-start-1 self-center p-9'
            />
            <Box className='row-start-2 col-start-2 self-center p-9'>
              vdm@email.com
            </Box>
            <img
              src='/assets/phone.svg'
              className='row-start-3 col-start-1 self-center p-9'
            />
            <Box className='row-start-3 col-start-2 self-center p-9'>
              259-634-756
            </Box>

            <Box className='row-start-4 w-full py-[1.5rem] flex flex-row gap-14 col-span-2 p-9'>
              <img src='/assets/instagram.svg' />
              <img src='/assets/twitter.svg' />
              <img src='/assets/facebook.svg' />
            </Box>
          </Box>
        </Box>
        {/* Form Below */}
        <Box className=' w-full h-full flex flex-col'>
          <Box className='w-full h-full grid grid-cols-2 gap-20'>
            <TextField
              id='standard-number'
              label='First Name'
              InputLabelProps={{
                shrink: true,
              }}
              variant='standard'
            />
            <TextField
              id='standard-number'
              label='Last Name'
              InputLabelProps={{
                shrink: true,
              }}
              variant='standard'
            />
            <TextField
              id='standard-number'
              label='Email Address'
              InputLabelProps={{
                shrink: true,
              }}
              variant='standard'
            />
            <TextField
              id='standard-number'
              label='Phone Number'
              InputLabelProps={{
                shrink: true,
              }}
              variant='standard'
            />
            <TextField
              id='standard-number'
              label='Message'
              InputLabelProps={{
                shrink: true,
              }}
              variant='standard'
              className='col-span-2'
            />
          </Box>
          <Button
            variant='contained'
            className='registerButton  w-fit h-fit sm:place-self-center '
            style={{ marginTop: "2rem" }}
            color='secondary'
          >
            <span className='px-6'>Submit</span>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Contact;
