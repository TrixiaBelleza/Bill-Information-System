import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class AddHouseMember extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            house_member_id : '',
            house_member_name : '',
            house_member_bill_number : '',
            email: '',
            date_elected: '',
            position : '',
            added: false
        }
    }
    handleInputHouseMemberIdChange(e){
        this.setState({
            house_member_id: e.target.value,
            added: false
        });
        // console.log(this);
    }
    handleInputHouseMemberNameChange(e){
        this.setState({
            house_member_name: e.target.value,
            added: false
        });
    }
    handleInputHouseMemberBillNumberChange(e){
        this.setState({
            house_member_bill_number: e.target.value,
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
        if(this.state.house_member_id==='' || this.state.house_member_name==='' || this.state.house_member_bill_number==='' || this.state.email === '' || this.state.date_elected==='' || this.state.position===''){
            return(
                <Button color='black' fluid onClick={this.addHouseMember} disabled="disabled">Submit</Button>
            )
        }
        else{
            return(
                <Button color='black' fluid onClick={this.addHouseMember}>Submit</Button>
            )
        }   
    }
    addHouseMember(){
        axios.post('http://localhost:3001/add-housemember',{
            headers:{
				'Content-Type': 'application/json'				
			},
            data: {
                house_member_id : this.state.house_member_id,
                house_member_name : this.state.house_member_name,
                house_member_bill_number : this.state.house_member_bill_number,
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
                <Header inverted as='h2' textAlign='center'>ADD HOUSE MEMBER</Header>
                <Form size='large'>
                    <Segment stacked>
                    <input type="text" name="inputHousememId" placeholder="Housemember ID" className="input" onChange={this.handleInputHouseMemberIdChange} />
                    <br /><br />
                    <input type="text" name="inputHousememName" placeholder="Housemember name" className="input" onChange={this.handleInputHouseMemberNameChange} />
                    <br /><br />
                    <input type="text" name="inputHousememBillNum" className="input" placeholder="housemember bill number" onChange={this.handleInputHouseMemberBillNumberChange} />
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
                        this.state.added ? 'House Member Successfully Added!' : ''
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
export default AddHouseMember;