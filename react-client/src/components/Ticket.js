import React , {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Ticket extends Component {
    constructor(props){
        super(props);
        
        this.state={
            key:-1,
            data: null
        }
    }

    componentWillMount(){
        
    }
    componentDidMount(){
        console.log(`Ticket key: ${this.props.data}, data: ${JSON.stringify(this.props.data)}`)
        this.setState({key:this.props.key,data: this.props.data});
    }

    render(){
        return(
            <div>Hi</div>
        );
    }
}

export default Ticket;