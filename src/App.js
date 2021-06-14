import React, { Component} from "react";
import "./App.css";
import Table from "./Table";
import Form from "./Form";
const axios = require('axios');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows(),
            columns: [
                {
                    key: 'id',
                    name: 'ID'
                },
                {
                    key: 'car_make',
                    name: 'Make'
                },
                {
                    key: 'car_model',
                    name: 'Model'
                },
                {
                    key: 'year',
                    name: 'Year'
                },
                {
                    key: 'variant',
                    name: 'Variant'
                }
            ]
        };

        this.saveForm = this.saveForm.bind(this);
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleFormTypeAheadInputChange = this.handleFormTypeAheadInputChange.bind(this);
    }

    createRows() {
        const rows = [];
        const url = process.env.REACT_APP_CARES_GUIDE_API+'/car';
        let temp = [];

        axios({
            method: 'get',
            url: url,
        }).then(function (response)  {
            for (let j = 0; j < response.data.rows.length; j++) {
                temp = Object.assign({
                    "id": response.data.rows[j].id,
                    "year": response.data.rows[j].year,
                    "variant":  response.data.rows[j].variant,
                    "car_make": response.data.rows[j]. car_make.make,
                    "car_model": response.data.rows[j]. car_model.model,
                });
                rows.push(temp);
            }
        }).catch(function (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            }
        });

        return rows;
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
            const row = response.data.new_car;
            const { rows } = self.state
            self.setState({rows: [...rows, row]});
            event.target.reset();
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
                    <Table rows={this.state.rows} columns={this.state.columns}/>
                </div>
            </div>
        );
    }
}

export default App;