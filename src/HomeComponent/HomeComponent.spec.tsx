import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomeComponent from './HomeComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('Test case for Home Component', () => {
    test('Validate no records in grid', () => {
        const wrapper = shallow(<HomeComponent />);
        const labelValue = wrapper.find('.no-record');
        expect(labelValue).toHaveLength(1);
        expect(labelValue.text() == "No customer found at the moment");
    });
});

describe('Test case for Home Component', () => {

    let customers: any = [
        {
            "id": 1,
            "first_name": "Customer1",
            "last_name": "Name1",
            "email": "customer1@mail.com",
            "phone": "9444321211",
            "address": "Xyz Street",
            "description": "Welcome"
        },
        {
            "first_name": "Sangeetha",
            "last_name": "Periyaiah",
            "email": "sangeesangee93@gmail.com",
            "phone": "8220867882",
            "address": "XYZ Street",
            "description": "Welcor",
            "id": 2
        }
    ]

    let props: any = {
        history: {
            push: () => { }
        }
    };

    test('Validate grid has records', () => {
        const wrapper = shallow(
            <HomeComponent {...props} />
        );
        wrapper.setState({ customers: customers });
        let editBtn: any = wrapper.find('#EditCustomer');
        expect(editBtn).toHaveLength(2);
        let deleteBtn: any = wrapper.find('#DeleteCustomer');
        expect(deleteBtn).toHaveLength(2);
    });
});

describe('Test case for Home Component', () => {

    let customers: any = [
        {
            "id": 1,
            "first_name": "Customer1",
            "last_name": "Name1",
            "email": "customer1@mail.com",
            "phone": "9444321211",
            "address": "Xyz Street",
            "description": "Welcome"
        }
    ]

    let props: any = {
        history: {
            push: () => { }
        }
    };

    test('Validate click event of edit', () => {
        const wrapper = shallow(
            <HomeComponent {...props} />
        );
        wrapper.setState({ customers: customers });
        let editBtn: any = wrapper.find('#EditCustomer');
        expect(editBtn).toHaveLength(1);
        editBtn.simulate('click');
    });
});

describe('Test case for Home Component', () => {

    let customers: any = [
        {
            "id": 1,
            "first_name": "Customer1",
            "last_name": "Name1",
            "email": "customer1@mail.com",
            "phone": "9444321211",
            "address": "Xyz Street",
            "description": "Welcome"
        }
    ]
    let props: any = {
        history: {
            push: () => { }
        }
    };

    test('Validate click event of delete', () => {
        const wrapper = shallow(
            <HomeComponent {...props} />
        );
        wrapper.setState({ customers: customers });
        let deleteBtn: any = wrapper.find('#DeleteCustomer');
        expect(deleteBtn).toHaveLength(1);
        deleteBtn.simulate('click');
    });
});

describe('Test case for Home Component', () => {
    let props: any = {
        history: {
            push: () => { }
        }
    };

    test('Validate click event of new customer', () => {
        const wrapper = shallow(
            <HomeComponent {...props} />
        );
        let newCustomerBtn: any = wrapper.find('#NewCustomer');
        expect(newCustomerBtn).toHaveLength(1);
        newCustomerBtn.simulate('click')
    });
});