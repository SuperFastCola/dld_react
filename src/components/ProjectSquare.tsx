import React from 'react';
import {connect} from 'react-redux';
import rootReducer from "../reducers/mainReducer";
import {sendAjaxRequest} from "../modules/sendAjaxRequest";

interface Properties {
    key: any;
    item: any;
};

class ProjectSquare extends React.Component<Properties > {
	constructor(props) {
		super(props);
	}
	showProject(){
		return (
	    	<div>
	    	{this.props.item.name}
	    	</div>
	    )
	}
	
	render() {
	    return this.showProject();
  }
}



export default ProjectSquare;
