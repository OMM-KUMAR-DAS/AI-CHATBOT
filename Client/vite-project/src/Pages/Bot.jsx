import React, { useEffect, useState,useRef } from 'react';
import { Typography, Button, Box, TextField, IconButton, InputAdornment, Divider, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Lottie from 'lottie-react';
import animationData1 from '../assets/L2rgrOvj19.json';
import animationData2 from '../assets/Animation - 1721590739434.json';

function Bot() {
  let id = "@123omm";

  const [socket, setSocket] = useState(null);

  const [newmessage, setmes] = useState([]);

  const [promptt, setprompt] = useState('');

  const [open, setopen] = useState(false);

  const [textdialog, setdialog] = useState('');

  const endOfMessagesRef = useRef(null)

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');

    newSocket.onopen = () => {
      console.log('Connection established');
      setSocket(newSocket);
    };


    newSocket.onmessage = async (message) => {


      const ans = await JSON.parse(message.data);


      console.log(ans);


      if (ans.type === 'text') {

        setmes(prevMessages => [...prevMessages, { item: ans.mes }]);
      }


    };


  }, []);


  useEffect(() => {

    if (endOfMessagesRef.current) {

      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });

    }

  }, [newmessage]);

  function enterprompt(event) {




    setprompt(event.target.value);



  }

  function deleteresponses() {


    if (newmessage.length !== 0) {


      setmes([]);


    }
    setopen(false);



  }

  function opendialog() {


    

      setdialog('Sure you want to delete all your responses?');

      setopen(true);

  }


  if(!socket)
  {
    

     return(

      <Box sx={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Lottie animationData={animationData2} />
      </Box>
     )


    
  }




  return (
    <Box sx={{ backgroundColor: 'black', width: '100%', minHeight: '100vh', }}>
   
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '10px',
        backgroundColor: 'black',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      
      }}>



        <TextField
          required
          fullWidth
          multiline
          margin="dense"
          type="text"
          value={promptt}
          onChange={enterprompt}
          variant="outlined"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{
            style: {
              borderRadius: '25px',
              backgroundColor: 'black',
              color: 'white',
              boxShadow: '0px 0px 15px 5px rgba(255, 255, 255, 0.7)',
            },
            endAdornment: (

              <InputAdornment position="end">

                <IconButton aria-label="send" disabled={!promptt}>

                  <SendIcon

                    onClick={() => {
                      socket.send(JSON.stringify({
                        userid: id,
                        prompt: promptt
                      }));
                      setprompt('');
                    }}
                    sx={{ color: promptt ? 'green' : 'grey' }}


                  />


                </IconButton>

                
              </InputAdornment>
            )
          }}
          placeholder='Enter the prompt'
        />
      </Box>

    
      <Box sx={{ marginTop: '80px',padding: '10px'}}>
      
       

        
        

       
        {newmessage.length > 0 && (

        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>

          <Lottie
            onClick={opendialog}
            animationData={animationData1}
            style={{ width: '35px', cursor: 'pointer' }}
          />

          </Box>

          <Box sx={{
            width: '85%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '25px',
            border: '3px solid black',
            backgroundColor: '#fdfffc',
            borderRadius: '40px',
            boxShadow: '0px 4px 15px 5px rgba(255, 255, 255, 0.3)',
            padding: '25px',
            '@media (max-width: 600px)': {
              width: '95%',
              padding: '8px',
            },
            boxSizing: 'border-box',
          }}>

             

            <Typography sx={{
              width: '25%',
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              '@media (max-width: 900px)': {
                width: '100%',
              },
            }}>
              😎 Responses 😎
              
            </Typography>


            {newmessage.map((mes, index) => (


              <React.Fragment key={index}>


                <Typography sx={{ color: 'black', marginTop: '15px', marginBottom: '15px' }}>
                  {mes.item}
                </Typography>


                <Divider ref={endOfMessagesRef} sx={{ borderColor: 'gray', marginBottom: '15px' }} />


              </React.Fragment>
            ))}


          </Box>


          </>
        )}

       
        <Dialog


          open={open}
          PaperProps={{
            sx: {
              borderRadius: '25px',
              '@media (max-width: 450px)': {
                width: '100%',
              },
            }
          }}
        >
          <DialogContent>


            <DialogContentText>
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

     


    </Box>
  );
}

export default Bot;
