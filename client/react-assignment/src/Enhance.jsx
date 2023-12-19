import React , { useState } from 'react';
import axios from 'axios';
import { Button,Typography ,CircularProgress} from '@mui/material';
export const Enhance = (props) => {
const [finalimage, setfinalimage] = useState(null);
const [imagedata, setimagedata] = useState(null);

const removal =()=>{


  axios.post("http://localhost:3000/removal",{ image: props.data } )
  .then((response) => {
      
    const { data } = response;
      //return image url of uploaded img
      const imagedataa = data.data.image;
      setfinalimage(imagedataa);
       //set url to image variable
    })
     .catch((err) => {
      console.log(err);
    });}

const submit =()=>{


axios.post("http://localhost:3000/enhance",{ image: props.data } )
.then((response) => {
    
  const { data } = response;
    //return image url of uploaded img
    const imagedataa = data.data.image;
    setfinalimage(imagedataa);
     //set url to image variable
  })
   .catch((err) => {
    console.log(err);
  });}
  if(finalimage){
    console.log(finalimage);
    axios.get(finalimage, { responseType: 'blob' })
      .then(response => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          setimagedata(base64data);
          
        };
        reader.readAsDataURL(response.data);
      })
      .catch(error => {
        console.error('Error downloading image:', error);
      });
  }
  return (
  <div > 
   {props.uploadedimage && <div style={{display:"flex",justifyContent:"center",fullwidth:"true"}}>
    <Button variant={'outlined'} onClick={submit}  >enhance</Button>
    <Button variant={'outlined'} onClick={removal}  >removal</Button>
    </div>}
    <div style={{display:"flex",justifyContent:"center",fullwidth:"true"}}>
    {props.data && <img style={{width:"150px",height:"150px"}} src = {props.uploadedimage}/>}
    {imagedata&& <img style={{width:"150px",height:"150px"}} src = {imagedata}/>}
    </div>
    </div>
  )
  
}

export default Enhance;