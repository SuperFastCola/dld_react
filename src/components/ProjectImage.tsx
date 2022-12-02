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
    defaultImage: string; 
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
        this.defaultImage = null;
    }

    buildPictureSources(sourceObject:any){
        var sources:any = [];
        this.defaultImage = sourceObject.xl??null;
        
        for(const [key,value] of Object.entries(sourceObject)){
            if(key!=="order" && value!==null){
                if(this.defaultImage===null){
                    this.defaultImage = String(value);
                }
                sources.push(<source srcSet={this.props.path + value} media={this.breakpoints[key]} key={this.keyGen.createItemKey()} />);
            }
        }
        
        return sources;
    }

	render() {

        return (
	    	<picture>
                {this.buildPictureSources( this.props.source)}
                <img src={this.props.path + this.defaultImage} alt={this.props.text} />
	    	</picture>
	    )
  }
}


export default (ProjectImage)
