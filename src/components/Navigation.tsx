/* eslint-disable */ 

import React, { useCallback, useEffect, useRef } from 'react';
import "./Navigation.scss";
import {useDispatch, useSelector} from 'react-redux';
import Language from './Language';
import NavigationLink from "./NavigationLink";
import AboutLinks from './AboutLinks';
import {setMobileMenu } from '../actions';
import {useLocation,useNavigate  } from 'react-router-dom';


const Navigation = (props:any)=>{
   
    var windowSize = useRef(null);

    //get redux state
    const info:any = useSelector((state:any) => state);
    //redux dispatcher
    const dispatch = useDispatch();

    //store ref to nav in DOM
    var navRef: React.RefObject<HTMLDivElement> = useRef(null);
    var navItemsRef: React.RefObject<HTMLDivElement> = useRef(null);
    

    //holds nav items
    var navItems = [];

    //gets canvas
    var cityscape = document.getElementById("cityscape");

    const checkDocumentScoll = (e:Event) => {    
        if(window.pageYOffset > 200){  
            navRef.current.classList.add("bg-white", "border-bottom", "border-1", "shadow-sm");
            cityscape.classList.add("d-none");
        }
        else{
            navRef.current.classList.remove("bg-white", "border-bottom", "border-1", "shadow-sm"); 
            cityscape.classList.remove("d-none");
        }
    };

    const toggelMenu = useCallback(() => {
        if(info.mobileMenu){
            dispatch(setMobileMenu(false));
            windowSize.current = null;
        }
        else{
            dispatch(setMobileMenu(true));
            windowSize.current = {
                height: `${window.innerHeight}px`
            }      
        }
    },[info,windowSize,dispatch]);


    useEffect(()=>{
        window.addEventListener("scroll", checkDocumentScoll)
        return () => window.removeEventListener("scroll", checkDocumentScoll)
    },[checkDocumentScoll])


    if(info.results.types != null){
        navItems = info.results.types.map((item,index) =>
            <NavigationLink key={index * Math.random()} keyindex={index} text={item[info.language]} type={item.type} />
        );
    }

   	return(
            <div ref={navRef} className={`${info.mobileMenu ? "navigation active": "navigation"}`} >
                <div className="mobile navbar-light" onClick={()=>toggelMenu()}>
                    <div className={info.mobileMenu ? "btn-close":"navbar-toggler-icon"}></div>
                </div>
                <div ref={navItemsRef} style={windowSize.current} className={info.mobileMenu ? "nav-items active": "nav-items"}>{navItems}</div>
                <AboutLinks links={info.results.contents[info.language]}/>
                <Language/>
            </div>
    )
}

export default Navigation;
