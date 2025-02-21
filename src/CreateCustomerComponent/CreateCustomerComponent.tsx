import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import './CreateCustomerComponent.css';

export interface IValues {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    description: string,
}

class CreateCustomerComponent extends Component<any, any> {
    first_name: any;
    last_name: any;
    phone: any;
    email: any;
    address: any;
    description: any;
    constructor(props: any) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            description: '',
            values: [],
            loading: false,
            submitSuccess: false,
            isCreateCustomer: true
        }
        this.onCancelClick = this.onCancelClick.bind(this);
        this.homeClick = this.homeClick.bind(this);
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        if (e) {
            //e.preventDefault();
        }
        this.setState({ loading: true });

        const formData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            description: this.state.description,
        }

        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

        axios.post(`http://localhost:5000/customers`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 250)
        ]);
    }

    private onCancelClick() {
        this.props.history.push('/');
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        if (e && e.currentTarget) {
            this.setState({
                [e.currentTarget.name]: e.currentTarget.value,
            });

            if (e.currentTarget.name == "first_name") {
                this.first_name = e.currentTarget.value;
            }
            else if (e.currentTarget.name == "last_name") {
                this.last_name = e.currentTarget.value;
            }
            else if (e.currentTarget.name == "phone") {
                this.phone = e.currentTarget.value;
            }
            else if (e.currentTarget.name == "email") {
                this.email = e.currentTarget.value;
            }
            else if (e.currentTarget.name == "address") {
                this.address = e.currentTarget.value;
            }
            else if (e.currentTarget.name == "description") {
                this.description = e.currentTarget.value;
            }
        }

        if (this.first_name && this.last_name && this.email &&
            this.phone && this.address && this.description) {
            this.setState({ isCreateCustomer: false });
        }
        else {
            this.setState({ isCreateCustomer: true });
        }
    }

    homeClick() {
        this.props.history.push('/');
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div>
                <div className="container text-align-right m-t-30">
                    <button id="Home" className="btn btn-success" onClick={this.homeClick}>Home</button>
                </div>
                <div className={"col-md-12 form-wrapper"}>
                    <p className="create-customer"> Create Customer </p>

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                            </div>
                    )}

                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> First Name </label>
                            <input type="text" id="first_name" onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter first name" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="last_name"> Last Name </label>
                            <input type="text" id="last_name" onChange={(e) => this.handleInputChanges(e)} name="last_name" className="form-control" placeholder="Enter last name" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="email"> Email </label>
                            <input type="email" id="email" onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter email address" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="phone"> Phone </label>
                            <input type="text" id="phone" onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter phone number" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="address"> Address </label>
                            <input type="text" id="address" onChange={(e) => this.handleInputChanges(e)} name="address" className="form-control" placeholder="Enter address" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="description"> Description </label>
                            <input type="text" id="description" onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
                        </div>
                        <div className="form-group col-md-12 row">
                            <div className="form-group col-md-5 pull-right">
                                <button id="Create" className="btn btn-success" type="submit" disabled={this.state.isCreateCustomer}>Create</button>
                                {loading &&
                                    <span className="fa fa-circle-o-notch fa-spin" />
                                }
                            </div>
                            <div className="form-group col-md-4 pull-right">
                                <button className="btn btn-success" type="reset" onClick={this.onCancelClick}>
                                    Cancel
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateCustomerComponent;

