import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class ViewSenators extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            senators : [],
            senator_id : '',
            senator_name: '',
            senator_bill_number: 0,
            email : '',
            date_elected : '',
            position: '',
            deleted: false
        }
    }

    componentDidMount(){
		fetch("http://localhost:3001/find-all-senators/")
		.then((response) => {return response.json () }) //returns in JSON format
		.then((result) => {
			this.setState({senators: result}); //stores the result to the senators list
		})
		.catch((e) => { console.log(e); })
    }
    componentDidUpdate(){
		fetch("http://localhost:3001/find-all-senators/")
		.then((response) => {return response.json () }) //returns in JSON format
		.then((result) => {
			this.setState({senators: result}); //stores the result to the movies list
		})
		.catch((e) => { console.log(e); })
    }
    handleDeletedChange(){
        this.setState({
            deleted: true
        });
        console.log(this);
    }
    
    delSenator(e){
        axios.post('http://localhost:3001/delete-senator',{
            headers:{
				'Content-Type': 'application/json'				
			},
            data: {
                senator_id : e.target.value,
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
                <Header inverted as='h2' textAlign='center'>SENATORS LIST</Header>
                    <Segment stacked>
                    {this.state.senators.map((senator) => {
                        return(
                            <div key = {senator.senator_id}>
                                Senator ID : {senator.senator_id}
                                <br />
                                Senator Name: {senator.senator_name}
                                <br />
                                Senator Bill Number: {senator.senator_bill_number}
                                <br />
                                Senator Email: {senator.email}
                                <br />
                                Senator Date Elected: {senator.date_elected}
                                <br />
                                Senator Position: {senator.position}
                                <br />
                              
                                <br />
                                <a href={`/edit-senator/${senator.senator_id}`}>
                                <Button color='black' fluid>Edit</Button>
                                </a>
                                <br/>
                                <Button color='black' fluid value={senator.senator_id} onClick={this.delSenator}> Delete </Button>
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
export default ViewSenators;