import React from "react";
import TypeAhead from "./TypeAhead";
const axios = require('axios');

class Form extends React.Component
{

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.saveForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    saveForm(event) {
        event.preventDefault();

        console.log();
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/car',
            data: this.state
        }).then(function (response)  {

        }).catch(function (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            }
        });
    }

    // This method get called when html inputs get changed
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // This callback, get called from TypeAhead component to keep the value of make and model
    onInputChange(inputValue, fieldName)
    {
        console.log(inputValue);
        this.setState({
            [fieldName]: inputValue.value
        });
    }

    render() {

        return (
            <div className="container">
                <form onSubmit={this.saveForm.bind(this)} >
                    <div className="row">
                        <div className="col">
                            <label className="form-label">ID</label>
                            <input type="text" className="form-control" name="id" id="id" placeholder="ID" onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                            <label className="form-label">Make</label>
                                <input type="hidden" className="form-control" name="make_id" id="make_id" onChange={this.handleChange} />
                                <TypeAhead
                                    name={"make_id"}
                                    field_id={"make_id"}
                                    id={"makes"}
                                    new_option_input_name={"make"}//this sends to the api to create a new record and receive the id
                                    placeholder={"Make..."}
                                    get_typeahead_endpoint={'http://127.0.0.1:8000/api/car-make?beautify=1'}
                                    get_newoption_endpoint={"http://127.0.0.1:8000/api/car-make"}
                                    additional_post_payload={false}
                                    onInputChange={this.onInputChange}
                                />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Model</label>
                            <input type="hidden" className="form-control" name="model_id" id="model_id" />
                            <TypeAhead
                                name={"model_id"}
                                field_id={"model_id"}
                                id={"models"}
                                new_option_input_name={"model"}//this sends to the api to create a new record and receive the id
                                placeholder={"Model..."}
                                get_typeahead_endpoint={'http://127.0.0.1:8000/api/car-model?beautify=1'}
                                get_newoption_endpoint={"http://127.0.0.1:8000/api/car-model"}
                                additional_post_payload={true}
                                payload_field_ids={["make_id"]}
                                onInputChange={this.onInputChange}
                            />
                        </div>
                        <div className="col">
                            <label className="form-label">Year</label>
                                <input type='number'
                                       min="1800"
                                       max="9999"
                                       className="form-control"
                                       name="year"
                                       id="year"
                                       onChange={this.handleChange} />
                        </div>
                        <div className="row">
                            <div className="col">
                                <label className="form-label">Variant</label>
                                    <input type="text" className="form-control" name="variant" id="variant" onChange={this.handleChange} />
                            </div>
                            <div className="col">
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}
export default Form;