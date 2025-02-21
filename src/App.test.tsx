import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render } from '@testing-library/react';
import App from './App'
import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() })

describe('Test Case For Link Buttons in App Page', () => {
    test('Test cases', () => {
        const wrapper = shallow(<App />);
    });
});

