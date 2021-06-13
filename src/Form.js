import React from "react";
import TypeAhead from "./TypeAhead";
import ReactDOM from "react-dom";

const { REACT_APP_CARES_GUIDE_API } = process.env;

class Form extends React.Component
{

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.saveForm = this.saveForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    saveForm(event) {
        this.props.saveForm(event);
    }

    // This method get called when html inputs get changed
    handleChange(event) {
        this.props.handleChange(event);
    }

    // This callback, get called from TypeAhead component to keep the value of make and model
    onInputChange(inputValue, fieldName)
    {
        this.props.onInputChange(inputValue, fieldName);
    }

    render() {

        //TODO: Fix the issue of car_model type ahead. when the value of the car_make changes it does not change the
        // options of the car_mode accordingly

        return (
            <div className="container">
                <form onSubmit={this.saveForm} >
                    <div className="row">
                        <div className="col">
                            <label className="form-label">ID</label>
                            <input type="text" className="form-control" name="id" id="id" placeholder="ID"
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="col">
                            <label className="form-label">Make</label>
                                <input type="hidden" className="form-control" name="make_id" id="make_id"
                                       onChange={this.handleChange} />
                                <TypeAhead
                                    name={"make_id"}
                                    field_id={"make_id"}
                                    id={"makes"}
                                    new_option_input_name={"make"}//this sends to the api to create a new record and receive the id
                                    placeholder={"Make..."}
                                    get_typeahead_endpoint={REACT_APP_CARES_GUIDE_API+'/car-make'}
                                    get_newoption_endpoint={REACT_APP_CARES_GUIDE_API+"/car-make"}
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
                                get_typeahead_endpoint={REACT_APP_CARES_GUIDE_API+'/car-model?beautify=1'}
                                get_newoption_endpoint={REACT_APP_CARES_GUIDE_API+'/car-model'}
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
