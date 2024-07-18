// import { useEffect, useState } from 'react';

// import './App.css';

// function Bot() {

//   const [socket, setSocket] = useState(null);

//   useEffect(() => {

//     if (!socket)
      
//       {

//       const newSocket = new WebSocket('ws://localhost:8080');

//       newSocket.onopen = () => {

//         console.log('Connection established');

//       };

//       newSocket.onmessage = (message) => {

//         console.log('Message received:', message.data);

//       };

//       setSocket(newSocket);

//     }

   
//   }, [socket]); 

//   return (
//     <>

//       hi there

//     </>
//   );
// }

// export default Bot;
