import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';


class AddSenator extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            senator_id : '',
            senator_name : '',
            senator_bill_number : '',
            email: '',
            date_elected: '',
            position : '',
            added: false
        }
    }
    handleInputSenatorIdChange(e){
        this.setState({
            senator_id: e.target.value,
            added: false
        });
    }
    handleInputSenatorNameChange(e){
        this.setState({
            senator_name: e.target.value,
            added: false
        });
    }
    handleInputSenatorBillNumberChange(e){
        this.setState({
            senator_bill_number: e.target.value,
            added: false
        });
    }
    handleInputEmailChange(e){
        this.setState({
            email: e.target.value,
            added: false
        });
    }
    handleInputDateElectedChange(e){
        this.setState({
            date_elected: e.target.value,
            added: false
        });
    }
    handleInputPositionChange(e){
        this.setState({
            position: e.target.value,
            added: false
        });
    }
   
    handleAddedChange(){
        this.setState({
            added: true
        });
        console.log(this);
    }
    submitBtn(){
        if(this.state.senator_id==='' || this.state.senator_name==='' || this.state.senator_bill_number==='' || this.state.email === '' || this.state.date_elected==='' || this.state.position===''){
            return(
                <Button color='black' fluid onClick={this.addSenator} disabled="disabled">Submit</Button>
            )
        }
        else{
            return(
                <Button color='black' fluid onClick={this.addSenator}>Submit</Button>
            )
        }
        

    }
    addSenator(){
        console.log(this.state.bill_number);
        axios.post('http://localhost:3001/add-senator',{
            headers:{
				'Content-Type': 'application/json'				
			},
            data: {
                senator_id : this.state.senator_id,
                senator_name : this.state.senator_name,
                senator_bill_number : this.state.senator_bill_number,
                email: this.state.email,
                date_elected: this.state.date_elected,
                position : this.state.position,
            }
          
        })
        .then(function (response) {
            console.log(response.data);
            
        })
        .catch(err => {
            console.error(err);
        });
        this.handleAddedChange();
    }
    render(){
        let sbmt = null;
        sbmt = this.submitBtn();
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
                <Header inverted as='h2' textAlign='center'>ADD SENATOR</Header>
                <Form size='large'>
                    <Segment stacked>
                    <input type="text" name="inputSenatorId" placeholder="Senator ID" className="input" onChange={this.handleInputSenatorIdChange} />
                    <br /><br />
                    <input type="text" name="inputSenatorName" placeholder="Senator name" className="input" onChange={this.handleInputSenatorNameChange} />
                    <br /><br />
                    <input type="text" name="inputSenatorBillNum" className="input" placeholder="Senator bill number" onChange={this.handleInputSenatorBillNumberChange} />
                    <br /><br />
                    <input type="text" name="email" className="input" placeholder="Email" onChange ={this.handleInputEmailChange} />
                    <br /><br />
                    <input type="date" name="date-elected" className="input" onChange ={this.handleInputDateElectedChange} />
                    <br /><br />
                    <input type="text" name="position" className="input" placeholder= "Position" onChange ={this.handleInputPositionChange} />
                    <br /><br />
                   
                        {sbmt}
                    </Segment>
                </Form>
                <label id="success-message">
                    {
                        this.state.added ? 'Senator Successfully Added!' : ''
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
export default AddSenator;