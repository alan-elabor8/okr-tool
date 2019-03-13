import React from 'react'
import Input from '../components/Input';
import Button from '../components/Button'

class EditKeyResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newKeyResult: {
              objectiveId: '',
              keyresult: '',
              targetdate: '',
              squad: ''
            }
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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


   async  handleFormSubmit(e) {
    console.log("About to save key result edit");

    e.preventDefault();
    let keyResultData = this.state.newKeyResult;
    await fetch(`http://54.252.237.254:8080/keyresults/${this.props.match.params.id}` ,{
        method: "PUT",
        body: JSON.stringify(keyResultData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successfully saved key result edit" + data);
        })
    })
    this.props.history.push(`/keyresults/${keyResultData.objectiveId}`)
  }

  componentDidMount() {
    console.log("About to fetch key result data for", this.props.match.params.id)
    fetch(`http://54.252.237.254:8080/keyresults/${this.props.match.params.id}`)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log("Response", responseJson);

        this.setState({newKeyResult: responseJson})
        console.log("Okrs saved in state: " , this.state.newKeyResult);

    })
}

    render() {
        return(
            <div>
            <h1>Edit Key Result {this.props.match.params.id}</h1>
            <form className="container-fluid" onSubmit={this.handleFormSubmit}>
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

export default EditKeyResult;