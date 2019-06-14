import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
class FindHouseBillByHouseMember extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            bills:[],
            house_member_name: '',
        }
    }

    searchBill() {
        const self = this;
        axios.get('http://localhost:3001/find-house-bill-by-house-member', {
          params: {
            house_member_name: this.state.house_member_name
          }
        })
        .then(function (response) {
          if (response.data.length != 0) {
            self.setState({
              bills: response.data
            })
          }
          console.log(response);
        })
        this.handleSubmit();
      }
    handleNameChange(e){
        this.setState({
           house_member_name : e.target.value,
           submitted: false
        })
    } 

    handleSubmit(e){
        this.setState({
            submitted : true
        })
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
                <Header inverted as='h2' textAlign='center'>SEARCH HOUSE BILL BY HOUSE MEMBER</Header>
                <Form size='large'>
                <Segment stacked>

                <input type="text" placeholder="House Member Name" onChange={this.handleNameChange}/>
                <Button color='black' fluid onClick={this.searchBill}>Submit</Button>
                    </Segment>

                    </Form>

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
                            </div>
                        )
                    })}

            </Grid.Column>
          </Grid>
            </Segment>             
                   <Footer/>      
            </div>
        )
    }
}
export default FindHouseBillByHouseMember;