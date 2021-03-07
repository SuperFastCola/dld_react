import React from 'react';
import {connect} from 'react-redux';

interface Properties {
    key: any;
    item: any;
	info: any;
	setSelectedItem?(any):void;
};

class ProjectSquare extends React.Component<Properties> {
	constructor(props) {
		super(props);
        this.toggleSquares = this.toggleSquares.bind(this);
    }
	toggleSquares(item){
		this.props.setSelectedItem(item);
	}
	showProject(){
		return (
	    	<article className="projectSquare" onClick={()=>this.toggleSquares(this.props.item)}>
	    	    <div className="ProjectSquare-title" >
                    {this.props.item.name[this.props.info.language]}  
                </div>
	    	</article>
	    )
	}
	
	render() {
	    return this.showProject();
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}

const mapDispatchToProps = function(dispatch) {
    return({
        setSelectedItem: (item) => {
        	dispatch({type:"SELECTED_ITEM","selected_item":item})
        }
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectSquare)
