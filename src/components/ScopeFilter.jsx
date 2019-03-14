import React from 'react'

class ScopeFilter extends React.Component {

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

export default ScopeFilter;