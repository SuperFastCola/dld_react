import React from 'react';
import { KeyGenerator } from '../modules/KeyGenerator';

interface props {
    sources: any;
    currentImageIndex:number;
    selectFunction?:(any)=>any;
};

class ProjectImageNavigation extends React.Component<props> {
    keyGen:KeyGenerator = new KeyGenerator();

    displayNavItems(){
       return this.props.sources.map( (item:any, index:number)=>{
        console.log(this.props.currentImageIndex===index,this.props.currentImageIndex,index);
            return <li className={`page-item ${(this.props.currentImageIndex===index)?"active":""}`} key={this.keyGen.createItemKey()}><a className="page-link" href="/" data-index={index} onClick={this.props.selectFunction}>{(index+1)}</a></li>
        });
    }

    render() {
            return (
                <nav aria-label="Picture Navigation">
                    <ul className="pagination">
                        {this.displayNavItems()}
                    </ul>
                </nav>
            )
    }
}

export default ProjectImageNavigation;