import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class ViewOneHouseMember extends Component{
	constructor(props){
		super(props);
        autobind(this);
		this.state = {
            house_member_name : '',
            resultsHouseMemId : '',
            resultsBillNum: '',
            resultsEmail : '',
            resultsDateElected : '',
            resultsPosition : '',
            submitted: false
		}
	}
	
    searchHouseMember() {
        const self = this;
        axios.get('http://localhost:3001/find-housemember', {
          params: {
            house_member_name: this.state.house_member_name
          }
        })
        .then(function (response) {
          if (response.data.length !== 0) {
            self.setState({
                resultsHouseMemId : response.data[0].house_member_id,
                resultsBillNum: response.data[0].house_member_bill_number,
                resultsEmail: response.data[0].email,
                resultsDateElected : response.data[0].date_elected,
                resultsPosition : response.data[0].position,
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
    details(){
        return(
            <div>
                House Member ID : {this.state.resultsHouseMemId} <br />
                House Member Name : {this.state.house_member_name} <br />
                House Member bill number: {this.state.resultsBillNum} <br />
                House Member email : {this.state.resultsEmail} <br />
                House Member date elected : {this.state.resultsDateElected} <br />
                House Member position : {this.state.resultsPosition} <br />
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
                <Header inverted as='h2' textAlign='center'>SEARCH HOUSE MEMBER</Header>
                <Form size='large'>
                    <Segment stacked>
                    <input type="text" placeholder="Name of House Member" onChange={this.handleNameChange}/>
                    <Button color='black' fluid onClick={this.searchHouseMember}>Submit</Button>
                    </Segment>
                </Form>
                <div>{showDetails}</div>
            </Grid.Column>
          </Grid>


      </Segment>
            <Footer/>    
                
            </div>
        )
    }
}
export default ViewOneHouseMember;