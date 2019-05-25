import React, {Component} from 'react';
import validation from './validation';
import DynamicForm from './dynamicForm';

class ModalForm extends Component{
    render(){
        const fields =[
            {
                label:'Email',
                type:'email',
                name:'email',
                value:'',
                placeholder:'email'
            },
            {
                label:'Password',
                type:'password',
                name:'password',
                value:'',
                placeholder:'password'
            }
        ]
        return(
            <DynamicForm fields={fields} validation={validation}/>
        )
    }
}

export default ModalForm