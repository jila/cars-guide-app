import React from "react";
import DataGrid from 'react-data-grid';
const axios = require('axios');

//https://github.com/adazzle/react-data-grid/blob/main/stories/demos/AllFeatures.tsx
class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    getColumns() {
       return [
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
        ];
    }

    createRows() {
        const rows = [];
        const url = 'http://127.0.0.1:8000/api/car';
        let temp = [];

        axios({
            method: 'get',
            url: url,
        }).then(function (response)  {
            // Add an arbitrary column to the data returned
            // from the server to show the row number.
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

        this.setState({
            'rows': rows
        })
        return rows;
    }

    render() {
        const rows = this.createRows();
        const columns = this.getColumns();
        return (
            <DataGrid columns={columns} rows={rows} />
        );
    }
}

export default Table