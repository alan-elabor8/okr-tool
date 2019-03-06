import React, {Component} from 'react';
import {default as UUID} from "uuid";
import {Link} from "react-router-dom";

/* Import Components */
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button'


class OkrContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

      typeOptions: ['Operational', 'Aspirational'],
      benefitOptions: ['Financial', 'Non-fincancial'],

      newOkr: {
        objective: '',
        objectiveType: '',
        benefit: '',
        progress: 10
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
    let newId = this.state.id;
    console.log("newID : ", newId);
    fetch('http://localhost:8080/okrs/' ,{
        method: "POST",
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

componentWillMount() {
    this.id = UUID.v4();
    console.log("Generate UUID {this.id}" +UUID.v4());
  }

  render() {
    return (
        <div>
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
                  name={'benefit'}
                  options={this.state.benefitOptions}
                  value={this.state.newOkr.benefit}
                  placeholder={'Select Benefit'}
                  handleChange = {this.handleInput}
                  /> {/* Benefit Selection */}

            <Input inputType={'text'}
                   title= {'Metric'}
                   name= {'metric'}
                   value={this.state.newOkr.metric}
                   placeholder = {'Enter a metric'}
                   handleChange = {this.handleInput}
                   /> {/* Name of the metric */}

            <Input inputType={'text'}
                   title= {'Target'}
                   name= {'target'}
                   value={this.state.newOkr.target}
                   placeholder = {'Enter a target'}
                   handleChange = {this.handleInput}
                   /> {/* Name of the target */}

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

export default OkrContainer ;
