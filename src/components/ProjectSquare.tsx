import React from 'react';
import "./ProjectSquare.scss";
import {connect} from 'react-redux';

interface Properties {
    key: any;
    item: any;
	info: any;
	setSelectedItem?(any):void;
	setScroll(any):void;
};

interface State{
    visible: boolean;
}

class ProjectSquare extends React.Component<Properties, State> {
	private myRef: React.RefObject<HTMLElement>;
	private observer = null;
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
		this.props.setSelectedItem(item);
	}
	displayImage(){
		if(this.state.visible){
			return {
				backgroundImage: "url(" + this.props.info.assetPath + this.props.item.image[this.props.info.language].sm + ")"
			};
		}
		else{
			return null;
		}
	}
	showProject(){
 		return (
	    	<article className="projectSquare" id={"projectSquare" + this.props["data-key"]} style={this.displayImage()} onClick={()=>this.toggleSquares(this.props.item)} ref={this.myRef}>
				<div className="projectInside"  >
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
		},
		setScroll: (scroll) => {
        	dispatch({type:"SET_SCROLL","scroll":scroll})
        },
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectSquare)
