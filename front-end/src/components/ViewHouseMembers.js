import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class ViewHouseMembers extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            housemembers : [],
            house_member_id : '',
            deleted: false
        }
    }
    componentDidMount(){
		fetch("http://localhost:3001/find-all-housemembers")
		.then((response) => {return response.json () }) //returns in JSON format
		.then((result) => {
			this.setState({housemembers: result}); //stores the result to the movies list
		})
		.catch((e) => { console.log(e); })
    }
    componentDidUpdate(){
		fetch("http://localhost:3001/find-all-housemembers")
		.then((response) => {return response.json () }) //returns in JSON format
		.then((result) => {
			this.setState({housemembers: result}); //stores the result to the movies list
		})
		.catch((e) => { console.log(e); })
    }
    handleDeletedChange(){
        this.setState({
            deleted: true
        });
        console.log(this);
    }

    memIdGetter(inputMemId){
        this.setState({
            house_member_id: inputMemId
        })
    }
    delHouseMember(e){
        axios.post('http://localhost:3001/delete-housemember',{
            headers:{
				'Content-Type': 'application/json'				
			},
            data: {
                house_member_id : e.target.value,
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
                <Header inverted as='h2' textAlign='center'>HOUSE MEMBERS LIST</Header>
                    <Segment stacked>
                    {this.state.housemembers.map((housemember) => {
                        return(
                            <div key = {housemember.house_member_id}>
                                <br />
                                Housemember ID : {housemember.house_member_id}
                                <br />
                                Housemember Name : {housemember.house_member_name}
                                <br />
                                Housemember Bill Number:{housemember.house_member_bill_number}
                                <br />
                                Email: {housemember.email}
                                <br />
                                Date Elected: {housemember.date_elected}
                                <br />
                                Position:{housemember.position}
                                <br />
                               
                                <br />
                              
                                <a href={`/edit-housemember/${housemember.house_member_id}`}>
                                <Button color='black' fluid>Edit</Button>
                                </a>
                                <br/>
                                <Button color='black' fluid value={housemember.house_member_id} onClick={this.delHouseMember}> Delete </Button>
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
export default ViewHouseMembers;