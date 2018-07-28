import React , {Component} from 'react';
import { Button } from 'react-bootstrap';
import TicketRow from './TicketRow';
class Ticket extends Component {
    constructor(props){
        super(props);
        
        this.state={
            index:-1,
            data: null
        }
        this.checkBingoClaim = this.checkBingoClaim.bind(this)
    }

    checkBingoClaim(){
        let data = this.state.data
        data.map( (curr, index) => {
            if(curr !== 'X')
                return false;
        })
        return true;
    }

    componentWillMount(){
        
    }
    componentDidMount(){
        //console.log(`Ticket key: ${this.props.index}, data: ${JSON.stringify(this.props.data)}`)
        this.setState({index:this.props.index ,data: this.props.data});
    }


    render(){
        let { index, data } = this.state;
        data === null ? [] : data

        console.log(`Data in ticket: ${data}`)
        let cell, set=[];
        if(data){
            cell = data.map( (curr, idx, array) => {
                set.push(curr);
                if( (idx+1) % 5 === 0){
                    let arr=set;
                    set=[]
                    return(
                            <TicketRow zone={index} 
                                      key={idx} 
                                      data={arr} />
                        );
                }
                
            });

        }
        
        return(
            <div className='ticket'>
                {cell}
                <Button onClick = {this.checkClaim}>Claim Bingo</Button>
            </div>
        );
    }
}

export default Ticket;