import React,{ useState, useEffect } from 'react';
import SimpleAppBar from "./components/appbar"
import {Button, Container, Drawer, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import axios from 'axios'
import { Delete } from '@mui/icons-material';


export default function AppHome(){
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState({
    name:'',
    description:''
})

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  const fetchTasks = () => {
    fetch('http://localhost:8081/')
      .then((response) => response.json())
      .then((jsonData) => {
        setTasks(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  const submit = (event) =>{
        setTimeout(function(){
          window.location.reload();
        },200)
        axios.post('http://localhost:8081/submit',data)
        .then(()=>{
          fetchTasks();
        }) 
        .catch(err => console.log(err))
};

const handledelete = (id) =>{
      setTimeout(function(){
        window.location.reload();
      },200)
      axios.post('http://localhost:8081/delete',{id})
      .then(() => {
        fetch('http:/localhost:8081/')
          .then((response) => response.json())
          .then((jsonData) => {
            setTasks(jsonData)
          })
          .catch((error) => {
            console.error('Error fetchind data:', error);
          });
      })
      .catch(err => console.log(err));
};

useEffect(() => {
  fetch('http://localhost:8081/')
    fetchTasks();
}, []);


  return(
    <div>
      <SimpleAppBar />
      <p></p>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{minWidth:650}} aria-label="simple table">
          <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align='right'>TASK NAME</TableCell>
                <TableCell align='right'>TASK DESCRIPTION</TableCell>
                <TableCell align='right'>DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {tasks.map((task) => (
                <TableRow
                    key={task.id}
                    sx={{ '&:last-child td, &:last-child th': {border: 0}}}
                    >
                      <TableCell component="th" scope="row">
                        {task.id}
                      </TableCell>
                      <TableCell align="right">{task.taks_title}</TableCell>
                      <TableCell align="right">{task.tasks_descriptions}</TableCell>
                      <TableCell align="right">
                      <Button onClick={()=>handledelete(task.id)} style={{paddingLeft:'95%', 
                    fontSize:'20px',
                    }}>
                    <Delete /></Button></TableCell>                        
                    </TableRow>
              ))}
          </TableBody>
        </Table>
        </TableContainer>
          <Button onClick={toggleDrawer}>
            <AddTaskIcon  elevation={3} style = {{fontSize:'60px', paddingTop: '10%',paddingLeft:'0' }} ></AddTaskIcon>
            </Button>
            <Drawer 
              anchor='bottom'
              open={isDrawerOpen}
              onClose={toggleDrawer}
            > 
            <Container>
                <form>
                  <h3>Create new Task</h3>
                  <TextField placeholder='task name'
                   variant='outlined'
                   name='name'
                   onChange={e => setData({...data, name: e.target.value})}
                   ></TextField>
                  <br />
                  <br />
                  <TextField
                    placeholder='task description'
                    multiline
                    rows={4}
                    name='description'
                    onChange={e => setData({...data, description: e.target.value})}
                  />
                  <br />
                  <br />
                  <Button variant='contained' onClick={submit}>
                    submit
                  </Button>
                  <br />
                  <br />
                </form>
            </Container>
            </Drawer>
      </div>
  )
}