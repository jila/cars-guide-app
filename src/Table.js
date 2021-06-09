import React from "react";
import DataGrid from 'react-data-grid';


class Table extends React.Component {



    render() {
        const columns = [
            { key: 'id', name: 'ID' },
            { key: 'title', name: 'Title' },
            { key: 'count', name: 'Count' } ];

        const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];
        return (
            <DataGrid columns={columns} rows={rows} />
        );
    }
}

export default Table