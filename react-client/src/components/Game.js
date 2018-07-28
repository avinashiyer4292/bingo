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
                    //console.log(`Number found in list: ${index+1}`)
                    //console.log(`Before number found: ${list}`)
                    list[i]='X'
                    //console.log(`After number found: ${list}`)
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
                    <Col style={{'borderLeft': '1px solid #cecece','boxShadow': '3px 3px 14px 6px #cecece'}} xs={2} md={2}>
                        <Button className='btn-next' onClick={this.getNextNumber}>Next</Button>
                    </Col>                
                </Row>
            </Grid>
               
                
                
                
        
        );
    }
}

export default Game;