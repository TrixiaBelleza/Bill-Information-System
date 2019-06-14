import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

class EditBill extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            bills: [],
            bill_number : this.props.match.params.bill_number,
            bill_name: '',
            status: '',
            legal_history: '',
            
            showWhatToEdit: false,
            edited: false
        }
    }
    handleInputBillNumberChange(e){
        this.setState({
            bill_number: e.target.value,
            edited: false
        });
    }
    handleInputBillNameChange(e){
        this.setState({
            bill_name: e.target.value,
            edited: false
        });
    }
    handleInputStatusChange(e){
        this.setState({
            status: e.target.value,
            edited: false
        });
    }
    handleInputLegalHistoryChange(e){
        this.setState({
            legal_history: e.target.value,
            edited: false
        });
    }
    whatToEdit(){
        return(
            <div>
                <form>
                    <br />
                    <input type="text" placeholder="New bill name" onChange={this.handleInputBillNameChange}/>
                    <br />
                    <input type="text" placeholder="New bill status" onChange={this.handleInputStatusChange}/>
                    <br />
                    <input type="text" placeholder="New bill legal history" onChange={this.handleInputLegalHistoryChange}/>
                    <br />
                </form>
                <button color ="black" fluid onClick={this.handleEdit}> Submit </button>

            </div>
        )
    }
  
    showWhatToEditChange(e){
        this.setState({
            showWhatToEdit: true
        })
    }
    handleEdit(e){
        
        this.editBill();
    }
 
    componentDidMount(){
		fetch('http://localhost:3001/find-all-bills')
		.then((response) => {return response.json () }) //returns in JSON format
		.then((result) => {
			this.setState({bills: result}); //stores the result to bills
		})
		.catch((e) => { console.log(e); })
	}
    editBill(){
        axios.post(`http://localhost:3001/edit-bill/${this.state.bill_number}`,{
            headers:{
				'Content-Type': 'application/json'				
			},
            data: {
                bill_number : this.state.bill_number,
                bill_name: this.state.bill_name,
                status: this.state.status,
                legal_history: this.state.legal_history
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
                            <Header inverted as='h2' textAlign='center'>EDIT BILL</Header>
                            <Form size='large'>
                           
                                <div>
                                    <form>
                                        <br />
                                        <input type="text" placeholder="New bill name" onChange={this.handleInputBillNameChange}/>
                                        <br />
                                        <select 
                                        name="status"
                                        className="dropdown"
                                        onChange={this.handleInputStatusChange}>
                                        <option value="-1">Status</option>
                                        <option value="First Reading">First Reading</option>
                                        <option value="Second Reading">Second Reading</option>
                                        <option value="Third Reading">Third Reading</option>
                                        </select>        
                                        <input type="text" placeholder="New bill legal history" onChange={this.handleInputLegalHistoryChange}/>
                                        <br />
                                    </form>
                                    <Button color ="black" fluid onClick={this.handleEdit}> Submit </Button>
                    
                                </div>
                            
                            </Form>
                            <label id="success-message">
                                {
                                    this.state.edited ? 'Bill Successfully Edited!' : ''
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
export default EditBill;