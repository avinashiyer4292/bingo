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
            selectedNumbers: [],
            previousNumbers: []
        }
        this.getNextNumber  = this.getNextNumber.bind(this);
        this.checkSelectedNumber = this.checkSelectedNumber.bind(this);
    }

    componentDidMount(){
       
        fetch('/getAllTickets')
            .then(response=> response.json())
            .then(json => {
                this.setState({listOfSets: json});
        })
            .catch(err => console.log(`Error occurred in fetching data: ${err}`))
    }

    checkSelectedNumber(number){
        console.log(`Selected number: ${number}`)
        let data = this.state.listOfSets;
        data.forEach( list => {
            for(var i=0;i<list.length;i++){
                if(list[i] === number){
                    list[i]='X'
                }    
            }
        });
        return data;
    }

    
    getNextNumber(){
        fetch('/getNextNumber').then(response => response.json())
                               .then(json => {
                                if(this.state.previousNumbers.length > 5)
                                    this.state.previousNumbers.shift();
                                this.setState({
                                         numberCalled: json,
                                         selectedNumbers: [...this.state.selectedNumbers, json],
                                         listOfSets: this.checkSelectedNumber(json),
                                         previousNumbers: [...this.state.previousNumbers, json]
                                     }
                                 )
                               })
                               .catch(err => console.log(`Error fetching next number!!!`))

    }
    render(){
        let listOfSets = this.state.listOfSets === null ? [] : this.state.listOfSets,
            previousNumbers = this.state.previousNumbers;
        return(            
            <Grid>
                <Row className='content-row'>
                    <Col xs={10} md={10}>
                        <Grid className="game">
                            <Row>
                                {listOfSets.map((set, index)=>{
                                    return (<Col className='grid-col' xs={6} md={6} key={index+1}>
                                                <Ticket index={index+1} data={set} />
                                            </Col>);
                                })}
                            </Row>
                        </Grid>
                    </Col>
                    <Col style={{'borderLeft': '1px solid #cecece','boxShadow': '3px 3px 14px 6px #cecece','textAlign':'center'}} xs={2} md={2}>
                        <h3 style={{'marginTop':'5%'}}>Bingo</h3>
                        <Button className='btn-next' onClick={this.getNextNumber}>Call</Button>
                        <h4>Current number is</h4>
                        <h2>{this.state.numberCalled}</h2>
                        <div className='previous-numbers'>
                                <h4>Previous numbers</h4>
                                {previousNumbers.map( (curr , index) => {
                                    return(
                                        <div className="circle" key={index}>{curr}</div>
                                    );
                                })}
                        </div>
                    </Col>                
                </Row>
            </Grid>

        );
    }
}

export default Game;