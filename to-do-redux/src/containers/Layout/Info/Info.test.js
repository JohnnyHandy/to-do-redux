import React from 'react'
import {Provider} from 'react-redux'
import {configure,shallow,mount,render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import {Info} from './Info'
import Details from './Details/Details'

configure({adapter:new Adapter()})

const setup=()=>{
    let props= {
        shortTerm:[],
        mediumTerm:[],
        longTerm:[],
        activeTab:'1',
        itemIndex:0
    }

    let wrapper = shallow(<Info {...props}/>);

    return {props, wrapper};
};

describe('<Info />',()=>{
    const {wrapper}=setup()

    it('Should return one Details Component',()=>{
        expect(wrapper.find(Details)).toHaveLength(1)
    })
});