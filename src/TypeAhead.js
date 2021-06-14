import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';

const axios = require('axios');

// This component creates an input box whit the list of the available options
// if the option doesn't exist
class TypeAhead extends Component
{
    constructor(props, context) {
        super(props, context);
    }

    getOptions () {
        return this.props.getOptions(this.props.name, this.props.get_typeahead_endpoint);
    }

    handleCreate(inputValue) {
        this.props.onCreateOption(this.props.name,
            inputValue,
            this.props.new_option_input_name,
            this.props.get_newoption_endpoint,
            this.props.payload_field_ids,
            this.props.updateOtherComponentOnChange
        );

    };

    handleChange = (newValue) => {
        this.props.onChange(this.props.name, newValue, this.props.updateOtherComponentOnChange);
    };

    render() {

        return (
            <CreatableSelect
                isClearable
                isDisabled={this.props.isLoading}
                onChange={this.handleChange.bind(this)}
                onCreateOption={this.handleCreate.bind(this)}
                placeholder={this.props.placeholder}
                options={this.props.options}
                isLoading={this.props.isLoading}
                value={this.props.value}
            />
        );
    }
}

export default TypeAhead;