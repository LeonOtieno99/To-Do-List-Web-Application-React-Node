import React,{ useState, useEffect } from 'react';
import SimpleAppBar from "./components/appbar"
import {Button, Container, Drawer, Grid, Paper, TextField } from "@mui/material";
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
      <Container>
        <Grid container>
          {tasks.map((task) =>(
            <Grid item key={task.id} xs={12} sm={12} md={12}>
              <div class = "grid-item">
                <Paper>
                  <Container>
                  <h2 style={{fontSize: '25px', fontFamily:'inherit'}}>{task.taks_title}<Button onClick={()=>handledelete(task.id)} style={{paddingLeft:'95%', 
                    fontSize:'20px',
                    }}>
                    <Delete /></Button></h2>
                  <p>{task.tasks_descriptions} </p>
                  </Container>
                </Paper>
              </div>
            </Grid>
          ))}  
        </Grid>
          </Container>
      <div className='icon-action'>
            <Paper elevation={6}>
              <Button onClick={toggleDrawer}>
                  <AddTaskIcon  elevation={3} style = {{fontSize:'60px'}}></AddTaskIcon>
              </Button>
            </Paper>
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
    </div>
  )
}