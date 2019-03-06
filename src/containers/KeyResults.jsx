import React, {Component} from 'react';
import Input from '../components/Input';
import Button from '../components/Button'
import {Link} from "react-router-dom";
import SingleOKR from './SingleOKR';

class KeyResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
          newKeyResult: {
            objectiveId: this.props.match.params.id,
            keyresult: '',
            targetdate: '',
            squad: ''
          },


      }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
       this.setState( prevState => ({ newKeyResult :
        {...prevState.newKeyResult, [name]: value
        }
      }), () => console.log(this.state.newKeyResult))
  }

  handleFormSubmit(e) {
    console.log("About to save");

    e.preventDefault();
    let keyResultData = this.state.newKeyResult;
    fetch('http://localhost:8080/keyresults/' ,{
        method: "POST",
        body: JSON.stringify(keyResultData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })

  }

  handleClearForm(e) {

      e.preventDefault();

      this.setState({
       newKeyResult: {
              keyresult: '',
              targetdate: '',
              squad: ''
            }
      })
  }

componentDidMount() {
      console.log("About to fetch objective data for objective", this.props.match.params.id)
      fetch(`http://localhost:8080/okrs/${this.props.match.params.id}`)
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("Response", responseJson);

          this.setState({okr: responseJson})
          console.log("Okrs saved in state: " , this.state.okr);

      })
}

render() {


    return (
        <div className="col-md-10">

        <div>KeyResults for {this.props.match.params.id}</div>
        <Link to='/home'>Home</Link>
        <div>
        <SingleOKR id={this.props.match.params.id}/>
        </div>
        <h3>Enter Key Result</h3>
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>

            <Input inputType={'text'}
                   title= {'Key Result'}
                   name= {'keyresult'}
                   value={this.state.newKeyResult.keyresult}
                   placeholder = {'Enter a key result'}
                   handleChange = {this.handleInput}
                   /> {/* Name of the KeyResult */}

           <Input inputType={'text'}
                   title= {'Target Date'}
                   name= {'targetdate'}
                   value={this.state.newKeyResult.targetdate}
                   placeholder = {'Enter a target date'}
                   handleChange = {this.handleInput}
                   /> {/* Name of the KeyResult */}

          <Input inputType={'text'}
                  title= {'Squad'}
                  name= {'squad'}
                  value={this.state.newKeyResult.squad}
                  placeholder = {'Enter squad'}
                  handleChange = {this.handleInput}
                  /> {/* Name of the squad */}

          <Button
              action = {this.handleFormSubmit}
              type = {'primary'}
              title = {'Submit'}
            style={buttonStyle}
          /> { /*Submit */ }

          <Button
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          /> {/* Clear the form */}

        </form>
        </div>
    );
}
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default KeyResults;