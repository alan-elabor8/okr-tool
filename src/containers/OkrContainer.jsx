import React, {Component} from 'react';

/* Import Components */
import CheckBox from '../components/CheckBox';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Button from '../components/Button'

class OkrContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {

      typeOptions: ['Operational', 'Non-Operational'],
      benefitOptions: ['Financial', 'Non-fincancial'],

      newOkr: {
        objective: '',
        objectiveType: '',
        benefit: ''
      }

    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
       this.setState( prevState => ({ newOkr :
        {...prevState.newOkr, [name]: value
        }
      }), () => console.log(this.state.newOkr))
  }

  handleFormSubmit(e) {
    console.log("About to save");


    e.preventDefault();
    let okrData = this.state.newOkr;

    fetch('http://localhost:8080/okrs/1',{
        method: "PUT",
        body: JSON.stringify(okrData),
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
       newOkr: {
              objective: '',
              objectiveType: '',
              benefit: ''
            }
      })
  }

  render() {
    return (

        <form className="container-fluid" onSubmit={this.handleFormSubmit}>

            <Input inputType={'text'}
                   title= {'Objective'}
                   name= {'objective'}
                   value={this.state.newOkr.objective}
                   placeholder = {'Enter an objective'}
                   handleChange = {this.handleInput}
                   /> {/* Name of the OKR */}

          <Select title={'Type'}
                  name={'objectiveType'}
                  options={this.state.typeOptions}
                  value={this.state.newOkr.objectiveType}
                  placeholder={'Select Type'}
                  handleChange = {this.handleInput}
                  /> {/* Type Selection */}

          <Select title={'Benefit'}
                  name={'Benefit'}
                  options={this.state.benefitOptions}
                  value={this.state.newOkr.benefit}
                  placeholder={'Select Benefit'}
                  handleChange = {this.handleInput}
                  /> {/* Benefit Selection */}

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

    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default OkrContainer ;