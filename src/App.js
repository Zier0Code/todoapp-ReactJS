import './App.css';
import React from 'react'
import { Button, Box, TextField, Card, CardActions, CardContent, Typography, Grid} from '@mui/material'
import { toast } from 'react-toastify'

class App extends React.Component{
  
  state = {
    showForm: false,
    todolist: [],
    todo: {
      title: "",
      description: ''
    },
    todos: [],
    showDoneTasks: false,
    donetodos: []
  }

  // To limit and put conditios on the text field
  handleTitleChange = (e) => {
    if(e.target.value.length <= 30){
      this.setState({
        // ... copy object or array
        todo: {...this.state.todo, title: e.target.value}
        
      })
    }
  }
  
  handleDescriptionChange = (e) => {
    this.setState({
      // ... copy object or array
      todo: {...this.state.todo, description: e.target.value}
    })    
  }

  handleCreateClick = () => {
    if(this.state.todo.title.length === 0 || this.state.todo.description.length === 0){
      toast.error('All Input fields are required!');
    }
    else{

      const d = new Date()
      const todo = {
        id: d.getUTCFullYear().toString() + d.getUTCMonth().toString() + d.getUTCDate().toString() + d.getUTCHours().toString() + d.getUTCMinutes().toString() + d.getUTCSeconds().toString() + d.getUTCMilliseconds().toString(),
        title: this.state.todo.title,
        description: this.state.todo.description,
        isCompleted: false,
      }
      const todos = [...this.state.todos]
      todos.unshift(todo)
      this.setState({
        todos,
        todo: {
          id: null,
          title: '',
          description: ''
        }
      })
      toast.success('Todo has been added!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  toggleShowForm = () => {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  toggleShowComplete = () => {
    this.setState({
      showDoneTasks: !this.state.showDoneTasks
    })
  }

  handleToggleCompleted= id => {
    const todos = [...this.state.todos]
    todos.map(todo => {
      if(todo.id.toString() === id.toString()){
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    })
    this.setState({todos})
  }

  handleDeleteClick = id => {
    const todos = [...this.state.todos]
    this.setState({
      todos: todos.filter(todo => todo.id.toString() !== id.toString())
    })

  }
  


  render(){
    return(   
      <div >
      <Box className='App'>
        <Box style={{textAlign: 'center', marginTop: '5rem',}}>
          <Button onClick={this.toggleShowForm}  variant='contained' color='primary'>
            {this.state.showForm ? "Hide" : "Show"} Form
          </Button>
          {
            this.state.showForm ?
              // Form Create hide/show
                <Box id="Create-form">
                  <Box sx={{p:4}}>
                    <TextField onChange={this.handleTitleChange} value={this.state.todo.title} fullWidth sx={{textAlign: 'center',marginTop:"2rem",}} id="txtfldTitle" label="Title" variant="outlined" />
                  </Box>
                  <Box sx={{p:4}}>
                    <TextField onChange={this.handleDescriptionChange} value={this.state.todo.description} fullWidth variant='outlined' id="txtfldDesc" label="Description" multiline maxRows={6}/>
                  </Box>
                  <Box>
                    <Button onClick={this.handleCreateClick} variant='outlined' color='success' >
                      CREATE
                    </Button>
                  </Box>
                </Box>
              : 
              null
          }
        </Box>
        {
          // TODO LIST
          !this.state.showForm && !this.state.showDoneTasks ?
            <Box sx={{textAlign: 'center',marginTop:"3rem"}}>
              <h3>TODO LIST</h3>
              <Grid container id="todo-list">
                  {
                    this.state.todos.map((todo) => (
                <Grid item key={todo.id} sx={{maxWidth: "300px",p:2}}>
                    <Card sx={{minWidth: 275, m: 2,position: 'relative', paddingBottom: "2rem",marginLeft: 2}}>
                      <CardContent>
                        <Typography  color="textSecondary" gutterBottom>
                          {todo.id}
                        </Typography>
                        <Typography  variant="h5" color="primary">
                          {todo.title}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {todo.description}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{justifyContent: 'space-around',position:'absolute', bottom: 0}}>
                        <Button onClick={() => this.handleDeleteClick(todo.id)}color='error' size="small">DELETE</Button>
                        <Button color='warning' size="small">EDIT</Button>
                        <Button onClick={() => this.handleToggleCompleted(todo.id)} color={todo.isCompleted ? "success" : "secondary"} size="small">
                          {
                            todo.isCompleted ? "Completed" : "Incomplete"
                          }
                        </Button>
                      </CardActions>
                    </Card>
                </Grid>
                    ))  
                  }
              </Grid>
            </Box>
          : null
        }
        <Box>
          <Button onClick={this.toggleShowComplete} variant='contained' color='success' sx={{marginTop:3}}>
           {this.state.showDoneTasks ? "Hide" : "Show"} Completed Task
          </Button>
          {
            this.state.showDoneTasks ?
            <Box sx={{textAlign: 'center',marginTop:"3rem"}}>
              <Grid container id="task-done">          
                <Grid item  sx={{maxWidth: "300px",p:2}}>
                    <Card sx={{minWidth: 275, m: 2,position: 'relative', paddingBottom: "2rem",marginLeft: 2}}>
                      <CardContent>
                        <Typography  color="textSecondary" gutterBottom>
                          Date
                        </Typography>
                        <Typography  variant="h5" color="primary">
                          Title
                        </Typography>
                      </CardContent>
                      <CardActions sx={{position:'absolute', bottom: 0}}>
                        <Button variant="contained" color='secondary' size="small" sx={{left: 155}}>
                          Completed
                        </Button>
                      </CardActions>
                    </Card>
                </Grid>
              </Grid>
          </Box>
            : 
            null
          }
          

        </Box>
      </Box>
      </div>
    )
  }

}
export default App;
