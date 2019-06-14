import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class EditHouseMember extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            house_member_id : this.props.match.params.house_member_id,
            house_member_name: '',
            // house_member_bill_number: '',
            email: '',
            date_elected: '',
            position: '',
            
            showWhatToEdit: false,
            edited: false
        }
    }
  
    handleInputHouseMemberIdChange(e){
        this.setState({
            house_member_id: e.target.value,
            edited: false
        });
    }
    handleInputHouseMemberNameChange(e){
        this.setState({
            house_member_name: e.target.value,
            edited: false
        });
    }
  
    handleInputHouseMemberEmailChange(e){
        this.setState({
            email: e.target.value,
            edited: false
        });
    }
  
    handleInputHouseMemberPositionChange(e){
        this.setState({
            position: e.target.value,
            edited: false
        });
    }
    
    whatToEdit(){
       
        return(
            <div>
                <form>
                    <br />
                    <input type="text" placeholder="New house_member name" onChange={this.handleInputHouseMemberNameChange}/>
                    <br />
                    
                    <input type="text" placeholder="New house_member email" onChange={this.handleInputHouseMemberEmailChange}/>
                    <br />
                 
                    <input type="text" placeholder="New house_member position" onChange={this.handleInputHouseMemberPositionChange}/>
                    <br />
                    
                </form>
                <Button color = "black" fluid onClick={this.handleEdit}> Submit </Button>

            </div>
        )
    }
    showWhatToEditChange(e){
        this.setState({
            showWhatToEdit: true
        })
    }
    handleEdit(e){
        
        this.editHouseMember();
    }
 
    editHouseMember(){
        axios.post(`http://localhost:3001/edit-housemember/${this.state.house_member_id}`,{
            headers:{
				'Content-Type': 'application/json'				
			},
            data: {
                house_member_id : this.state.house_member_id,
                house_member_name: this.state.house_member_name,
                email: this.state.email,
                date_elected: this.state.date_elected,
                position: this.state.position,
            }
        })
        .then(function (response) {
            console.log(response.data);
            
        })
        .catch(err => {
            console.error(err);
        });
        this.setState({
            edited: true
        });
    }
    render(){
        let shouldDisplayEdit = null;
        if(this.state.showWhatToEdit){
            shouldDisplayEdit = this.whatToEdit();
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
                            <Header inverted as='h2' textAlign='center'>EDIT HOUSE MEMBER</Header>
                            <Form size='large'>
                            <div>
                                <br />
                                <input type="text" placeholder="New house_member name" onChange={this.handleInputHouseMemberNameChange}/>
                                <br />
                                {/* <input type="text" placeholder="New house_member bill number" onChange={this.handleInputhouse_memberBillNumChange}/> */}
                                {/* <br /> */}
                                <input type="text" placeholder="New house_member email" onChange={this.handleInputHouseMemberEmailChange}/>
                                <br />
                                {/* <input type="date" onChange={this.handleInputhouse_memberDateElectedChange}/>
                                <br /> */}
                                <input type="text" placeholder="New house_member position" onChange={this.handleInputHouseMemberPositionChange}/>
                                <br />
                               
                            <Button color="black" fluid onClick={this.handleEdit}> Submit </Button>
            
                        </div>
                            </Form>
                            <label id="success-message">
                                {
                                    this.state.edited ? 'House Member Successfully Edited!' : ''
                                }
                            </label>
                        </Grid.Column>
                    </Grid>

                                {shouldDisplayEdit}
                </Segment>
                <Footer/>
                
            </div>
        )
    }
}
export default EditHouseMember;