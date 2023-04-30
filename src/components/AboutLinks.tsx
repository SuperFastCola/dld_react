import React from 'react';
import './AboutLinks.scss';
import { KeyGenerator } from '../modules/KeyGenerator';

interface Props {
    links:any;
};

interface State{
    prompt:string
}

class AboutLinks extends React.Component<Props, State> { 
    keyGen:KeyGenerator = new KeyGenerator();
    constructor(Props){
        super(Props);
        this.state = {prompt:""};
        this.showDescriptionText = this.showDescriptionText.bind(this);
        this.clearDescriptionText = this.clearDescriptionText.bind(this); 
    }

    /*
    onMouseEnter and OnMouseLeave have to be set to fire on element
    Cannot be onMouseOut and onMouseLeave because the event will get lost
    and onMouseLeave will never fire
    */

    showDescriptionText(e:any){
        this.setState({prompt:e.target.dataset["text"]});
    }

    clearDescriptionText(){
        this.setState({prompt:""});
    }

    render(){
        
        return (
            <div className="aboutLinks"  >
                <div className="aboutText small align-middle">{this.state.prompt}</div>
                {this.props.links.map(l=><a className={l.cssclass} href={l.link} data-text={l.text} onMouseEnter={this.showDescriptionText} onMouseLeave={this.clearDescriptionText} key={this.keyGen.createItemKey()} target="new"><span>{l.text}</span></a>)}
            </div>
            );
    }
}

export default AboutLinks;
