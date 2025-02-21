import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import './HomeComponent.css';
import { DialogComponent } from '@syncfusion/ej2-react-popups';

interface IState {
    customers: any[];
}

class HomeComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            customers: []
        }
        this.newCustomer = this.newCustomer.bind(this);
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/customers`).then(data => {
            this.setState({ customers: data.data })
        })
    }

    public deleteCustomer(id: number) {
        axios.delete(`http://localhost:5000/customers/${id}`).then(data => {
            const index = this.state.customers.findIndex((customer: { id: any; }) => customer.id === id);
            this.state.customers.splice(index, 1);
            this.props.history.push('/');
        })
    }

    newCustomer() {
        this.props.history.push('/create');
    }

    public render() {
        const customers = this.state.customers;
        return (
            <div>
                <div className="container text-align-right m-t-30">
                    <button id="NewCustomer" className="btn btn-success" onClick={this.newCustomer}>New Customer</button>
                </div>
                {customers && customers.length === 0 && (
                    <div className="container">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="text-center">
                                            <p className="no-record">No customer found at the moment</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        {customers && customers.length != 0 && (
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Firstname</th>
                                        <th scope="col">Lastname</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers && customers.map((customer: { id: any; first_name: any; last_name: any; email: any; phone: any; address: any; description: any; }) =>
                                        <tr key={customer.id}>
                                            <td>{customer.first_name}</td>
                                            <td>{customer.last_name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.phone}</td>
                                            <td>{customer.address}</td>
                                            <td>{customer.description}</td>
                                            <td>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                        <Link id="EditCustomer" to={`edit/${customer.id}`} className="btn btn-sm btn-outline-secondary">Edit Customer</Link>
                                                        <button id="DeleteCustomer" className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteCustomer(customer.id)}>Delete Customer</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

            </div>
        )
    }
}

export default HomeComponent;
