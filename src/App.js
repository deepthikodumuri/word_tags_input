import React from 'react'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

import { MenuItem, Grid, Input, Paper, Chip } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      database: [
        "Banana",
        "water melon",
        "Apple",
        "Mangos"
      ],
      filtered: [

      ],
      selected: [

      ]
    }
  }
  handleChange = (event) => {
    const input = event.target.value;
    let filtered = []
    if (input.length > 0) {
      filtered = this.state.database.filter(x => x.toLowerCase().includes(input.toLowerCase()));
    }
    this.setState({ filtered, input })
  }
  handleClick = (event) => {
    let { selected, database, filtered } = this.state;
    let item = event.target.innerText;
    if (!selected.includes(item)){
      selected.push(item);
      database.splice(database.map(x => x.toLowerCase()).indexOf(item.toLowerCase()), 1);
      filtered.splice(filtered.map(x => x.toLowerCase()).indexOf(item.toLowerCase()), 1);
      this.setState({ selected, database, filtered });
    }
  }
  handleAdd = (event) => {
    let { selected, input, database } = this.state;
    if (!selected.includes(input)){
      selected.push(input);
      this.setState({ selected, database });
    }
  }
  handleDelete = (chipToDelete) => {
    let { selected, database, filtered, input } = this.state;
    selected.splice(selected.map(x => x.toLowerCase()).indexOf(chipToDelete.toLowerCase()), 1)
    if (chipToDelete.includes(input)) {
      filtered.push(chipToDelete);
    }
    else {
      database.push(chipToDelete);
    }
    this.setState({ selected, database, filtered });
  };

  render() {
    const { filtered, selected, input } = this.state;
    return (
      <div>
        <Grid container direction="column" justifyContent="center" alignItems="center" >
          <div style={{'display':'flex',justifyContent:'center',flexWrap:'wrap',position:'absolute',top:"40%"}}>
              {selected.map((data, index) => {
                return (
                  <div key={index}>
                    <Grid item xs={5}>
                      <Chip
                        label={data}
                        variant="outlined"
                        color="primary"
                        onDelete={() => this.handleDelete(data)}
                      /></Grid>
                  </div>
                );
              })}
            </div>
            <div style={{ 'maxHeight': '150px', 'overflowY': 'auto',position:'absolute',top:'50%' }}>
              <Input
                variant="outlined"
                required
                color="primary"
                style={{ border: 'none' }}
                onKeyPress={(ev) => {
                  console.log(`Pressed keyCode ${ev.key}`);
                  if (ev.key === 'Enter' || ev.key===' ' || ev.key==='+') {
                    ev.preventDefault();
                    this.handleAdd();
                  }
                }}
                onChange={this.handleChange}
                name="input"></Input>
              {
                filtered.length === 0 && input.length > 0 ?
                  <Paper>
                    <AddCircleOutlineRoundedIcon
                      color="primary"
                      onClick={this.handleAdd}
                    ></AddCircleOutlineRoundedIcon>
                  </Paper> :
                  filtered.map((data, index) => {
                    return (
                      <div key={index}>
                        <MenuItem style={{backgroundColor:'#C5CAE9'}}
                          variant="outlined"
                          onClick={this.handleClick}
                        >{data}</MenuItem></div>
                    );
                  })
              }
            </div>
          </Grid>
      </div>

    )
  }
}
export { App };

