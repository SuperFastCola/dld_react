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
}

class Navigation extends React.Component<Properties, State> {   
    constructor(props){
        super(props);
        this.state = {active:false};
        this.toggelMenu = this.toggelMenu.bind(this);
    }

    toggelMenu(){

        console.log("toggler");
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
            <div className="navigation">
                <div className="mobile navbar-light" onClick={()=>this.toggelMenu()}>
                    <div className="navbar-toggler-icon"></div>
                </div>
                <div className={this.state.active ? "nav-items active": "nav-items"}>{navItems}</div>
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
        changeLanguage: (language) => {
        	dispatch({type:"SET_LANGUAGE","language":language})
        }
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(Navigation)
