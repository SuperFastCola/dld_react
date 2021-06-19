import React from 'react';

interface Properties {
    name: string;
    image: string;
    visible: boolean;
    path: string;
    
};


class ProjectSquareImage extends React.Component<Properties> {
	constructor(props) {
        super(props);
        this.state = {loaded:false};
        this.updateState =this.updateState.bind(this);
    }

    updateState(){
        this.setState({loaded: true});
    }

	showSquare(){
        if(!this.props.visible){
            return null;
        }
        else{
            return (
                <div className="projectSquare-image">
                    <img src={this.props.path + this.props.image} alt={this.props.name} />
                </div>
            )
        }

	}
	
	render() {
	    return this.showSquare();
  }
}


export default ProjectSquareImage
