import React from 'react';

import { useEffect, useState } from 'react';


import { Typography,  Button,Box,TextField,IconButton,InputAdornment,Divider,CircularProgress,Dialog,DialogActions,DialogContent,DialogContentText} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import DeleteIcon from '@mui/icons-material/Delete';

// import Lottie from 'react-lottie';

// import animationData1 from '../assets/Animation - 1721462208819.json';





function Bot() {

    
  let id="@123omm"

  //console.log(animationData1)

  const [socket, setSocket] = useState(null);

  const[newmessage,setmes]= useState([]);

  const[promptt,setprompt]= useState('');

  const[open,setopen]= useState(false)

  const[textdialog,setdialog]= useState('')

  

  

  useEffect(() => {

    

      const newSocket = new WebSocket('ws://localhost:8080');

      newSocket.onopen = () => {

        console.log('Connection established');

        setSocket(newSocket);

      };

      newSocket.onmessage = (message) => {

        console.log( message.data);
        
        setmes(prevMessages => [...prevMessages, { item: message.data}]);
        
        
        // setcount(1)

      };

     


  }, []); 

  console.log(newmessage)


  if(!socket)

  {
    return(

    <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',marginTop:'300px' }}>
      <CircularProgress />
    </Box>

    )

  }

  function enterprompt(event)
  {
        setprompt(event.target.value)
  }

  function deleteresponses()

  {
         if(newmessage.length!=0)
         {
           

            // window.alert('No responses to delete');
            setmes([]);

         }
        setopen(false)
        
  }

  function opendialog()
  {

     if(newmessage.length>0)
     {
          setdialog('Sure you want to delete all your responses?')
     }
     else{
          
          setdialog(' No responses to delete ')
     }
     setopen(true)
  }


  
   

  return (

   <Box sx={{backgroundColor:'black',width:'100%',minHeight:'100vh'}}>
                      
                        <Box sx={{width:'100%',display:'flex',justifyContent:'center',marginBottom:'50px',alignItems:'center'}}>

                                    <TextField
                                        
                                        required
                                        fullWidth
                                        multiline
                                        margin="dense"
                                        type="text"
                                        value={promptt}
                                        onChange={enterprompt}
                                        variant="outlined"
                                        InputLabelProps={{ style: { color: 'white'} }}
                                        InputProps={{style:{borderRadius:'25px',backgroundColor:'black',width:'98%', boxShadow: '0px 0px 20px 10px rgba(255, 255, 255, 0.3), 0px 0px 20px 10px rgba(0, 0, 0, 0.3)',color:'white'},
                        
                                        
                                        endAdornment: (


                                            <InputAdornment position="end">

                                                                <IconButton aria-label="send" disabled={!promptt}>

                                                                                                                
                                                                            <SendIcon onClick={()=>{

                                                                            socket.send(JSON.stringify({

                                                                                userid:id,
                                                                                prompt:promptt

                                                                            }))

                                                                           
                                                                            setprompt('')

                                                                            }} sx={{ color: promptt ? 'green' : 'grey' }}/>


                                                                </IconButton>

                                            </InputAdornment>
                                          )
                                    
                                    
                                    }}
                                        placeholder='Enter the prompt'
                                        
                                        
                                        />


                                                <DeleteIcon  onClick={opendialog} sx={{ color: 'darkred', fontSize: '30px'
                                                    
                                                 }} />
                                        

                                       
                        </Box>

                           



                        {  newmessage.length>0 &&
                            
                          <Box sx={{width: '85%',marginLeft:'auto',marginRight:'auto',marginTop:'25px',border:'3px solid black',backgroundColor:'#fdfffc',borderRadius:'40px',boxShadow: '0px 4px 15px 5px rgba(255, 255, 255, 0.3)',padding:'25px',
                            '@media (max-width: 600px)': {
                                                      width:'95%',
                                                      padding: '8px',
                                                    },

                            }}>

                              
                           
                                   

                                    <Typography sx={{width:'25%',marginLeft:'auto',marginRight:'auto',  

                                    textAlign:'center',   fontSize:'20px',fontWeight:'bold',

                                     '@media (max-width: 900px)': {

                                            width:'100%',
                                                     
                                      },

                                    }}>
                                      
                                      
                                      😎 Responses 😎
                                      
                                    </Typography>

                                  

                             

                            {newmessage.map((mes, index) => (
                                
                                  
                                  
                                  
                                  
                                <>
                                   
                                                                  
                                    <Typography key={index} sx={{color: 'black',marginTop:'15px',marginBottom:'15px'
                                    }}>


                                         {mes.item}


                                    </Typography>

                                    <Divider sx={{ borderColor: 'gray', marginBottom: '15px' }} />


                                </> 

                                
                               
                                
                               
                            
                            ))}
                            
                          
                          </Box>

                        }  


                      <Dialog
                            open={open}
                            PaperProps={{
                              sx:{
                                borderRadius:'25px',
                                '@media (max-width: 450px)': {

                                  width:'100%',
                                           
                                 },
                              }
                            }}

                           
                          >




                          

                          <DialogContent>

                            <DialogContentText >

                                {textdialog}

                            </DialogContentText>

                          </DialogContent>


                          <DialogActions>

                           
                            <Button onClick={deleteresponses} autoFocus>
                              Ok
                            </Button>

                          </DialogActions>

                      </Dialog> 


                       
   </Box>

  );
}

export default Bot;
