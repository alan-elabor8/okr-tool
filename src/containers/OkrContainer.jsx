import React, {Component} from 'react';
import {default as UUID} from "uuid";
import {Link} from "react-router-dom";

/* Import Components */
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button'
import ViewContainer from './ViewContainer';


class OkrContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

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

                   <div style={rowstyle} >
                     <h5>Benefit Horizon</h5>
                     <Input inputType={'text'}
                        title= {'Start Date'}
                        name= {'startdate'}
                        value={this.state.newOkr.startdate}
                        placeholder = {'Enter a startdate'}
                        handleChange = {this.handleInput}
                      /> 
                     <Input inputType={'text'}
                        title= {'End Date'}
                        name= {'enddate'}
                        value={this.state.newOkr.enddate}
                        placeholder = {'Enter an enddate'}
                        handleChange = {this.handleInput}
                      /> 

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
        <ViewContainer />
        </div>
    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

const rowstyle = {
    flex: 1,
    flexDirection: 'row'
}

export default OkrContainer ;
