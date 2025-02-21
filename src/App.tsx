import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import CreateCustomerComponent from './CreateCustomerComponent';
import EditCustomerComponent from './EditCustomerComponent';
import HomeComponent from './HomeComponent';

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    public render() {
        return (
            <div>
                <Switch>
                    <Route path={'/'} exact component={HomeComponent} />
                    <Route path={'/create'} exact component={CreateCustomerComponent} />
                    <Route path={'/edit/:id'} exact component={EditCustomerComponent} />
                </Switch>
            </div>
        );
    }
}
export default App;