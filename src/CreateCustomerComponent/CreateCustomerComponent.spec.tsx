import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render } from '@testing-library/react';
import CreateCustomerComponent from './CreateCustomerComponent'
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/dom'
import ReactDOM from 'react-dom';
import { Console } from 'console';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Case for Create Customer Page', () => {
    test('Validate Create Customer Label render', () => {
        const wrapper = shallow(
            <CreateCustomerComponent />
        );
        const createCustomer = wrapper.find('.create-customer');
        expect(createCustomer).toHaveLength(1);
        expect(createCustomer.text() == "Create Customer");
    });
});


describe('Test Case for Create Customer Page', () => {
    test('Validate Create Button render', () => {
        const wrapper = shallow(
            <CreateCustomerComponent />
        );
        const createElement = wrapper.find('#Create');
        expect(createElement).toHaveLength(1);
    })
});

describe('Test Case for Create Customer Page', () => {
    test('Validate Create Button disabled', () => {
        const wrapper = shallow(
            <CreateCustomerComponent />
        );
        expect(wrapper.state('isCreateCustomer')).toBe(true);
    });
});

describe('Test Case for Create Customer Page', () => {
    test('Validate Form fields', () => {
        const wrapper = shallow(
            <CreateCustomerComponent />
        );
        wrapper.find('#first_name').simulate('change', { target: { name: 'name', value: 'Customer1' } });
        wrapper.find('#last_name').simulate('change', { target: { name: 'name', value: 'Test1' } });
        wrapper.find('#phone').simulate('change', { target: { name: 'name', value: '8765432190' } });
        wrapper.find('#email').simulate('change', { target: { name: 'name', value: 'testadmin@gmail.com' } });
        wrapper.find('#address').simulate('change', { target: { name: 'name', value: 'Xyz Street' } });
        wrapper.find('#description').simulate('change', { target: { name: 'name', value: 'Test description' } });
    })
});

describe('Test Case for Create Customer Page', () => {
    test('Validate Create Button Disabled', () => {
        const wrapper = shallow(
            <CreateCustomerComponent />
        );
        wrapper.find('#first_name').simulate('change', { target: { name: 'name', value: 'Customer1' } });
        expect(wrapper.state('isCreateCustomer')).toBe(true);
    })
});

describe('Test Case for Create Customer Page', () => {
    test('Validate Create Button Enabled', () => {
        const wrapper = shallow(
            <CreateCustomerComponent />
        );
        wrapper.find('#first_name').simulate('change', { target: { name: 'name', value: 'Custome1' } });
        wrapper.find('#last_name').simulate('change', { target: { name: 'name', value: 'Test1' } });
        wrapper.find('#phone').simulate('change', { target: { name: 'name', value: '8765432190' } });
        wrapper.find('#email').simulate('change', { target: { name: 'name', value: 'testadmin@gmail.com' } });
        wrapper.find('#address').simulate('change', { target: { name: 'name', value: 'Xyz Street' } });
        wrapper.find('#description').simulate('change', { target: { name: 'name', value: 'Test description' } });
        wrapper.setState({ isCreateCustomer: false });
        expect(wrapper.state('isCreateCustomer')).toBe(false);
    })
});

describe('Test case for Create Component', () => {
    let props: any = {
        history: {
            push: () => { }
        }
    };

    test('Validate click event of new customer', () => {
        const wrapper = shallow(
            <CreateCustomerComponent {...props} />
        );
        let homeBtn: any = wrapper.find('#Home');
        expect(homeBtn).toHaveLength(1);
        homeBtn.simulate('click')
    });
});
