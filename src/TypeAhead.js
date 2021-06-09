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
        axios({
            method: 'post',
            url: this.props.get_newoption_endpoint,
            data: {
                [this.props.new_option_input_name]: inputValue
            }
        }).then(function (response)  {
            if (response.data.result === 'success') {
                newOption = Object.assign({
                    'label': response.data.data.label,
                    'value': response.data.data.key
                });

                self.setState({
                    isLoading: false,
                    options: [...options, newOption],
                    value: newOption,
                });
                document.getElementById(self.props.field_id).value = newOption.value;
            }
        }).catch(function (error) {
            console.log(error);
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
            />
        );
    }
}

export default TypeAhead;