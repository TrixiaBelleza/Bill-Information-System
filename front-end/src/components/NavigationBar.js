import React,{Component} from 'react';
import {Button, Form, Header, Grid, Segment, Message, Image, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';

class NavigationBar extends Component {
    render() {
        return(
            <div>
              <Menu fixed='top' inverted style={{ padding: '0.3em 0em 0.3em 0em' }}>
                <Container>
                  <Menu.Item as='a' header href='/'>
                    BILL INFORMATION SYSTEM
                </Menu.Item>
                <Menu.Item as='a' href='/'>Home</Menu.Item>
                <Dropdown item simple text='Add'>
                <Dropdown.Menu>
                    <Dropdown.Item href ="/add-bill">Bill</Dropdown.Item>
                    <Dropdown.Item href ="/add-senator">Senator</Dropdown.Item>
                    <Dropdown.Item href ="/add-housemember">House Member</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                <Dropdown item simple text='View'>
                <Dropdown.Menu>
                    <Dropdown.Item href="/find-all-senators">Senator</Dropdown.Item>
                    <Dropdown.Item href="/find-all-housemembers">House Member</Dropdown.Item>
                    <Dropdown.Item href="/find-all-bills">Bills</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                <Dropdown item simple text='Search'>
                <Dropdown.Menu>

                    <Dropdown.Item>
                        <i className='dropdown icon' />
                        <span className='text'>Senate Bills</span>
                        <Dropdown.Menu>
                            <Dropdown.Item href ="/find-senate-bill-by-status">By Status</Dropdown.Item>
                            <Dropdown.Item href="/find-senate-bill-by-senator">By Senator</Dropdown.Item>
                            <Dropdown.Item href = "/find-senate-bill-by-year">By Year Filed</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Item>

                    <Dropdown.Item>
                        <i className='dropdown icon' />
                        <span className='text'>House Bills</span>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/find-house-bill-by-status">By Status</Dropdown.Item>
                            <Dropdown.Item href="/find-house-bill-by-house-member">By House Member</Dropdown.Item>
                            <Dropdown.Item href="/find-house-bill-by-year">By Year Filed</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Item>
                    <Dropdown.Item href="/find-bill">Bill</Dropdown.Item>
                    <Dropdown.Item href="/find-senator">Senator</Dropdown.Item>
                    <Dropdown.Item href ="/find-housemember">House Member</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                    
              </Container>
            </Menu>
          </div>
    );
  }
}
export default NavigationBar;
