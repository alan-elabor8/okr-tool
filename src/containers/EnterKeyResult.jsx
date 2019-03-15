import React from 'react'
import {Component} from 'react'
import Input from '../components/Input';
import Button from '../components/Button'
import DatePicker from 'react-datepicker';
import { withRouter } from 'react-router';

class EnterKeyResult extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
              newKeyResult: {
                objectiveId: this.props.match.params.id,
                keyresult: '',
                targetdate: '',
                squad: ''
              },
              targetDate: new Date()
    
          }
    
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleTargetDateChange = this.handleTargetDateChange.bind(this);
      }


    handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState( prevState => ({ newKeyResult :
        {...prevState.newKeyResult, [name]: value
        }
    }), () => console.log(this.state.newKeyResult))
    }    
 
   handleTargetDateChange(date) {
     this.setState({
       targetdate: date
     });
     this.setState( prevState => ({ newKeyResult :
       {...prevState.newKeyResult, targetdate: date
       }
     }));
     console.log("Date set to:", date)
   }
 
   async handleFormSubmit(e) {
     console.log("About to save");
 
     e.preventDefault();
     let keyResultData = this.state.newKeyResult;
     await fetch('http://54.252.237.254:8080/keyresults/' ,{
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
     this.props.history.push(`/keyresults/${this.props.match.params.id}`)
   }

    render() {

        return (
            <div>
                <h3>Enter Key Result</h3>

                <form className="container-fluid" onSubmit={this.handleFormSubmit}>

                    <Input inputType={'text'}
                            title= {'Key Result'}
                            name= {'keyresult'}
                            value={this.state.newKeyResult.keyresult}
                            placeholder = {'Enter a key result'}
                            handleChange = {this.handleInput}
                            /> {/* Name of the KeyResult */}

                    <div>
                    <label>Select Target Date: </label>
                                <DatePicker
                                selected={this.state.targetdate}
                                onChange={this.handleTargetDateChange}
                                name="targetDate"
                                /> 
                    </div>  
                    <Input inputType={'text'}
                            title= {'Progress'}
                            name= {'progress'}
                            value={this.state.newKeyResult.progress}
                            placeholder = {'Enter progress'}
                            handleChange = {this.handleInput}
                            /> {/* Amount of progress */}

                    <Button
                        action = {this.handleFormSubmit}
                        type = {'primary'}
                        title = {'Submit'}
                    style={buttonStyle}
                    /> { /*Submit */ }

                </form>
            </div>
        )

    }
   
}

const buttonStyle = {
    margin : '10px 10px 10px 10px'
  }

export default EnterKeyResult