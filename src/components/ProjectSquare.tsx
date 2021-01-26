import React from 'react';
import {connect} from 'react-redux';

interface Properties {
    key: any;
    item: any;
    info: any;
};

class ProjectSquare extends React.Component<Properties > {
	showProject(){
		return (
	    	<div className="flex items-end justify-center box-border h-48 bg-gray-300 transition-all">
	    	    <div className="w-full font-sans bg-gray-100  bg-opacity-50">
                    {this.props.item.name[this.props.info.language]}  
                </div>
	    	</div>
	    )
	}
	
	render() {
	    return this.showProject();
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}

export default connect(mapStateToProps)(ProjectSquare)
