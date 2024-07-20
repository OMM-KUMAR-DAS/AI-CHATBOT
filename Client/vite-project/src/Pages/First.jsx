import React, { useState } from 'react'

import { Box, Typography, Dialog,DialogTitle, DialogContent,DialogActions,TextField,Button } from '@mui/material'

import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

const First = () => {
  

  const [open, setOpen] = React.useState(true);

  
  const navigate= useNavigate();
  

  const handleClose = () => {

    setOpen(false);

  };

  return (

    <Box sx={{backgroundColor:'#171a21',width:'100%',height:'100vh'}}>

       

                            <Dialog
                                open={open}
                                // onClose={handleClose}
                                PaperProps={{
                                  sx:{backgroundColor:'#caf0f8',borderRadius:'30px', boxShadow: '0px 4px 50px 20px rgba(255, 255, 255, 0.5)',
                                    width:'50%',

                                    '@media (max-width: 900px)': {

                                      width:'100%',
                                               
                                     },
                                  },
                                  component: 'form',
                                  onSubmit: (event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries(formData.entries());
                                  
                                    const user = formJson.Name;

                                    if(user.length>5)
                                    {
                                      
                                      toast.success(`Welcome ${user}`,{
                                        position: "bottom-right",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        //closeOnClick: true,
                                        // pauseOnHover: true,
                                        // draggable: true,
                                        // progress: undefined,
                                      }

                                      )

                                      
                                      
                                      handleClose();

                                      navigate('/main')

                                    }
                                    else{
                                        
                                       toast.error("Entered username length should be greater than 5",{
                                        position: "top-right",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        //closeOnClick: true,
                                        //pauseOnHover: true,
                                        //draggable: true,
                                        //progress: undefined,
                                        }
                                       )

                                    }

                                    console.log(user);
                                   
                                  },
                                }}
                        >


                          <DialogTitle>

                            <Typography sx={{width:'50%',marginLeft:'auto',marginRight:'auto',textAlign:'center',  fontWeight:'bold',fontSize:'20px','@media (max-width: 900px)': {

                              width:'100%',
         
                            },

                            }} > 😇 Welcome 😇</Typography>

                          </DialogTitle>

                          <DialogContent>
                            
                                <TextField
                                
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="name"
                                    name="Name"
                                    label="Enter your name"
                                    type="text"
                                    fullWidth
                                    variant="standard"

                                />
                             
                            

                          </DialogContent>


                          <DialogActions>



                               
                                <Button type="submit" color="success" sx={{width:'25%',marginLeft:'auto',borderRadius:'25px'}}>Submit</Button>

                          </DialogActions>

                        </Dialog>





    </Box>
  )
  
}

export default First