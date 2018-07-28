import React, {Component} from 'react';
import { Row } from  'react-bootstrap';
import Cell from './Cell';
import '../App.css';

class TicketRow extends Component{
    constructor(props){
        super(props);
        this.state={
            zone: null,
            rowData: []
        }
    }

    componentDidMount(){
        this.setState({zone: this.props.zone, rowData: this.props.data});
    }

    render(){
        let { zone, data } = this.props;
        //console.log(`Ticket row data: ${data}`);
        return(
            <Row className='ticket-row'>
            {
            data.map( (curr, index) =>{
                    return( <Cell value={curr} key={index} zone={zone} />);
                })
            }
            </Row>
            
        );
    }
}

export default TicketRow;