import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/transportes.css';

export class CardContainer extends React.Component {    
    //array de cards devem vir separados em arrays de 'card rows'
    render() {
        return (
            <div className="services-container">            
                {this.props.cards.map((card_row, index)=>{                    
                    return <CardRow key={index} cards={card_row} />
                })}                                               
            </div>
        );
    }
}

class CardRow extends React.Component {
    render() {
        return (
            <>
                <div className="services-container-body">
                    {this.props.cards.map((card, index) => {                        
                        return <Card key={index} card={card} />
                    })}
                </div>
            </>
        );
    }
}

class Card extends React.Component {
    render() {
        return (
            <>
                <div className="services-container-instance">
                    <img src={this.props.card.img} alt={this.props.card.name} />
                    <p>{this.props.card.title}</p>
                    <div className="services-container-instance-button btn">
                        <Link to={this.props.card.link}><p>{this.props.card.link_text}</p></Link>
                    </div>
                </div>
            </>
        );
    }
}