import React from 'react';
import { KeyGenerator } from '../modules/KeyGenerator';


interface Properties {
    source: {
        s?:string,
        m?:string,
        l?:string
        xl?:string
    };
    text: string;
    path: string;
};

class ProjectImage extends React.Component<Properties> {
    keyGen:KeyGenerator = new KeyGenerator();
    breakpoints:Object = {
        's':'(max-width: 414px)',
        'm':'(max-width: 767px)',
        'l':'(min-width: 768px)',
        'xl':'(min-width: 1200px)'
    };
;
    constructor(props) {
        super(props);
        this.buildPictureSources = this.buildPictureSources.bind(this);
    }

    buildPictureSources(sourceObject:any){
        var sources:any = [];
        for(const [key,value] of Object.entries(sourceObject)){
            if(key!=="order" && value!==null){
                sources.push(<source srcSet={this.props.path + value} media={this.breakpoints[key]} key={this.keyGen.createItemKey()} />);
            }
        }
        
        return sources;
    }

	render() {

        return (
	    	<picture>
                {this.buildPictureSources( this.props.source)}
                <img src={this.props.path + this.props.source.xl} alt={this.props.text} />
	    	</picture>
	    )
  }
}


export default (ProjectImage)
