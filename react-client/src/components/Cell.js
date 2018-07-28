import React , {Component} from 'react';
import '../App.css';

class Cell extends Component{
    constructor(props){
        super(props)
        this.state={
            value: -1,
            zone: null
        }
    }

    componentDidMount(){
        this.setState({value: this.props.value, zone: this.props.zone})
    }

    render(){
        let selected = this.props.value === 'X' ? 'selected-' : '';
        let  { value, zone } = this.props;
        let playerColor;
        if(zone === 1)
            playerColor='red'
        else if(zone === 2)
            playerColor='green'
        else if(zone === 3)
            playerColor='blue'
         else
            playerColor='yellow'

        selected = selected + playerColor;
        return(
            <div className={'cell '+ selected}>
                {value}
            </div>
        );
    }
}

export default Cell; 