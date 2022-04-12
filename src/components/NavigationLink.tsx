import React from 'react';
import {connect} from 'react-redux';
import "./NavigationLink.scss";

interface Properties {
    info:{
        language:string,
        category:Array<string>,
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
        var active = false;
        if(this.props.info.category.indexOf(this.props.type)!==-1 || (this.props.type==='all' && this.props.info.category.length===0)){
            active = true;
        }

        return(
            <button className={active ? "navigationLink active": "navigationLink"} key={this.props.key} data-type={this.props.type} onClick={()=>this.changeType(this.props.type)}><span>{this.props.text}</span></button>
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
