import React , {Component} from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Ticket from './Ticket';
import '../App.css';

class Game extends Component {
    constructor(props){
        super(props);
        this.state={
            numberCalled: 0,
            listOfSets: [],
            selectedNumbers: []
        }
        this.getNextNumber  = this.getNextNumber.bind(this);
        this.checkSelectedNumber = this.checkSelectedNumber.bind(this);
    }

    componentDidMount(){
       
        fetch('/getAllTickets')
            .then(response=> response.json())
            .then(json => {
                //console.log(`Data: ${json}`)
                this.setState({listOfSets: json});
        })
            .catch(err => console.log(`Error occurred in fetching data: ${err}`))
    }

    checkSelectedNumber(number){
        console.log(`Selected number: ${number}`)
        let data = this.state.listOfSets;
        //console.log(`List of sets before changing: ${list}`)
        data.map( (list, index) => {
            for(var i=0;i<list.length;i++){
                if(list[i] === number){
                    console.log(`Before number found: ${list}`)
                    console.log(`Number found in list: ${index+1}`)
                    list[i]='X'
                }    
            }
        });
        return data;
    }

    
    getNextNumber(){
        fetch('/getNextNumber').then(response => response.json())
                               .then(json => this.setState(
                                   {
                                        numberCalled: json,
                                        selectedNumbers: [...this.state.selectedNumbers, json],
                                        listOfSets: this.checkSelectedNumber(json)

                                    }
                                ))
                                .catch(err => console.log(`Error fetching next number!!!`))

    }
    render(){
        //console.log(`state list: ${JSON.stringify(this.state.listOfSets)}`)
        const listOfSets = this.state.listOfSets === null ? [] : this.state.listOfSets;
        return(
            <div>
                <Grid className="header">
                    <Row>
                        <Button onClick={this.getNextNumber}>Next</Button>
                    </Row>
                </Grid>
                <Grid className="game">
                    <Row>
                        {listOfSets.map((set, index)=>{
                            let id;
                            if(index === 0)
                                id='red'
                            else if(index === 1)
                                id='green'
                            else if(index === 2)
                                id='blue'
                            else
                                id='yellow'
                            return (<Col className={'grid-col ' + id} xs={6} md={6} key={index+1}>
                                        <Ticket index={index+1} data={set} />
                                    </Col>);
                        })}
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Game;