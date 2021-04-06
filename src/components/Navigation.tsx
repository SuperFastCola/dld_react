import React from 'react';
import "./Navigation.scss";
import {connect} from 'react-redux';

interface Properties {
    info:{
        language:string,
        results: any
    };
};

interface State { 
    navitems: any;
};

class Language extends React.Component<Properties, State> {   
    constructor(props){
        super(props);
        this.AssembleNavigation = this.AssembleNavigation.bind(this);
        this.setState({navitems:null});
    }
    componentDidMount() {
        this.AssembleNavigation();
    }
    AssembleNavigation(){
        let navItems = [];
        if(this.props.info.results.types != null){
            navItems = this.props.info.results.types.map((item,index) =>
                <div key={index}>{item}</div>
            );
        }
        this.setState({navitems:navItems})
    }
   	render() {
        console.log(this.state);
        
        return(
            <>
            {
              this.props.info.results.types.map((item,index) =>
                <div key={index}>{item}</div>
                )
            }    
            </>
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


export default connect(mapStateToProps,mapDispatchToProps)(Language)
