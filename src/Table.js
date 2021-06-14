import React from "react";
import DataGrid from 'react-data-grid';

//https://github.com/adazzle/react-data-grid/blob/main/stories/demos/AllFeatures.tsx
class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DataGrid
                columns={this.props.columns}
                rowsCount={this.props.rows.length}
                rows={this.props.rows}
                onRowClick={this.props.onRowClick}
            />
        );
    }
}

export default Table
