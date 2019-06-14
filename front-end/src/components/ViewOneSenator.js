import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class ViewOneSenator extends Component{
	constructor(props){
		super(props);
        autobind(this);
		this.state = {
           // senator_id: this.props.match.params.senator_id,
           senator_id :'',
            senator_name : '',
            resultsSenatorId: '',            
            resultsBillNum: '',
            resultsEmail : '',
            resultsDateElected : '',
            resultsPosition : '',
            submitted: false
		}
	}
	
    searchSenator() {
        const self = this;
        axios.get('http://localhost:3001/find-senator', {
          params: {
            senator_name: this.state.senator_name
          }
        })
        .then(function (response) {
          if (response.data.length !== 0) {
            self.setState({
            senator_id: response.data[0].senator_id,    
              resultsBillNum: response.data[0].senator_bill_number,
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
           senator_name : e.target.value,
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
                Senator ID: {this.state.senator_id} <br />
                Senator name: {this.state.senator_name} <br />
                Senator bill number: {this.state.resultsBillNum} <br />
                Senator email : {this.state.resultsEmail} <br />
                Senator date elected : {this.state.resultsDateElected} <br />
                Senator position : {this.state.resultsPosition} <br />
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
                <Header inverted as='h2' textAlign='center'>SEARCH SENATOR</Header>
                <Form size='large'>
                    <Segment stacked>
                    <input type="text" placeholder="Name of Senator" onChange={this.handleNameChange}/>
                    <Button color='black' fluid onClick={this.searchSenator}>Submit</Button>
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
export default ViewOneSenator;