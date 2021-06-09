import React, { Component} from "react";
import "./App.css";
import Table from "./Table";
import Form from "./Form";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div className="container">
                <Form />
            </div>
        );
    }
}

export default App;