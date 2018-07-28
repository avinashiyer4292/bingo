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
        this.hideModal = this.hideModal.bind(this);

    }

    checkBingoClaim(){
        let data = this.state.data;
        fetch('/claimBingo', {
            method: 'post',
            body: JSON.stringify({data:data}),
            headers: {"Content-Type": "application/json"}
          }).then(response => response.json())
            .then(json =>  this.setState({claim:json})) 
            .catch(err => console.log(`Error in checking claim!!!`));
    }

    hideModal(){
        this.setState({claim: -1});
    }

    componentDidMount(){
        this.setState({index:this.props.index ,data: this.props.data});
    }


    render(){
        let { index, data, claim } = this.state;
        data === null ? [] : data
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
        let fade = claim === 0 ? ' fade' : '',
            disabled = claim === 0 ? true : false;
        if(claim === 0)
            return(
                <div className='win-message'>
                    <h2><span className='span-style'>Player {index}</span> is the winner!! Game over!!!</h2>
                </div>
            );
         
        else if(claim === 1)
                return(
                    <Modal
                    show={true}
                    dialogClassName="custom-modal">
                        <Modal.Body>
                        <h4>Bingo claim by <span className='span-style'>Player {index}</span> is wrong!! Game will continue!!!</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.hideModal}>Close</Button>
                        </Modal.Footer>
                  </Modal>
                );
        
        return(
            <div className={'ticket' + fade}>
                <div className='player-name'>Player {index}</div>
                {cell}
                <Button className='btn-claim' onClick = {this.checkBingoClaim} disabled={disabled}>Claim Bingo</Button>
            </div>
        );
        
            
    }
}

export default Ticket;