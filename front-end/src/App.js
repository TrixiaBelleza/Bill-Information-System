import React, { Component } from 'react';

import autobind from 'react-autobind';
import axios from 'axios';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './css/App.css';
import Home from './components/Home';
import AddBill from './components/AddBill';
import AddSenator from './components/AddSenator';
import AddHouseMember from './components/AddHouseMember';
import DeleteSenator from './components/DeleteSenator';
import DeleteHouseMember from './components/DeleteHouseMember';
import DeleteBill from './components/DeleteBill';
import ViewSenators from './components/ViewSenators';
import ViewHouseMembers from './components/ViewHouseMembers';
import ViewBills from './components/ViewBills';
import ViewOneBill from './components/ViewOneBill';
import ViewOneSenator from './components/ViewOneSenator';
import ViewOneHouseMember from './components/ViewOneHouseMember';
import FindSenateBillByStatus from './components/FindSenateBillByStatus';
import FindHouseBillByStatus from './components/FindHouseBillByStatus';
import FindSenateBillByYear from './components/FindSenateBillByYear';
import FindHouseBillByYear from './components/FindHouseBillByYear';
import FindSenateBillBySenator from './components/FindSenateBillBySenator';
import FindHouseBillByHouseMember from './components/FindHouseBillByHouseMember';
import EditSenator from './components/EditSenator';
import EditHouseMember from './components/EditHouseMember';
import EditBill from './components/EditBill';

class App extends Component {
  
  render() {
    return (
     <div id='main'>
        <h1> Bill Information System </h1>
        <Router>
          <div id="content-container">
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/add-bill" component={AddBill} />
            <Route exact={true} path="/add-senator" component={AddSenator} />
            <Route exact={true} path="/add-housemember" component={AddHouseMember} /> 
            <Route exact={true} path="/delete-senator" component={DeleteSenator} /> 
            <Route exact={true} path="/delete-housemember" component={DeleteHouseMember} /> 
            <Route exact={true} path="/delete-bill" component={DeleteBill} /> 
            <Route exact={true} path="/find-all-housemembers" component={ViewHouseMembers} /> 
            <Route exact={true} path="/find-all-senators" component={ViewSenators} /> 
            <Route exact={true} path="/find-all-bills" component={ViewBills} /> 
            <Route exact={true} path="/find-bill" component={ViewOneBill} /> 
            <Route exact={true} path="/find-senator" component={ViewOneSenator} /> 
            <Route exact={true} path="/find-housemember" component={ViewOneHouseMember} /> 
            <Route exact={true} path="/find-senate-bill-by-status" component={FindSenateBillByStatus} /> 
            <Route exact={true} path="/find-house-bill-by-status" component={FindHouseBillByStatus} /> 
            <Route exact={true} path="/find-senate-bill-by-year" component={FindSenateBillByYear} /> 
            <Route exact={true} path="/find-house-bill-by-year" component={FindHouseBillByYear} /> 
            <Route exact={true} path="/find-senate-bill-by-senator" component={FindSenateBillBySenator} /> 
            <Route exact={true} path="/find-house-bill-by-house-member" component={FindHouseBillByHouseMember} /> 
            <Route exact={true} path="/edit-bill/:bill_number" component={EditBill} /> 
            <Route exact={true} path="/edit-housemember/:house_member_id" component={EditHouseMember} /> 
            <Route exact={true} path="/edit-senator/:senator_id" component={EditSenator} /> 
            </div>
        </Router>
      </div>
    );
  }
}

export default App;
