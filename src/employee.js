import axios from "axios";
import React from "react";
class EmployeeDetails extends React.Component {
    state = { employees: [],error:"" }
    showRecords = () => {
        axios.get("http://localhost:2000/retreiveEmployeelist")
            .then((response) => {
                this.setState({ employees: response.data })
            })
            .catch((err) => {this.setState({error:err.response.data.message})})
    }
    edit = (employee) => {
        this.props.update(employee)
    }

    render() {
        return (
            <div className="col-md-4 offset-md-4">
                {this.props.btn ? <button type="button" onClick={this.showRecords} className="btn btn-info">Refresh Records</button> : <button type="button" onClick={this.showRecords} className="btn btn-info">Show Records</button>}
                {this.state.employees.length ?
                    <table className='table table-striped'>
                        <thead >
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map((employee, id) => {
                                return (<tr key={id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.age}</td>
                                    <td><button className="btn btn-primary" onClick={e => this.edit(employee)}>Edit</button></td>
                                </tr>)
                            })
                            }
                        </tbody>
                    </table>
                    : ""}
            </div>
        )
    }

}

export default EmployeeDetails