import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button'

export default function Student() {
    const MainPaperStyle={padding:'50px 20px', width:600, margin:"20px auto"}
    const TextFieldStyle={marginBottom:"10px"}
    const ButtonStyle={marginTop:"15px"}
    const InfoStyle={margin:"10px",padding:"15px",textAlign:"left"}

    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[students,setstudents]=useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const student={name, address}
        fetch("http://localhost:8080/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("New Student added")
        })
    }

    useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setstudents(result);
            console.log(result);
        }
    )
    },[])

  return (
    
    <Container>
        <Paper elevation={3} style={MainPaperStyle}>
            <h1 style={{color: "#88AAFF"}}><u>Add Student</u></h1>      
            <TextField id="outlined-basic" label="Student Name" variant="outlined" style={TextFieldStyle} fullWidth value={name} onChange={(e)=>setName(e.target.value)}/>
            <TextField id="outlined-basic" label="Student Address" variant="outlined" style={TextFieldStyle} fullWidth value={address} onChange={(e)=>setAddress(e.target.value)}/>
            <Button variant="contained" color="error" style={ButtonStyle} onClick={handleClick}>Contained</Button>
        </Paper>
        <h1 style={{color: "#88AAFF"}}><u>Students</u></h1>     
        <Paper elevation={3} style={MainPaperStyle}>
             {students.map(student=>(
                <Paper elevation={6} style={InfoStyle} key={student.id}>
                #{student.id}<br/>
                Name : {student.name}<br/>
                Address : {student.address}
                </Paper>
             ))
             }
        </Paper>
        
    </Container>
  );
}
