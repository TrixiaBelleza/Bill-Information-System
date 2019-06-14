import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class ViewOneBill extends Component{
	constructor(props){
		super(props);
        autobind(this);
		this.state = {
            bill_name : '',
            resultsBillNum: '',
            resultsEmail : '',
            resultsDateElected : '',
            resultsPosition : '',
            resultsNumOfBillsPassed : '',
            submitted: false
		}
	}
	
    searchBill() {
        const self = this;
        axios.get('http://localhost:3001/find-bill', {
          params: {
            bill_name: this.state.bill_name
          }
        })
        .then(function (response) {
          if (response.data.length !== 0) {
            self.setState({
                resultsBillNum: response.data[0].bill_number,
                resultsBillName : response.data[0].bill_name,
                resultsDatePassed : response.data[0].date_passed,
                resultsStatus : response.data[0].status,
                resultsLegalHistory : response.data[0].legal_history,
                resultsDateFiled : response.data[0].date_filed
            })
          }
          console.log(response);
        })
        this.handleSubmit();
      }
    handleNameChange(e){
        this.setState({
           bill_name : e.target.value,
           submitted: false
        })
    } 

    handleSubmit(e){
        this.setState({
            submitted : true
        })
    }
    details(){
        return(
            <div>
                Bill number: {this.state.resultsBillNum} <br />
                Bill bill name : {this.state.resultsBillName} <br />
                Bill date passed : {this.state.resultsDatePassed} <br />
                Bill status : {this.state.resultsStatus} <br />
                Bill legal history : {this.state.resultsLegalHistory} <br />
                Bill date filed : {this.state.resultsDateFiled} <br />
            </div>
        )
       
    }
    render(){
        let showDetails = null;
        if(this.state.submitted === true){
            showDetails = this.details()
        }
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
             <Header inverted as='h2' textAlign='center'>SEARCH BILL</Header>
             <Form size='large'>
                 <Segment stacked>
                    <input type="text" placeholder="Name of Bill" onChange={this.handleNameChange}/>
                    <Button color='black' fluid onClick={this.searchBill}>Submit</Button>
                    </Segment>
                </Form>
              {showDetails}
            </Grid.Column>
          </Grid>


      </Segment>
          <Footer/>      
                
            </div>
        )
    }
}

export default ViewOneBill;