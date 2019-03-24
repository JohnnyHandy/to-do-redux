import React from 'react'

import Course from './course/course'

const courses = (props) =>{
    const coursesInfo={
        protection:{
            id:'proteção',
            name:'Proteção de Sistemas elétricos de potência',
            professor:'José Lins'
        }
    }

    
let coursesContent = Object.values(coursesInfo).map(info=>{
    return(
        <Course professor={info.professor} key={info.id} name={info.name}/>
    )
});
 
    
    

    return(
       <div>
           <h1>Content</h1>
           {coursesContent}
       </div> 
    )
}

export default courses