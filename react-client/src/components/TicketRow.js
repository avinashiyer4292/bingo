import React, {Component} from 'react';
import { Row } from  'react-bootstrap';
import Cell from './Cell';
import '../App.css';

class TicketRow extends Component{
    constructor(props){
        super(props)
        this.state={
            zone: null,
            rowData: []
        }
    }

    componentDidMount(){
        this.setState({zone: this.props.zone, rowData: this.props.data})
    }

    render(){
        let { rowData, zone } = this.state;
        console.log(`Ticket row data: ${rowData}`);
        return(
            <Row className='ticket-row'>
            {
            rowData.map( (curr, index) =>{
                    return( <Cell value={curr} key={index} zone={zone} />);
                })
            }
            </Row>
            
        );
    }
}

export default TicketRow;