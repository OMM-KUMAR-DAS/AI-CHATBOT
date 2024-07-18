import React from 'react'

import { Box, Typography } from '@mui/material'

const First = () => {


  return (

    <Box sx={{backgroundColor:'#171a21',width:'100%',height:'100vh'}}>

        <Typography sx={{width:'50%',marginLeft:'auto',marginRight:'auto',textAlign:'center',
            fontSize:'100px',
            color: '#58deb5',
            backgroundImage: '-webkit-linear-gradient(0deg, #58deb5 0%, #95dd1d 50%, #1d81ad 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitTextFillColor: 'transparent',
        }}
        >Enter the Arena</Typography>

    </Box>
  )
  
}

export default First