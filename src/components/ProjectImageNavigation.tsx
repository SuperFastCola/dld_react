import React from 'react';
import { KeyGenerator } from '../modules/KeyGenerator';
import "./ProjectImageNavigation.scss";

interface props {
    sources: any;
    currentImageIndex:number;
    selectFunction?:(any)=>any;
};

class ProjectImageNavigation extends React.Component<props> {
    keyGen:KeyGenerator = new KeyGenerator();

    displayNavItems(){
       return this.props.sources.map( (item:any, index:number)=>{
            return <li className={`page-item ${(this.props.currentImageIndex===index)?"active":""}`} key={this.keyGen.createItemKey()}><a className="page-link" href="/" data-index={index} onClick={this.props.selectFunction}><span>{(index+1)}</span></a></li>
        });
    }

    render() {
            return (
                <nav aria-label="Picture Navigation" className="me-2">
                    <ul className="pagination d-flex flex-row flex-md-column">
                        {this.displayNavItems()}
                    </ul>
                </nav>
            )
    }
}

export default ProjectImageNavigation;