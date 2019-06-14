import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class DeleteSenator extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            senator_id : '',
            senator_name: '',
            deleted: false
        }
    }

  
    handleInputSenatorIdChange(e){
        this.setState({
            senator_id: e.target.value,
            deleted: false
        });
        // console.log(this);
    }
   

    handleDeletedChange(){
        this.setState({
            deleted: true
        });
        console.log(this);
    }

    delSenator(){
        axios.post('http://localhost:3001/delete-senator',{
            headers:{
				'Content-Type': 'application/json'				
			},
            data: {
                senator_id : this.state.senator_id,
            }
          
        })
        .then(function (response) {
            console.log(response.data);
            
        })
        .catch(err => {
            console.error(err);
        });
        this.handleDeletedChange();
    }
    render(){
        return(
            <div>
                 <NavigationBar/>
        <Segment
          inverted
          textAlign='center'
          color='yellow'
          style={{ minHeight: 650, padding: '0em 0em' }}
          vertical
        >

          <Grid textAlign='center' style={{height:'100%',padding:'5em'}} verticalAlign='middle' >
            <Grid.Column style={{maxWidth: 450}}>
                <Header inverted as='h2' textAlign='center'>DELETE SENATOR</Header>
                <Form size='large'>
                    <Segment stacked>
                    <input type="text" name="inputSenatorID" placeholder="Senator ID" className="input" onChange={this.handleInputSenatorIdChange} />
                    <br />
                    
                    <Button color='black' fluid onClick={this.delSenator}>Delete</Button>
                    </Segment>
                </Form>
                <label id="success-message">
                    {
                        this.state.deleted ? 'Senator Successfully Deleted!' : ''
                    }
                </label>
            </Grid.Column>
          </Grid>


      </Segment>
       <Footer/>         
                
            </div>
        )
    }
}
export default DeleteSenator;