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

class Navigation extends React.Component<Properties> {   
    constructor(props){
        super(props);
        this.setState({navitems:null});
    }
   	render() {
        var navItems = [];
        if(this.props.info.results.types != null){
            navItems = this.props.info.results.types.map((item,index) =>
            <NavigationLink key={index} text={item[this.props.info.language]} type={item.type}/>
            );
        }
        
        console.log(navItems);
        
        return(
            <div className="navigation">
            {navItems}    
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
