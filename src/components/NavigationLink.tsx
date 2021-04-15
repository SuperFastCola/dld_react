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
    changeCategory?(string):void;
    changeType?(any):void;
};

class NavigationLink extends React.Component<Properties> {   
    constructor(props){
        super(props);
        this.changeType = this.changeType.bind(this);
    }
    changeType(type){
        this.props.changeCategory(type);
    }
   	render() {
        return(
            <button className="navigationLink" key={this.props.key} data-type={this.props.type} onClick={()=>this.changeType(this.props.type)}>{this.props.text}</button>
        )
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}

 const mapDispatchToProps = function(dispatch) {
    return({
        changeCategory: (category) => {
        	dispatch({type:"SET_CATEGORY","category":category})
        }
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(NavigationLink)
