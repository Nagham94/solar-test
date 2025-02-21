import * as React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import EditCustomerComponent from './EditCustomerComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Case for Edit Customer Page', () => {
    let props: any = {
        match: {
            params: {
                id: {}
            }
        },
        history: {
            push: () => { }
        }
    };
    test('Validate Edit Customer Label render', () => {
        const wrapper = shallow(
            <EditCustomerComponent {...props} />
        );
        const editCustomer = wrapper.find('.edit-customer');
        expect(editCustomer).toHaveLength(1);
        expect(editCustomer.text() == "Edit Customer");
    });
});


describe('Test Case for Edit Customer Page', () => {
    let props: any = {
        match: {
            params: {
                id: {}
            }
        },
        history: {
            push: () => { }
        }
    };
    test('Validate Edit Button render', () => {
        const wrapper = shallow(
            <EditCustomerComponent {...props} />
        );
        const EditElement = wrapper.find('#Edit');
        expect(EditElement).toHaveLength(1);
    })
});

describe('Test Case for Edit Customer Page', () => {
    let props: any = {
        match: {
            params: {
                id: {}
            }
        },
        history: {
            push: () => { }
        }
    };
    test('Validate Form fields', () => {
        const wrapper = shallow(
            <EditCustomerComponent {...props} />
        );
        wrapper.find('#first_name').simulate('change', { target: { name: 'name', value: 'Customer1' } });
        wrapper.find('#last_name').simulate('change', { target: { name: 'name', value: 'Test1' } });
        wrapper.find('#phone').simulate('change', { target: { name: 'name', value: '8765432190' } });
        wrapper.find('#email').simulate('change', { target: { name: 'name', value: 'testadmin@gmail.com' } });
        wrapper.find('#address').simulate('change', { target: { name: 'name', value: 'Xyz Street' } });
        wrapper.find('#description').simulate('change', { target: { name: 'name', value: 'Test description' } });
    })
});

describe('Test case for Edit Component', () => {
    let props: any = {
        match: {
            params: {
                id: {}
            }
        },
        history: {
            push: () => { }
        }
    };
    test('Validate click event of new customer', () => {
        const wrapper = shallow(
            <EditCustomerComponent {...props} />
        );
        let homeBtn: any = wrapper.find('#Home');
        expect(homeBtn).toHaveLength(1);
        homeBtn.simulate('click')
    });
});