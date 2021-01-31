import axios from "axios";
import React from "react";
import EmployeeDetails from "./employee"

class App extends React.Component {
        constructor() {
                super()
                this.updateEmpName = ""
        }
        state = {
                name: '',
                age: "",
                message: "",
                flag: false,
                datarefresh: false,
                error:""
        }
        handleChange = (e) => {
                let filedName = e.target.name
                let fieldValue = e.target.value
                this.setState({ [filedName]: fieldValue })
        }
        submit = (e) => {
                axios.post("http://localhost:2000/InsertEmployee", this.state)
                        .then((response) => this.setState({ message: response.data.message, flag: false, datarefresh: false }))
                        .catch((err) => {this.setState({error:err.response.data.message})})
        }
        update = (employee) => {
                this.updateEmpName = employee.name
                this.setState({ name: employee.name, age: employee.age, flag: true, datarefresh: false, message: "" })
        }
        updateRecords = (e) => {
                e.preventDefault()
                let prevName = this.updateEmpName
                let records = { ...this.state, prevName }
                axios.post("http://localhost:2000/updateEmployeeDetails", records)
                        .then((response) => {
                                this.setState({ message: response.data.message, flag: false, datarefresh: true })
                        })
                        .catch((err) => {this.setState({error:err.response.data.message})})
        }
        render() {
                return (
                        <div className="row">
                                <div className="col-md-6 offset-md-3">
                                        <form>
                                                <div className="form-group">
                                                        <label>Name:</label>
                                                        <input className="form-control" type="text" name="name" onChange={this.handleChange} value={this.state.name}></input>
                                                </div>
                                                <div className="form-group">
                                                        <label>Age:</label>
                                                        <input className="form-control" type="text" name="age" onChange={this.handleChange} value={this.state.age}></input>
                                                </div>
                                                {this.state.flag ? <button className="btn btn-info" onClick={this.updateRecords}>Update</button> : <button type="button" className="btn btn-success" onClick={this.submit}>Save</button>}
                                        </form>
                                        <div className="text-success">{this.state.message}</div>

                                </div>
                                <EmployeeDetails data={this.state.flag} btn={this.state.datarefresh} update={this.update}></EmployeeDetails>
                        </div>
                )
        }
}

export default App;
