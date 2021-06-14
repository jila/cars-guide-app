import React, { Component} from "react";
import "./App.css";
import Table from "./Table";
import Form from "./Form";
const axios = require('axios');

class App extends Component {
    constructor(props) {
        super(props);

        this.saveForm = this.saveForm.bind(this);
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleFormTypeAheadInputChange = this.handleFormTypeAheadInputChange.bind(this);
    }

    saveForm(event) {
        event.preventDefault();
        const url = process.env.REACT_APP_CARES_GUIDE_API+'/car';
        const self = this;

        axios({
            method: 'post',
            url: url,
            data: this.state
        }).then(function (response)  {
            self.setState({});
            event.target.reset();
            //ReactDOM.unmountComponentAtNode(document.getElementById("make_id"));
        }).catch(function (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            }
        });
    }

    // This method get called when html inputs get changed
    handleFormInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleFormTypeAheadInputChange(inputValue, fieldName) {
        this.setState({
            [fieldName]: inputValue
        });
    }



    render(){
        return(
            <div className="container">
                <div className="row">
                    <Form saveForm={this.saveForm}
                          handleChange={this.handleFormInputChange}
                          onInputChange={this.handleFormTypeAheadInputChange}
                    />
                </div>
                <div className="row">
                    <Table />
                </div>
            </div>
        );
    }
}

export default App;