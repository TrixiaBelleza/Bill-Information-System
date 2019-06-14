import React,{Component} from 'react';
import {Button, Form, Header, Grid, Segment, Input, Dropdown, Container, Divider, Menu, List} from 'semantic-ui-react';

class Footer extends Component {
    render() {
        return(
            <div>
            <Segment inverted vertical style={{ padding: '0em 0em' }}>
            <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Header inverted as='h4' content='CMSC 127 Project' />
                  <List link inverted>
                    <List.Item as='a' href ="/find-all-bills">Bills</List.Item>
                    <List.Item as='a' href ="/find-all-housemembers">House Members</List.Item>
                    <List.Item as='a' href ="/find-all-senators">Senators</List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Header inverted as='h4' content='CMSC 127 ST-3L' />
                  <List link inverted>
                    <List.Item as='a'>Patricia Denise Ordona</List.Item>
                    <List.Item as='a'>Trixia R. Belleza</List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            </Container>
            </Segment>
          </div>
    );
  }
}
export default Footer;
