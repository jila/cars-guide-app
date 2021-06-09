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
                <form onSubmit={this.saveForm.bind(this)}>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">ID</label>
                            <input type="text" className="form-control" name="id" id="id" placeholder="ID"/>
                        </div>
                        <div className="col">
                            <label className="form-label">Make</label>
                                <input type="hidden" className="form-control" name="make_id" id="make_id" />
                                <TypeAhead
                                    name={"make_id"}
                                    field_id={"make_id"}
                                    id={"makes"}
                                    new_option_input_name={"make"}//this sends to the api to create a new record and receive the id
                                    placeholder={"Make..."}
                                    get_typeahead_endpoint={'http://127.0.0.1:8000/api/car-make?beautify=1'}
                                    get_newoption_endpoint={"http://127.0.0.1:8000/api/car-make"}
                                    additional_post_payload={false}
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
                            />
                        </div>
                        <div className="col">
                            <label className="form-label">Year</label>
                                <input type="text" className="form-control" name="make" id="make" />
                        </div>
                        <div className="row">
                            <div className="col">
                                <label className="form-label">Variant</label>
                                    <input type="text" className="form-control" name="variant" id="variant"  />
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