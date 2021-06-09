import React from "react";
import TypeAhead from "./TypeAhead";
const axios = require('axios');

class Form extends React.Component
{

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.saveForm.bind(this);
    }

    saveForm(event) {
        event.preventDefault();
        console.log(event.target);
    }

    render() {

        return (
            <div className="container">
                <form onSubmit={this.saveForm}>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">ID
                                <input type="text" className="form-control" name="id" id="id" placeholder="ID"/>
                            </label>
                        </div>
                        <div className="col">
                            <label className="form-label">Make</label>
                                <input type="hidden" className="form-control" name="make_id" id="make_id" />
                                <TypeAhead
                                    name={"make_id"}
                                    field_id={"make_id"}
                                    id={"makes"}
                                    new_option_input_name={"make"}//this sends to the api to create a new record and receive the id
                                    placeholder={"Make...."}
                                    get_typeahead_endpoint={'http://127.0.0.1:8000/api/car-make?beautify=1'}
                                    get_newoption_endpoint={"http://127.0.0.1:8000/api/car-make"}
                                />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Model
                                <input type="text" className="form-control" name="model" id="model" />
                            </label>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Year
                                <input type="text" className="form-control" name="make" id="make" />
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label">Variant
                                    <input type="text" className="form-control" name="variant" id="variant"  />
                                </label>
                            </div>
                            <div className="col-md-6">
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