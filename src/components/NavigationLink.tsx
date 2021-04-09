import React from 'react';
import {connect} from 'react-redux';

interface Properties {
    info:{
        language:string,
        results: any
    };
    type: string;
    text: string;
    key: number;
};

class NavigationLink extends React.Component<Properties> {   
   	render() {
           console.log(this);
        return(
            <button className="navigationLink" key={this.props.key} data-type={this.props.type}>{this.props.text}</button>
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


export default connect(mapStateToProps,mapDispatchToProps)(NavigationLink)
