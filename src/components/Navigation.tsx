import React from 'react';
import "./Navigation.scss";
import {connect} from 'react-redux';
import Language from './Language';
import NavigationLink from "./NavigationLink";

interface Properties {
    info:{
        language:string,
        results: any
    };
};

interface State{
    active: boolean;
    height: string;
}

class Navigation extends React.Component<Properties, State> {
    private windowSize: any;
    private observer:ResizeObserver;
    constructor(props){
        super(props);
        this.state = {active:false, height: "auto"};
        this.toggelMenu = this.toggelMenu.bind(this);
        this.windowSize = null;
    }

    componentDidMount() {
        this.observer = new ResizeObserver(this.setNavHeight.bind(this));
        this.observer.observe(document.body);
    }

    omponentDidUnMount() {
        this.observer.unobserve(document.body);
    }

    setNavHeight(entries, observer){
        if(typeof this.state.active && window.matchMedia('(max-width: 767px)').matches){
            if(this.state.height!==entries[0].contentRect.height){
                this.windowSize = {
                    height: String(entries[0].contentRect.height) + "px"
                }            
                this.setState({height: String(entries[0].contentRect.height)});
            }
        }
        else{
            this.windowSize = null;
            this.setState({active:false, height:"auto"});
        }
    }

    toggelMenu(){
        if(this.state.active){
            this.setState({active:false});
        }
        else{
            this.setState({active:true});
        }
    }

   	render() {
        var navItems = [];
        if(this.props.info.results.types != null){
            navItems = this.props.info.results.types.map((item,index) =>
            <NavigationLink key={index} text={item[this.props.info.language]} type={item.type}/>
            );
        }
      
        return(
            <div className={this.state.active ? "navigation active": "navigation"} >
                <div className="mobile navbar-light" onClick={()=>this.toggelMenu()}>
                    <div className="navbar-toggler-icon"></div>
                </div>
                <div style={this.windowSize} className={this.state.active ? "nav-items active": "nav-items"}>{navItems}</div>
                <Language/>
            </div>
        )
        
	    
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}




export default connect(mapStateToProps)(Navigation)
