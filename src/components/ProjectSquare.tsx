import React from 'react';
import "./ProjectSquare.scss";
import {connect} from 'react-redux';
import {Navigate } from 'react-router-dom';

interface Properties {
    key: any;
    item: any;
	info: any;
	setScroll(any):void;
};

interface State{
    visible: boolean;
}

class ProjectSquare extends React.Component<Properties, State> {
	private myRef: React.RefObject<HTMLElement>;
	private observer = null;
	private squareClicked = false;
	constructor(props) {
		super(props);
		this.toggleSquares = this.toggleSquares.bind(this);
		this.addObserver = this.addObserver.bind(this);
		this.isVisible = this.isVisible.bind(this);
		this.displayImage = this.displayImage.bind(this);
		this.state = {visible:false};

		this.observer = new IntersectionObserver(this.isVisible);
		this.myRef = React.createRef();
    }
	componentDidMount(){
		setTimeout(this.addObserver,1000);
	}
	addObserver(){
		if (this.myRef.current) 
			this.observer.observe(this.myRef.current);
		return null;
	}
	componentWillUnmount(){
		if (this.myRef.current) 
			this.observer.unobserve(this.myRef.current);
	}
	isVisible(entries, observer){
		if(entries[0].isIntersecting){
			this.setState({visible:true});
			this.observer.unobserve(this.myRef.current);
		}
    }
	toggleSquares(item){
		item = Object.assign({}, item, {scrollid: this.props["data-key"]});
		this.props.setScroll(window.pageYOffset);
		this.squareClicked = true;
	}
	
	displayImage(){

		var defaultImage = null; 

		if( this.props.item.image[this.props.info.language].length>0 && this.props.item.image[this.props.info.language]!==null){
			if(this.props.item.image[this.props.info.language][0].s!==null){
				defaultImage = this.props.item.image[this.props.info.language][0].s
			}
			else{
				for(const [key,value] of Object.entries(this.props.item.image[this.props.info.language][0])){
					if(key!=="order" && value!==null){
						defaultImage = value;
					}
				}
			}
		}

		if(this.state.visible && defaultImage!==null){
			return {
				backgroundImage: "url(" + this.props.info.assetPath + defaultImage + ")"
			};
		}
		else{
			return null;
		}
	}
	showProject(){

		if(this.squareClicked){
			return (
				<><Navigate to={`/${this.props.item.id}`} replace={true} /></>
			)
		}
 		return (
	    	<article className="projectSquare" id={"projectSquare" + this.props["data-key"]} style={this.displayImage()} onClick={()=>this.toggleSquares(this.props.item)} ref={this.myRef}>
				<div className="projectInside"  >
					<h2 className="projectSquare-title" >
						{this.props.item.name[this.props.info.language]}  
					</h2>
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
		setScroll: (scroll) => {
        	dispatch({type:"SET_SCROLL","scroll":scroll})
        },
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectSquare)
