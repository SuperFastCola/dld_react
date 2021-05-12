import React from 'react';
import "./ProjectSquare.scss";
import {connect} from 'react-redux';

interface Properties {
    key: any;
    item: any;
	info: any;
	setSelectedItem?(any):void;
};

class ProjectSquare extends React.Component<Properties> {
	private myRef: React.RefObject<HTMLElement>;
	private observer = null;
	constructor(props) {
		super(props);
        this.toggleSquares = this.toggleSquares.bind(this);
		this.isVisible = this.isVisible.bind(this);

		this.observer = new IntersectionObserver(this.isVisible);
		this.myRef = React.createRef();
    }
	componentDidMount(){
		if (this.myRef.current) 
			this.observer.observe(this.myRef.current);
    }
	componentWillUnmount(){
		if (this.myRef.current) 
			this.observer.unobserve(this.myRef.current);
	}
	isVisible(entries, observer){
		entries.forEach(entry => {
			// Each entry describes an intersection change for one observed
			// target element:
			//   console.log(entry.boundingClientRect);
			//   console.log(entry.intersectionRatio);
			//   console.log(entry.intersectionRect);
			//   console.log(entry.isIntersecting);
			//   console.log(entry.rootBounds);
			//   console.log(entry.target);
			//   console.log(entry.time);
		  });
    }
	toggleSquares(item){
		this.props.setSelectedItem(item);
	}
	showProject(){
 		return (
	    	<article className="projectSquare" onClick={()=>this.toggleSquares(this.props.item)} ref={this.myRef}>
				<div className="projectInside" >
					<div className="projectSquare-title" >
						{this.props.item.name[this.props.info.language]}  
					</div>
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
