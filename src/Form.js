import React from "react";

class Form extends React.Component
{

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.saveForm.bind(this);
    }

    saveForm = (event) => {
        event.preventDefault();
        console.log(event.target);
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.saveForm}>
                    <div className="row">
                        <div className="col">
                            <label  className="form-label">ID
                                <input type="text" className="form-control" name="id" id="id" placeholder="ID"/>
                            </label>
                        </div>
                        <div className="col">
                            <label  className="form-label">Make
                                <input type="text" className="form-control" name="make" id="make" />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Model
                                <input type="text" className="form-control" name="model" id="model" />
                            </label>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Year
                                <input type="text" className="form-control" name="make" id="make" />
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label for="variant" className="form-label">Variant
                                    <input type="text" className="form-control" name="variant" id="variant"  />
                                </label>
                            </div>
                            <div className="col-md-6">
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