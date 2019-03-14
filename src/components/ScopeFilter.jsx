import React from 'react'

class ScopeFilter extends React.Component {

    constructor(props) {
        super(props);
      }

    render() {
        return(
            <div>
            <label>
              Select Scope:
              <select  onChange={this.props.handleChange}>
                <option value="All">All</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Division">Division</option>
                <option value="Team">Team</option>
              </select>
            </label>

            </div>
        ) 
    }
}

const buttonStyle = {
    margin : '10px 10px 10px 10px'
  }

export default ScopeFilter;