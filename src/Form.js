import React from "react";
import TypeAhead from "./TypeAhead";
const axios = require('axios');

const { REACT_APP_CARES_GUIDE_API } = process.env;

class Form extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            make_id: {
                isLoading: false,
                options: [],// set them later in getOptions
                value: undefined
            },
            model_id: {
                isLoading: false,
                options: [],// set them later in getOptions
                value: undefined
            }
        };

        // This binding is necessary to make `this` work in the callback
        this.saveForm = this.saveForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.handleTypeAheadChange = this.handleTypeAheadChange.bind(this);
        this.onCreateOption = this.onCreateOption.bind(this);

        // First when page loads get the make options
        this.getOptions('make_id', REACT_APP_CARES_GUIDE_API+'/car-make');
    }

    saveForm(event) {
        this.props.saveForm(event);
    }

    // This method get called when html inputs get changed
    handleChange(event) {
        this.props.handleChange(event);
    }

    // This callback, get called from TypeAhead component to keep the value of make and model
    onInputChange(inputValue, fieldName) {
        this.props.onInputChange(inputValue, fieldName);
    }

    /** TypeAhead component methods **/
    // This method sends a request to API to ge the available options
    // depending on the field
    // for car make it will receive all the car makes
    // for car model it has to sends the car_make (params) to fetch the correct models
    getOptions(fieldName, url, params = {}) {
        let self = this;
        //TODO: call this method when user stop writing, then call the API to get optimized result

        // if data is available provide the value as data to the request
        // payload is make_id
        // to get the lis of correct models, pass the make_id
        let data = {};
        if (params) {
            // TODO: change to get multiple payload
            data = {params: params};
        }

        axios.get(url, data).then(function (response) {
            self.setState(prevState => ({
                [fieldName]: {                   // object that we want to update
                    ...prevState[fieldName],    // keep all other key-value pairs
                    options: response.data      // update the value of specific key
                }
            }));
        });
    }

    // This is when an option is selected in make_id or model_id
    handleTypeAheadChange(fieldName, newValue, updateOtherComponentOnChange) {
        const value = (newValue) ? newValue.value : null;
        const valueOption = (newValue) ? newValue : null; // this must be in {label:"label", value:"value"} format

        this.setState(prevState => ({
            [fieldName]: {                   // object that we want to update
                ...prevState[fieldName],    // keep all other key-value pairs
                value: valueOption               // update the value of specific key
            }
        }));

        this.onInputChange(value, fieldName);

        // when a car_make is selected, car model has to show correct data
        if (updateOtherComponentOnChange.length > 0) {
            if (value !== null) {
                // input.field_name => model_id
                // input.url url to get model
                // fieldName => make_id
                updateOtherComponentOnChange.forEach(input => this.getOptions(input.field_name, input.url, {[fieldName]: value}));
            } else {
                updateOtherComponentOnChange.forEach(input => {
                    this.setState(prevState => ({
                        [input.field_name]: {                   // object that we want to update
                            ...prevState[input.field_name],    // keep all other key-value pairs
                            options: [],
                            value: ''               // update the value of specific key
                        }
                    }));
                });
            }
        }
    }

    onCreateOption(fieldName, inputValue, payload = false, updateOtherComponentOnChange = []) {
        console.log("onCreateOption");
        // This method sends a request to the API to create a new record and receive the newly creates
        this.setState(prevState => ({
            [fieldName]: {                   // object that we want to update
                ...prevState[fieldName],    // keep all other key-value pairs
                isLoading: true               // update the value of specific key
            }
        }));
        const { options } = this.state[fieldName].options;
        let newOption;
        let self = this;
        let data = {};

        data = Object.assign({
            [fieldName]: inputValue
        });

        // payload_field_ids is like:
        // [
        // "make_id"
        // ]
        if (payload) {
            const field_ids = this.props.payload_field_ids;
            // data to post to create a new record will look like
            // {make_id: "1", model: "elentra"}
            field_ids.forEach((payload) => data[payload] = this.state[payload].value);
        }

        axios({
            method: 'post',
            url: this.props.get_newoption_endpoint,
            data: data
        }).then(function (response)  {
            if (response.data.result === 'success') {
                newOption = Object.assign({
                    'label': response.data.data.label,
                    'value': response.data.data.value
                });

                self.setState(prevState => ({
                    [fieldName]: {                   // object that we want to update
                        isLoading: false,
                        options: [...options, newOption],
                        value: newOption
                    }
                }));

                // Call the parent method to keep the value in its state
                self.props.onInputChange(newOption, self.props.name);
            }
        }).catch(function (error) {
            if (error.response && error.response.status === 400) {
                self.setState({
                    isLoading: false,
                    value: {'label': error.response.data.message, 'value': null}
                });
            }
        });
    }

    render() {

        //TODO: Fix the issue of car_model type ahead. when the value of the car_make changes it does not change the
        // options of the car_mode accordingly
        const make_options = this.state.make_id.options;
        const model_options = this.state.model_id.options;

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
                                get_typeahead_endpoint={REACT_APP_CARES_GUIDE_API+'/car-make'}// the get url to fetch all the options
                                get_newoption_endpoint={REACT_APP_CARES_GUIDE_API+"/car-make"}// the post url to create a new make
                                additional_post_payload={false}
                                onInputChange={this.onInputChange}

                                options={make_options}
                                isLoading={this.state.make_id.isLoading}
                                value={this.state.make_id.value}
                                onChange={this.handleTypeAheadChange}
                                onCreateOption={this.onCreateOption}
                                updateOtherComponentOnChange={[{field_name: "model_id", url: REACT_APP_CARES_GUIDE_API+'/car-model'}]}
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
                                get_typeahead_endpoint={REACT_APP_CARES_GUIDE_API+'/car-model'}
                                get_newoption_endpoint={REACT_APP_CARES_GUIDE_API+'/car-model'}
                                additional_post_payload={true}
                                payload_field_ids={["make_id"]}
                                onInputChange={this.onInputChange}

                                options={model_options}
                                isLoading={this.state.model_id.isLoading}
                                value={this.state.model_id.value}
                                onChange={this.handleTypeAheadChange}
                                onCreateOption={this.onCreateOption}
                                updateOtherComponentOnChange={[]}
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

