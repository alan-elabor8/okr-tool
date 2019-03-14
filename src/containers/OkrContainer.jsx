import React, {Component} from 'react';
import {default as UUID} from "uuid";
import { withRouter } from 'react-router';

/* Import Components */
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button'
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class OkrContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      typeOptions: ['Operational', 'Aspirational'],
      benefitOptions: ['Financial', 'Non-fincancial'],
      okrScope: ['Enterprise', 'Division','Team'],
      recognitionProfile: ['Linear', 'Linear Rampup', 'Fast Rampup', 'Slow Rampup', 'N/A'],
      yesNo: ['Yes', 'No'],

      newOkr: {
        objective: '',
        objectiveType: '',
        benefit: '',
        progress: 10,
        team : '',
        okrScope : '',
        startdate : '',
        enddate : '',
        recognitionProfile : '',
        benefitTracable : ''
      }

    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
    this.setState( prevState => ({ newOkr :
      {...prevState.newOkr, startdate: date
      }
    }));
    console.log("Date set to:", date)
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
    this.setState( prevState => ({ newOkr :
      {...prevState.newOkr, enddate: date
      }
    }));
    console.log("Date set to:", date)
  }

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
    fetch('http://54.252.237.254:8080/okrs/' ,{
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
    this.props.history.push('/home')
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
          <h2>Create Objective</h2>
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>

            <Input inputType={'text'}
                   title= {'Objective'}
                   name= {'objective'}
                   value={this.state.newOkr.objective}
                   placeholder = {'Enter an objective'}
                   handleChange = {this.handleInput}
                   /> {/* Name of the OKR */}

            <Select title={'Scope'}
                  name={'okrScope'}
                  options={this.state.okrScope}
                  value={this.state.newOkr.okrScope}
                  placeholder={'Select Scope'}
                  handleChange = {this.handleInput}
                  /> {/* Type Selection */}

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

            <Input inputType={'text'}
                   title= {'Team'}
                   name= {'team'}
                   value={this.state.newOkr.team}
                   placeholder = {'Enter a team name'}
                   handleChange = {this.handleInput}
                   /> {/* Name of the target */}
                  <hr></hr>
                   <div >
                     <label>Benefit Horizon</label>
                     <div className='form-inline'>
                    
                    <div className="form-group">
                      <label>Select Start Date: </label>
                      <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange}
                      name="startDate"
                      /> 
                    </div>
                    <label>Select End Date: </label>
                      <DatePicker
                      selected={this.state.endDate}
                      onChange={this.handleEndDateChange}
                      name="startDate"
 
                      /> 
                    
                   
                      </div>
                      <hr></hr>
                   </div>
                   <Select title={'Benefit Tracable'}
                    name={'benefitTracable'}
                    options={this.state.yesNo}
                    value={this.state.newOkr.benefitTracable}
                    placeholder={'Select benefit tracable'}
                    handleChange = {this.handleInput}
                  /> {/* Type Selection */}

                   <Select title={'Recognition Profile'}
                    name={'recognitionProfile'}
                    options={this.state.recognitionProfile}
                    value={this.state.newOkr.recognitionProfile}
                    placeholder={'Select recognition profile'}
                    handleChange = {this.handleInput}
                  /> {/* Type Selection */}
              
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

export default withRouter(OkrContainer) ;
