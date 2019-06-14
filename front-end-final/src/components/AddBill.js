import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class AddBill extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            bill_number : '',
            bill_name : '',
            date_passed : '',
            status: '',
            legal_history: '',
            date_filed : '',
            isValid: true,
            added: false
        }
    }
    
    handleInputBillNumChange(e){
        this.setState({
            bill_number: e.target.value,
            added: false
        });
        // console.log(this);
    }
    handleInputBillNameChange(e){
        this.setState({
            bill_name: e.target.value,
            added: false
        });
    }
    handleInputDatePassedChange(e){
        this.setState({
            date_passed: e.target.value,
            added: false
        });
    }
    handleInputStatusChange(e){
        this.setState({
            status: e.target.value,
            added: false
        });
    }
    handleInputLegalHistoryChange(e){
        this.setState({
            legal_history: e.target.value,
            added: false
        });
    }
    handleInputDateFiledChange(e){
        this.setState({
            date_filed: e.target.value,
            added: false
        });
    }
    handleAddedChange(){
        this.setState({
            added: true
        });
        console.log(this);
    }
    addBill(){
        if(this.state.bill_number!='' || this.state.bill_name!='' ){
            axios.post('http://localhost:3001/add-bill',{
                headers:{
                    'Content-Type': 'application/json'				
                },
                data: {
                    bill_number : this.state.bill_number,
                    bill_name : this.state.bill_name,
                    date_passed : this.state.date_passed,
                    status : this.state.status,
                    legal_history : this.state.legal_history,
                    date_filed : this.state.date_filed   
                }
              
            })
            .then(function (response) {
               
                
            })
            .catch(err => {
                console.error(err);
            });
            this.handleAddedChange();
        }
    }
    submitBtn(){
        if(this.state.bill_number==='' || this.state.bill_name==='' || this.state.date_passed==='' || this.state.status === '' || this.state.legal_history==='' || this.state.date_filed===''){
            return(
                <Button color='black' fluid onClick={this.addBill} disabled="disabled">Submit</Button>
            )
        }
        else{
            return(
                <Button color='black' fluid onClick={this.addBill}>Submit</Button>
            )
        }
        
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
                <Header inverted as='h2' textAlign='center'>ADD BILL</Header>
                <Form size='large'>
                    <Segment stacked>
                    <input type="text" name="inputBillNum" placeholder="Bill number" className="input" onChange={this.handleInputBillNumChange} />
                    <br /><br />
                    <input type="text" name="inputBillName" placeholder="Bill name" className="input" onChange={this.handleInputBillNameChange} />
                    <br /><br />
                    <input type="date" name="datePassed" className="input" onChange={this.handleInputDatePassedChange} />
                    <br /><br />
                    <select 
                    name="status"
                    className="dropdown"
                    onChange={this.handleInputStatusChange}>
                    <option value="-1">Status</option>
                    <option value="First Reading">First Reading</option>
                    <option value="Second Reading">Second Reading</option>
                    <option value="Third Reading">Third Reading</option>
                    </select>                    <br />
                    <input type="text" name="legalHistory" className="input" placeholder="Legal History" onChange ={this.handleInputLegalHistoryChange} />
                    <br /><br />
                    <input type="date" name="dateFiled" className="input" onChange ={this.handleInputDateFiledChange} />
                    <br /><br />
                    {sbmt}
                    </Segment>
                </Form>
                <label id="success-message">
                    {
                        this.state.added ? 'Bill Successfully Added!' : ''
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
export default AddBill;