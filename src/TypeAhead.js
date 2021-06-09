import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';

const axios = require('axios');

class TypeAhead extends Component
{
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: false,
            options: [],// set them later in getOptions
            value: undefined,
        };

        this.getOptions(this);
    }

    getOptions (self)
    {
        axios.get(this.props.get_typeahead_endpoint).then(function (response) {
            self.setState({options: response.data});
        });

    }

    handleCreate(inputValue) {
        // This method sends a request to the API to create a new record and receive the newly creates
        this.setState({ isLoading: true });
        const { options } = this.state;
        let newOption;
        let self = this;
        let data = {};

        data = Object.assign({
            [this.props.new_option_input_name]: inputValue
        });

        // payload_field_ids is like:
        // [
        // "make_id"
        // ]
        if (this.props.additional_post_payload) {
            const field_ids = this.props.payload_field_ids;
            // data to post to create a new record will look like
            // {make_id: "1", model: "elentra"}
            field_ids.forEach((payload) => data[payload] = document.getElementById(payload).value);
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

                self.setState({
                    isLoading: false,
                    options: [...options, newOption],
                    value: newOption,
                });
                document.getElementById(self.props.field_id).value = newOption.value;

                // Call the parent method to keep the value in its state
                self.props.onInputChange(self.state);
            }
        }).catch(function (error) {
            if (error.response && error.response.status === 400) {
                self.setState({
                    isLoading: false,
                    value: {'label': error.response.data.message, 'value': null}
                });
            }
        });
    };

    handleChange = (newValue) => {
        if (newValue) {
            document.getElementById(this.props.field_id).value = newValue.value;
            this.setState({value: newValue});
        } else {
            document.getElementById(this.props.field_id).value = null;
            this.setState({value: null});
        }

        this.props.onInputChange(this.state);
    };

    render() {
        const { isLoading, options, value } = this.state;

        return (
            <CreatableSelect
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={this.handleChange.bind(this)}
                onCreateOption={this.handleCreate.bind(this)}
                options={options}
                value={value}
                placeholder={this.props.placeholder}
            />
        );
    }
}

export default TypeAhead;