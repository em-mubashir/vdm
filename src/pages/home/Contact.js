import { Box, TextField, Button } from "@mui/material";
import React from "react";
function Contact() {
  return (
    <Box className='flex flex-col w-full h-full p-12 xs:p-0'>
      <span className='text-[34px] my-14 text-center w-full px-[25rem] xs:text-[1.5rem] xs:px-0 md:text-[34px] md:px-[25rem]'>
        {/* sm:p-[10px] */}
        Schedule your appointment below to discuss getting your Dealership
        signed up for Virtual Dealer Management
      </span>
      <Box className=' sm:w-full sm:p-0 p-40 xs:p-0 md:px-60'>
        {/* ml-32 */}
        {/* <Box className='w-full h-full grid sm:place-self-center sm:pb-20'>
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
        </Box> */}
        {/* Form Below */}
        <Box className=' w-full h-full flex flex-col px-64 xs:px-10 '>
          <Box className='w-full h-full grid grid-cols-2 gap-12'>
            <TextField
              id='standard-number'
              variant='outlined'
              label='First Name'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id='standard-number'
              label='Last Name'
              InputLabelProps={{
                shrink: true,
              }}
              variant='outlined'
            />
            <TextField
              id='standard-number'
              label='Email Address'
              InputLabelProps={{
                shrink: true,
              }}
              variant='outlined'
            />
            <TextField
              id='standard-number'
              label='Phone Number'
              InputLabelProps={{
                shrink: true,
              }}
              variant='outlined'
            />
            <TextField
              id='standard-number'
              label='Message'
              InputLabelProps={{
                shrink: true,
              }}
              minRows={6}
              multiline={true}
              variant='outlined'
              className='col-span-2'
            />
          </Box>
          <Button
            variant='contained'
            className='registerButton  w-fit h-fit xs:place-self-center '
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
