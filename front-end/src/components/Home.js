import React, { Component } from 'react'
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,Menu,Segment,
} from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

export default class HomepageLayout extends Component {
  state = {}

  render() {

    return (
      <div>
		  <NavigationBar/>
          <Segment
            inverted
            textAlign='center'
            color='yellow'
            style={{ minHeight: 450, padding: '0em 0em' }}
            vertical
          >
            <Container text style={{padding: '7em' }}>
              
              <Header
                as='h1'
                inverted
                style={{ fontSize: '4em', fontWeight: 'bold', marginBottom: 0}}
              >CMSC 127 PROJECT</Header>
              <Header
                as='h2'
                content=' bhOuzXH tRiXI@. Bh0u$$4 ti$h@.'
                inverted
                style={{ fontSize: '1.3em', fontWeight: 'normal'  }}
              />
</Container>

          </Segment>
          <Footer/>
      </div>
    )
  }
}
