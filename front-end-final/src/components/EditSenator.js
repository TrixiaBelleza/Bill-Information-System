import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class EditSenator extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            senator_id : this.props.match.params.senator_id,
            senator_name: '',
            // senator_bill_number: '',
            email: '',
            date_elected: '',
            position: '',
            
            showWhatToEdit: false,
            edited: false
        }
    }
  
    handleInputSenatorIdChange(e){
        this.setState({
            senator_id: e.target.value,
            edited: false
        });
    }
    handleInputSenatorNameChange(e){
        this.setState({
            senator_name: e.target.value,
            edited: false
        });
    }
    
    handleInputSenatorEmailChange(e){
        this.setState({
            email: e.target.value,
            edited: false
        });
    }
   
    handleInputSenatorPositionChange(e){
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
                    <input type="text" placeholder="New senator name" onChange={this.handleInputSenatorNameChange}/>
                    <br />
                    {/* <input type="text" placeholder="New senator bill number" onChange={this.handleInputSenatorBillNumChange}/> */}
                    {/* <br /> */}
                    <input type="text" placeholder="New senator email" onChange={this.handleInputSenatorEmailChange}/>
                    <br />
                    {/* <input type="date" onChange={this.handleInputSenatorDateElectedChange}/>
                    <br /> */}
                    <input type="text" placeholder="New senator position" onChange={this.handleInputSenatorPositionChange}/>
                    <br />
                  
                </form>
                <Button color ="black" fluid onClick={this.handleEdit}> Submit </Button>

            </div>
        )
    }
    showWhatToEditChange(e){
        this.setState({
            showWhatToEdit: true
        })
    }
    handleEdit(e){
        
        this.editSenator();
    }
 
    editSenator(){
        axios.post(`http://localhost:3001/edit-senator/${this.state.senator_id}`,{
            headers:{
				'Content-Type': 'application/json'				
			},
            data: {
                senator_id : this.state.senator_id,
                senator_name: this.state.senator_name,
                email: this.state.email,
                date_elected: this.state.date_elected,
                position: this.state.position,
                num_of_bills_passed: this.state.num_of_bills_passed
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
                            <Header inverted as='h2' textAlign='center'>EDIT SENATOR</Header>
                            <Form size='large'>
                                <Segment stacked>
                                
                                    <div>
                                        <form>
                                            <br />
                                            <input type="text" placeholder="New senator name" onChange={this.handleInputSenatorNameChange}/>
                                            <br />
                                            {/* <input type="text" placeholder="New senator bill number" onChange={this.handleInputSenatorBillNumChange}/> */}
                                            {/* <br /> */}
                                            <input type="text" placeholder="New senator email" onChange={this.handleInputSenatorEmailChange}/>
                                            <br />
                                            {/* <input type="date" onChange={this.handleInputSenatorDateElectedChange}/>
                                            <br /> */}
                                            <input type="text" placeholder="New senator position" onChange={this.handleInputSenatorPositionChange}/>
                                            <br />
                                           
                                        </form>
                                        <Button color ="black" fluid onClick={this.handleEdit}> Submit </Button>
                        
                                    </div>
                                
                                </Segment>
                            </Form>
                            <label id="success-message">
                                {
                                    this.state.edited ? 'Senator Successfully Edited!' : ''
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
export default EditSenator;