import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class DeleteBill extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            bill_number : 0,
            deleted: false
        }
    }
    handleInputBillNumberChange(e){
        this.setState({
            bill_number: e.target.value,
            deleted: false
        });
    }
    
    handleDeletedChange(){
        this.setState({
            deleted: true
        });
        console.log(this);
    }

    delBill(){
        axios.post('http://localhost:3001/delete-bill',{
            headers:{
				'Content-Type': 'application/json'				
			},
            data: {
                bill_number : this.state.bill_number
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
                <Header inverted as='h2' textAlign='center'>DELETE BILL</Header>
                <Form size='large'>
                    <Segment stacked>
                    <input type="text" name="inputBillNumber" placeholder="Bill Number" className="input" onChange={this.handleInputBillNumberChange} />
                    <br />
                    <Button color='black' fluid onClick={this.delBill}>Delete</Button>
                    </Segment>
                </Form>
                <label id="success-message">
                    {
                        this.state.deleted ? 'Bill Successfully Deleted!' : ''
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
export default DeleteBill;