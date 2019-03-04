import React, {Component} from 'react';
import Button from '../components/Button'

class ViewContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        okrs: []
    }

    }


componentDidMount() {
    console.log("About to fetch data")
    fetch('http://localhost:8080/okrs')
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);

        let okrs = responseJson.map((okr) => {

            console.log(okr.objective);
            return(

                <p>{okr.id} {okr.objective}</p>
            )

        })

        this.setState({okrs: okrs});
        console.log("OKRS" , this.state.okrs);

    })
}



render() {
    return (
        <div className="container1">
        <div>{this.state.okrs}</div>
        </div>
    );
    }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default ViewContainer;