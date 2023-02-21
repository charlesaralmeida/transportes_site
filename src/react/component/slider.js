import React from 'react';
import back_icon_active from "../../img/back.png";
import back_icon_inactive from "../../img/back-inactive.png";
import next_icon_active from "../../img/next.png";
import next_icon_inactive from "../../img/next-inactive.png";
import { openPage } from '../../js/resources';

export class Slider extends React.Component {

    foward = () => {
        this.setState({ current_slide: this.state.current_slide + 1 })
    }

    backward = () => {
        this.setState({ current_slide: this.state.current_slide - 1 })
    }
    
    state = {
        current_slide: 0
    };

    render() {
        return (
            <>
                <p className="content-subtitle">{this.props.slides.title}</p>
                <Slide
                    slides={this.props.slides}
                    current_slide={this.state.current_slide}
                    foward={this.foward}
                    backward={this.backward}
                />
            </>
        );
    }
}

class Slide extends React.Component {

    state = {
        modal_style: {
            display: 'none'
        },
    }

    openModal = () => {
        this.setState({ modal_style: { display: 'block' } });
    }

    closeModal = () => {
        this.setState({ modal_style: { display: 'none' } });
    }

    getImg = (index) =>{
        return this.props.slides.instances[index].img;
    }

    render() {
        return (
            <div>
                <div className="instruct-container">
                    {this.props.slides.instances[this.props.current_slide].instruction}
                </div>
                <div className="instruct-img-container">
                    <img alt='instruction' className="btn" onClick={this.openModal} src={this.getImg(this.props.current_slide)} />
                    <div className="instruct-container-nav">
                        <SlideControl
                            backward={this.props.backward}
                            foward={this.props.foward}
                            current_slide= {this.props.current_slide}
                            slides={this.props.slides}
                        />
                    </div>
                </div>
                <div className="modal" onClick={this.closeModal} style={this.state.modal_style}>
                    <img alt='instruction' className="modal-content" src={this.getImg(this.props.current_slide)} />
                </div>
            </div>
        );
    }

}

class SlideControl extends React.Component {

    back_inactive = <img alt='back_icon' className="btn" width="10%" src={back_icon_inactive} />;
    back_active = <img alt='back_icon' className="btn" width="10%" src={back_icon_active} onClick={this.props.backward} />;
    next_inactive = <img alt='back_icon' className="btn" width="10%" src={next_icon_inactive} />;
    next_active = <img alt='back_icon' className="btn" width="10%" src={next_icon_active} onClick={this.props.foward} />;

    getControls = (current_slide) => {
        switch (current_slide) {
            case 0:
                return (<div className="instruct-container-nav">
                    {this.back_inactive}
                    {this.next_active}
                </div>)
            case this.props.slides.instances.length-1:
                return (<div className="instruct-container-nav">
                    {this.back_active}
                    {this.next_inactive}
                </div>)
            default:
                return (<div className="instruct-container-nav">
                    {this.back_active}
                    {this.next_active}
                </div>)
        }
    }

    render() {
        return (
            <div className="instruct-container-nav">
                {this.getControls(this.props.current_slide)}
            </div>
        );
    }
}