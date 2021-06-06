import React, { Component} from "react";

class Table extends Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Make</th>
                    </tr>
                   <tr>
                       <th></th>
                       <th><input type="text" /></th>
                   </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ABC123</td>
                        <td>Mazda</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Table