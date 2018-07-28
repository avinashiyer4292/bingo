import React , {Component} from 'react';
import { Button , Modal } from 'react-bootstrap';
import TicketRow from './TicketRow';
class Ticket extends Component {
    constructor(props){
        super(props);
        
        this.state={
            index:-1,
            data: null,
            claim: -1
        }
        this.checkBingoClaim = this.checkBingoClaim.bind(this)
        this.showMessage = this.showMessage.bind(this);
        this.hideModal = this.hideModal.bind(this);

    }

    checkBingoClaim(){
        let data = this.state.data, claim;
        console.log(`Sending list for verification: ${data}`);
        fetch('/claimBingo', {
            method: 'post',
            body: JSON.stringify({data:data}),
            headers: {"Content-Type": "application/json"}
          }).then(response => response.json())
            .then(json =>  this.setState({claim:json})) 
            .catch(err => console.log(`Error in checking claim!!!`));
           
        // data.map( (curr, index) => {
        //     if(curr !== 'X')
        //         return false;
        // })
          //this.showMessage(claim);
    }

    showMessage(claim){
        let msg;
        if(claim === 0)
            msg = `Player ${this.state.index} is the winner!!! Game over!`;
        else
            msg = `Wrong claim by player ${this.state.index}! Game will continue!!!`; 

    }

    hideModal(){
        this.setState({claim: -1});
    }

    componentDidMount(){
        //console.log(`Ticket key: ${this.props.index}, data: ${JSON.stringify(this.props.data)}`)
        this.setState({index:this.props.index ,data: this.props.data});
    }


    render(){
        let { index, data, claim } = this.state;
        data === null ? [] : data

        //console.log(`Data in ticket: ${data}`)
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
        if(claim === 0)
            return(
                <div className='win-message'>
                    <h2><span style={{'fontWeight':'bold'}}>Player {index}</span> is the winner!! Game over!!!</h2>
                </div>
            );
        
           
        else if(claim === 1)
                return(
                    <Modal
                    show={true}
                    dialogClassName="custom-modal">
                        <Modal.Body>
                        <h4>Bingo claim by <span style={{'fontWeight':'bold'}}>Player {index}</span> is wrong!! Game will continue!!!</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.hideModal}>Close</Button>
                        </Modal.Footer>
                  </Modal>
                );
        return(
            <div className='ticket'>
                {cell}
                <Button className='btn-claim' onClick = {this.checkBingoClaim} disabled={claim===0?true:false}>Claim Bingo</Button>
            </div>
        );
        
            
    }
}

export default Ticket;