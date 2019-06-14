import React, { Component } from 'react';
import axios from 'axios';
import autobind from 'react-autobind';

class SearchBill extends Component {
    constructor(props){
        super(props);
        autobind(this);

        this.state={
            legislator : '',
            year : '',
            senators : [],
            senator_id: 0,
            bills_by_senators : [],
            chosen_senator: '',
            status : '',
            search_by: '',
        }
    }

    componentDidMount(){
		fetch(`http://localhost:3001/find-bills-filed-by-senator/${this.state.senator_id}`)
		.then((response) => {return response.json () }) //returns in JSON format
		.then((result) => {
			this.setState({bills_by_senators: result}); //stores the result to the list
		})
        .catch((e) => { console.log(e); })

        fetch('http://localhost:3001/find-all-senators')
        .then((response) => {return response.json () })
        .then((result) => {
            this.setState({senators: result});
        })
        .catch((e) => {console.log(e); })   
    }
    
    
    handleLegislatorChange(e){
        this.setState({
            legislator : e.target.value
        })
    }
    handleSenatorChange(e){
        this.setState({
            senator_id : e.target.value
            
        })
        {console.log(e.target.value)}
        console.log(this.state.senator_id);
        console.log("HELLOOOOOOOOOO");
        
    }
    handleSearchByChange(e){
        this.setState({
            search_by: e.target.value
        });
    }
    searchByWhat(){
        if(this.state.legislator === 'Senate'){
            return(
                <div>
                    <select 
                        name="senator"
                        className="dropdown"
                        onChange={this.handleSearchByChange}>
                        <option value="-1"> Search By </option>
                        <option value="Year"> Year </option>
                        <option value="Senator"> Senator </option>
                        <option value="Status"> Status </option>
                    </select>
                </div>
            )
        }
    }
    displayNames(){
        let showDetail = this.displayDetails();
        console.log("yo");
        if(this.state.search_by === 'Senator'){
            return(
                <div>
                    <select 
                        name="senators"
                        className = "dropdown"
                        onChange = {this.handleSenatorChange}>
                        <option value = {-1}> Senators </option>
                        {this.state.senators.map((senator) => {
                            return(
                                <option key = {senator.senator_id} value = {senator.senator_id}>
                                    {senator.senator_name}
                                </option>
                            )
                        
                        })}
                    </select>
                </div> 
            )
        }
        
    }
    displayDetails(){
        console.log("adada");
        return(
            <div>
                HELLO
                {this.state.bills_by_senators.map((bill) => {
                    
                    {bill.bill_name}
                    
                })}
                
            </div>
        )
    }

    searchBySenator(){
        console.log(this.state.bill_number);
        axios.post('http://localhost:3001/find-bills-by-senator',{
            headers:{
				'Content-Type': 'application/json'				
			},
            data: {
                senator_id : this.state.senator_id
            }
          
        })
        .then(function (response) {
            console.log(response.data);
            
        })
        .catch(err => {
            console.error(err);
        });
        this.handleAddedChange();
    }
    render(){
        let searchForm = null;
        let searchBy = null;
        let showDetail = null;
        searchForm = this.searchByWhat();
        if(this.state.search_by === 'Senator'){
            searchBy = this.displayNames();
        }
        if(this.state.chosen_senator != ''){
            showDetail = this.displayDetails();
        }

        
        return(
            <div>
                <h3> Search Bills Filed By </h3>
                <select 
                    name="legislator"
                    className="dropdown"
                    onChange={this.handleLegislatorChange}>
                    <option value="-1"> Legislator </option>
                    <option value="Senate"> Senate </option>
                    <option value="House"> House </option>
                </select>
                {searchForm}
                {searchBy}
                {showDetail}
            </div>
        )
    }
}
export default SearchBill;