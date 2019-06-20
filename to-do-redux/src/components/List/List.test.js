import React from 'react'
import {Provider} from 'react-redux'
import {configure,shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import {List} from '../List/List'
import Items from '../List/Items/Items'

const setup=()=>{
    let props= {
        shortTerm:[],
        mediumTerm:[],
        longTerm:[],
        input:false,
        edit:false,
        editIndex:undefined,
        nameInput:'',
        descInput:'',
        buttonText:'Add',
        activeTab:'1',
        userId:null,
        loading:false
    }

    let wrapper = shallow(<List {...props}/>);

    return {props, wrapper};
};

configure({adapter:new Adapter()})

describe('<List />',()=>{
    const {wrapper} = setup()

    it('Should return one h4',()=>{
        expect(wrapper.find('h4')).toHaveLength(1)
    })
    it('Should expect no items',()=>{
        expect(wrapper.find(Items)).toHaveLength(0)
    })
});