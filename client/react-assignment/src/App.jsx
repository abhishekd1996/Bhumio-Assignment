import "./App.css";
import React , { useState } from "react";
import axios from 'axios';
import Enhance from './Enhance';
import { Box, Typography ,Button, Grid} from "@mui/material";



function App() {
  const [image, setImage] = useState("");
  const [imageFile, setFile] = useState();
  const getImage = (e) => {
    setFile(e.target.files[0]);
  }
  const uploadImage = (e) => {
    e.preventDefault()  //prevent browser to refresh
    const formData = new FormData();  //create new form object
    formData.append("myImage", imageFile);//add image to form object
    axios({
      method: "post",
      url: "http://localhost:3000/upload-image",
      data: formData,  //send image to server
    })
     .then((response) => {
      const { data } = response; //return image url of uploaded img
      setImage(data.url); //set url to image variable
    })
     .catch((err) => {
      console.log(err);
    });
  }
  

  return (
    <div style ={{backgroundColor:"#FEFCFF"}}>
    <Grid container direction="column" alignItems="center" spacing={2}>
     <Grid item>
       <Typography>Welcome to Image AI Editor</Typography>
       </Grid>
  
      <Grid item>
     <form onSubmit={uploadImage}>
      <input type="file" onChange={getImage}></input>
      <Button variant={"outlined"} type="submit">upload</Button>
      </form>
      </Grid>
    
     
     <Grid item>
      {imageFile && <Enhance data={image} uploadedimage ={URL.createObjectURL(imageFile)}>Enhance </Enhance>}
      </Grid>
    </Grid>
    </div>
    );
  }
  export default App;