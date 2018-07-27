import React , {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Ticket from './Ticket';
class Game extends Component {
    constructor(props){
        super(props);
        this.state={
            numberCalled: 0,
            listOfSets: null
        }
    }

    componentDidMount(){
        fetch('/getAllTickets', response=> {
            console.log(`Data: ${JSON.stringify(response)}`)
            this.setState({listOfSets: response});
        })
    }
    render(){
        const listOfSets = this.state.listOfSets === null ? [] : this.state.listOfSets;
        return(
            <Grid>
                <Row>
                    {listOfSets.map((set, index)=>{
                        return (<Col xs={6} md={6}>
                                    <Ticket key={index+1} data={set} />
                                </Col>);
                    })}
                </Row>
            </Grid>
        );
    }
}

export default Game;