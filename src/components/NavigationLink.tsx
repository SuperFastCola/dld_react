import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setType, setMobileMenu} from '../actions';
import "./NavigationLink.scss";

interface Properties {
    type: string;
    text: string;
    keyindex: number;
    changeCategory?(string):void;
    changeType?(any):void;
};

const NavigationLink = (props:Properties)=>{  
    var active = false;
    
    //get redux state
    const info:any = useSelector((state:any) => state);
    //redux dispatcher
    const dispatch = useDispatch();

    const changeType = (type:string) => {
        dispatch(setType(type));
        if(info.mobileMenu){
            dispatch(setMobileMenu(false));
        }
    }

    if(info.category.indexOf(props.type)!==-1 || (props.type==='all' && info.category.length===0)){
        active = true;
    }

    return(
        <button className={active ? "navigationLink active": "navigationLink"} key={props.keyindex * Math.random()} data-type={props.type} onClick={()=>changeType(props.type)}><span>{props.text}</span></button>
    )
  
}


export default NavigationLink;
