import React, { useCallback, useEffect, useRef } from 'react';
import "./Navigation.scss";
import {useDispatch, useSelector} from 'react-redux';
import Language from './Language';
import NavigationLink from "./NavigationLink";
import AboutLinks from './AboutLinks';
import {setMobileMenu } from '../actions';
import {useLocation } from 'react-router-dom';


const Navigation = (props:any)=>{
   
    var observer = useRef(null);
    var scrollObserver = useRef(null);
    var timeoutObserver = useRef(null);
    var windowSize = useRef(null);

    //get redux state
    const info:any = useSelector((state:any) => state);
    //redux dispatcher
    const dispatch = useDispatch();

    //store ref to nav in DOM
    var navRef: React.RefObject<HTMLDivElement> = useRef(null);

    //holds nav items
    var navItems = [];

    //gets canvas
    var cityscape = document.getElementById("cityscape");

    //using this keeps the navigation observer in place
    let location = useLocation();


    const delayObserver = ()=>{
        timeoutObserver.current = setTimeout(addObserver,500);
    }

    const checkDocumentScoll = useCallback((entries)=>{
        if(navRef.current!=null){  
            if(entries[0].isIntersecting || entries[0].rootBounds===null){
                navRef.current.classList.remove("bg-white", "border-bottom", "border-1", "shadow-sm");
            }
            else{
                navRef.current.classList.add("bg-white", "border-bottom", "border-1", "shadow-sm");
            }  
        }

    },[navRef]);

    const addObserver = ()=>{

        if(scrollObserver.current!==null){
		    scrollObserver.current.observe(document.querySelector("h1"));
            timeoutObserver.current = null;
        }
        else{
            setScrollObserver();
        }
		return null;
	}

    const setNavHeight = useCallback((entries) => {
        if(typeof info.mobileMenu && window.matchMedia('(max-width: 767px)').matches){
            windowSize.current = {
                height: String(entries[0].contentRect.height) + "px"
            }                      
        }
        else{
            windowSize.current = null;
        }
    },[info,windowSize]);

    const toggelMenu = () => {
        if(info.mobileMenu){
            dispatch(setMobileMenu(false));
        }
        else{
            dispatch(setMobileMenu(true));
        }
    }

    const setScrollObserver= useCallback(()=>{
        if(scrollObserver.current==null && navRef.current!==null){
            scrollObserver.current = new IntersectionObserver(checkDocumentScoll,{
                rootMargin: `-${navRef.current.offsetHeight * 2}px 0px 0px 0px`
            });
            scrollObserver.current.observe(document.querySelector("h1"));
        }
    },[navRef,scrollObserver,checkDocumentScoll]);


    useEffect(()=>{

        if(observer.current==null){
            observer.current = new ResizeObserver(setNavHeight);
            observer.current.observe(document.body);
        }

        setScrollObserver();

        if(location.pathname!=="/"){
            cityscape.classList.add("d-none");
            navRef.current.classList.add("details-height");
        }else{
            cityscape.classList.remove("d-none");
            navRef.current.classList.remove("details-height");
        }

    },[navRef,setNavHeight,setScrollObserver,cityscape,location])

    if(timeoutObserver.current===null){
        delayObserver();
    }

    if(info.results.types != null){
        navItems = info.results.types.map((item,index) =>
            <NavigationLink key={index} text={item[info.language]} type={item.type} />
        );
    }

   	return(
            <div ref={navRef} className={`${info.mobileMenu ? "navigation active": "navigation"}`} >
                <div className="mobile navbar-light" onClick={()=>toggelMenu()}>
                    <div className={info.mobileMenu ? "btn-close":"navbar-toggler-icon"}></div>
                </div>
                <div style={windowSize.current} className={info.mobileMenu ? "nav-items active": "nav-items"}>{navItems}</div>
                <AboutLinks links={info.results.contents[info.language]}/>
                <Language/>
            </div>
    )
}

export default Navigation;
