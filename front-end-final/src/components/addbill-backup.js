import React, { Component } from 'react';
import axios from 'axios';

class AddBill extends Component{
    constructor(props){
        super(props);

        //initialization of values for the form inputs
        this.state={
            bill_number : 0,
            bill_name : '',
           // date_passed : new Date(),
            status: '',
            legal_history: '',
           // date_filed : new Date(),
            added: false
        }
        this.handleInputBillNumChange = this.handleInputBillNumChange.bind(this);
        this.handleInputBillNameChange = this.handleInputBillNameChange.bind(this);
      //  this.handleInputDatePassedChange = this.handleInputDatePassedChange.bind(this);
        this.handleInputStatusChange = this.handleInputStatusChange.bind(this);
        this.handleInputLegalHistoryChange = this.handleInputLegalHistoryChange.bind(this);
      //  this.handleInputDateFiledChange = this.handleInputDateFiledChange.bind(this);
        this.handleAddedChange = this.handleAddedChange.bind(this);   
    }
    handleInputBillNumChange(e){
        this.setState({
            bill_number: e.target.value,
            added: false
        });
        // console.log(this);
    }
    handleInputBillNameChange(e){
        this.setState({
            bill_name: e.target.value,
            added: false
        });
    }
    handleInputDatePassedChange(e){
        this.setState({
            date_passed: e.target.value,
            added: false
        });
    }
    handleInputStatusChange(e){
        this.setState({
            status: e.target.value,
            added: false
        });
    }
    handleInputLegalHistoryChange(e){
        this.setState({
            legal_history: e.target.value,
            added: false
        });
    }
    // handleInputDateFiledChange(e){
    //     this.setState({
    //         date_filed: e.target.value,
    //         added: false
    //     });
    // }
    handleAddedChange(){
        this.setState({
            added: true
        });
    }
    addBill(){
        fetch('http://localhost:3001/add-bill', {
            method:'post',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                bill_name: this.state.bill_name,
                bill_number : this.state.bill_number,
        //        date_passed : this.state.date_passed,
                status : this.state.status,
                legal_history : this.state.legal_history,
       //         date_filed : this.state.date_filed
            })
        })
        this.handleAddedChange();
    }
    render(){
        return(
            <div>
                <div>
                    <input type="text" name="inputBillNum" placeholder="Bill number" className="input" onChange={this.handleInputBillNumChange} />
                    <br />
                    <input type="text" name="inputBillName" placeholder="Bill name" className="input" onChange={this.handleInputBillNameChange} />
                    <br />
                    {/* <input type="date" name="datePassed" className="input" onChange={this.handleInputDatePassedChange} /> */}
                    <br />
                    <input type="text" name="status" className="input" placeholder="Status" onChange ={this.handleInputStatusChange} />
                    <br />
                    <input type="text" name="legalHistory" className="input" placeholder="Legal History" onChange ={this.handleInputLegalHistoryChange} />
                    <br />
                    <input type="date" name="dateFiled" className="input" onChange ={this.handleInputDateFiledChange} />
                    <br />
                </div>
                <div>
                    <input id="add button"
                        type="button"
                        value="Add Bill"
                        onClick={this.addBill} />
                </div>
                <label id="success-message">
                    {
                        this.state.added ? 'Bill Successfully Added!' : ''
                    }
                </label>
            </div>
        )
    }
}
export default AddBill;