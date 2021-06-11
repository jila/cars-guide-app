import React from "react";
import DataGrid from 'react-data-grid';
const axios = require('axios');

//https://github.com/adazzle/react-data-grid/blob/main/stories/demos/AllFeatures.tsx
class Table extends React.Component {

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

    render() {
        return (
            <DataGrid columns={this.state.columns} rowsCount={this.state.rows.length} rows={this.state.rows} />
        );
    }
}

export default Table
