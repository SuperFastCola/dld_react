import React, { HTMLAttributes } from 'react';

interface Properties {
    source: {
        sm?:string,
        md?:string,
        lg?:string
    };
    text: string;
    path: string;
};

class ProjectImage extends React.Component<Properties> {

	render() {
        var breakpoints = {
            'sm':'(max-width: 414px)',
            'md':'(max-width: 767px)',
            'lg':'(min-width: 768px)'
        };

        var sources = Object.entries(this.props.source);

        console.log(sources);
        return (
	    	<picture className="projectImage">
                {sources.map((src, index) => (<source srcSet={this.props.path + src[1]} media={breakpoints[src[0]]} key={index} /> ))} 
                <img src={this.props.path + this.props.source.lg} alt={this.props.text} />
	    	</picture>
	    )
  }
}


export default (ProjectImage)
