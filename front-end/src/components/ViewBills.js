import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class ViewBills extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            bills : [],
            bill_number : 0,
            bill_name: '',
            date_passed: '',
            status : '',
            legal_history : '',
            date_filed: '',
            deleted : false
        }
    }

    componentDidMount(){
		fetch('http://localhost:3001/find-all-bills')
		.then((response) => {return response.json () }) //returns in JSON format
		.then((result) => {
			this.setState({bills: result}); //stores the result to the movies list
		})
		.catch((e) => { console.log(e); })
    }
    componentDidUpdate(){
		fetch('http://localhost:3001/find-all-bills')
		.then((response) => {return response.json () }) //returns in JSON format
		.then((result) => {
			this.setState({bills: result}); //stores the result to the movies list
		})
		.catch((e) => { console.log(e); })
    }
    handleDeletedChange(){
        this.setState({
            deleted: true
        });
        console.log(this);
    }
    delBill(e){
        axios.post('http://localhost:3001/delete-bill',{
            headers:{
				'Content-Type': 'application/json'				
			},
            data: {
                bill_number : e.target.value
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
                <Header inverted as='h2' textAlign='center'>LIST OF BILLS</Header>
                    <Segment stacked>
                    {this.state.bills.map((bill) => {
                        return(
                            <div key = {bill.bill_number}>
                                <br />
                                Bill Number: {bill.bill_number}
                                <br />
                                Bill Name: {bill.bill_name}
                                <br />
                                Date Passed: {bill.date_passed}
                                <br />
                                Status: {bill.status}
                                <br />
                                Legal History: {bill.legal_history}
                                <br />
                                Date Filed: {bill.date_filed}
                                <br />
                                <br />
                                <a href={`/edit-bill/${bill.bill_number}`}>
                                <Button color='black' fluid>Edit</Button>
                                </a>
                                <br/>
                                <Button color='black' fluid value={bill.bill_number} onClick={this.delBill}> Delete </Button>
                                <br/>
                            </div>
                        )
                    })}
                </Segment>
                </Grid.Column>
                </Grid>
            </Segment>             
            <Footer/>            
            </div>
        )
    }
}
export default ViewBills;