import React from 'react';
import "./Navigation.scss";
import {connect} from 'react-redux';
import Language from './Language';
import NavigationLink from "./NavigationLink";

interface Properties {
    info:{
        language:string,
        results: any,
        mobileMenu: boolean,
        selected_item:any;
    };
    setMobileMenu?(boolean):void;
  
};

interface State{
    height: string;
}

class Navigation extends React.Component<Properties, State> {
    private windowSize: any;
    private observer:ResizeObserver;
    private scrollObserver = null;
    private navRef: React.RefObject<HTMLDivElement>;
    private timeoutObserver: any;
    constructor(props){
        super(props);
        this.state = {height: "auto"};
        this.toggelMenu = this.toggelMenu.bind(this);
        this.addObserver = this.addObserver.bind(this);
        this.checkDocumentScoll = this.checkDocumentScoll.bind(this);
        this.delayObserver = this.delayObserver.bind(this);
        this.windowSize = null;
        this.navRef = React.createRef();
    }

    componentDidMount() {
        this.observer = new ResizeObserver(this.setNavHeight.bind(this));
        this.observer.observe(document.body);

        this.scrollObserver = new IntersectionObserver(this.checkDocumentScoll,{
            rootMargin: `-${this.navRef.current.offsetHeight}px 0px 0px 0px`
        });

        this.addObserver();
    }

    delayObserver(){
        this.timeoutObserver = setTimeout(this.addObserver,100);
    }

    checkDocumentScoll(entries, observer){
        if(this.navRef.current!=null){  
            if(entries[0].isIntersecting){
                this.navRef.current.classList.remove("bg-white", "border-bottom", "border-1", "shadow-sm");
            }
            else{
                this.navRef.current.classList.add("bg-white", "border-bottom", "border-1", "shadow-sm");
            }
        }
    }

    addObserver(){
		this.scrollObserver.observe(document.querySelector("h1"));
        this.timeoutObserver = null;
		return null;
	}

    setNavHeight(entries, observer){
        if(typeof this.props.info.mobileMenu && window.matchMedia('(max-width: 767px)').matches){
            if(this.state.height!==entries[0].contentRect.height){
                this.windowSize = {
                    height: String(entries[0].contentRect.height) + "px"
                }            
                this.setState({height: String(entries[0].contentRect.height)});
            }
        }
        else{
            this.windowSize = null;
            this.setState({height:"auto"});
        }
    }

    toggelMenu(){
        if(this.props.info.mobileMenu){
            this.props.setMobileMenu(false);
        }
        else{
            this.props.setMobileMenu(true);
        }
    }

   	render() {
        var navItems = [];

        if(this.timeoutObserver===null){
            this.delayObserver();
        }

        if(this.props.info.results.types != null){
            navItems = this.props.info.results.types.map((item,index) =>
            <NavigationLink key={index} text={item[this.props.info.language]} type={item.type} />
            );
        }
      
        return(
            <div ref={this.navRef} className={`${this.props.info.mobileMenu ? "navigation active": "navigation"}`} >
                <div className="mobile navbar-light" onClick={()=>this.toggelMenu()}>
                    <div className={this.props.info.mobileMenu ? "btn-close":"navbar-toggler-icon"}></div>
                </div>
                <div style={this.windowSize} className={this.props.info.mobileMenu ? "nav-items active": "nav-items"}>{navItems}</div>
                <Language/>
            </div>
        )
        
	    
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}

const mapDispatchToProps = function(dispatch) {
    return({
        setMobileMenu: (active) => {
        	dispatch({type:"SET_MOBILE_MENU","mobileMenu":active})
		},
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation)
