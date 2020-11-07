import React, { Component } from "react";
import Numberinput from "./Numberinput";
import Spanfield from "./Spanfield";
const c = require("../sys/calculations");

class BonusCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bonus: {}
        }

        this.setBonus = this.setBonus.bind(this);
        this.getFormulaValue = this.getFormulaValue.bind(this);
    }

    setBonus() {
        let spans = Object.values(document.getElementsByClassName("bonus"));
        let bonus = { ...this.state.bonus }
        spans.forEach((node) => {
            let name = node.dataset.name.toLowerCase();
            let val = this.getFormulaValue(name);
            node.value = val;
            bonus[name] = val;
        })
        this.setState({
            bonus: bonus
        })
        this.props.state.character.bonus = bonus;
        this.props.update(this.props.state.character);
    }

    getFormulaValue(name) {
        let value;
        switch (name) {
            case "ausb":
                value = this.props.state.character.bonus.ausb;
            case "anb":
                value = c.calcAnB(this.props.state.character.base.gs);
                break;
            case "abb":
                value = c.calcAbB(this.props.state.character.base.gw);
                break;
            case "schb":
                value = c.calcSchB(this.props.state.character.base.st, this.props.state.character.base.gs);
                break;
            case "zaub":
                value = c.calcZauB(this.props.state.character.base.zt);
                break;
            case "resg":
                value = c.calcResG(this.props.state.character.base.in, this.props.state.character.character_info.classtype, this.props.state.character.character_info.race);
                break;
            case "resk":
                value = c.calcResK(this.props.state.character.base.ko, this.props.state.character.character_info.classtype, this.props.state.character.character_info.race);
                break;
        }
        return value;
    }

    render() {
        return (
            <div className="card">
                <div className="d-flex flex-row justify-content-center">
                    <div className="d-flex flex-column input-group">
                        <div className="d-flex flex-row justify-content-around">
                            <Spanfield name={"Ausdauerbonus"} label={"ausb"} classlist={"bonus"} value={this.state.bonus.ausb} />
                            <Spanfield name={"Angriffsbonus"} label={"anb"} classlist={"bonus"} value={this.state.bonus.anb} />
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <Spanfield name={"Abwehrbonus"} label={"abb"} classlist={"bonus"} value={this.state.bonus.abb} />
                            <Spanfield name={"Schadensbonus"} label={"schb"} classlist={"bonus"} value={this.state.bonus.schb} />
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <Spanfield name={"Zauberbonus"} label={"zaub"} classlist={"bonus"} value={this.state.bonus.zaub} />
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <Spanfield name={"Resistenzb.(Geist)"} label={"resg"} classlist={"bonus"} value={this.state.bonus.resg} />
                            <Spanfield name={"Resistenzb.(Körper)"} label={"resk"} classlist={"bonus"} value={this.state.bonus.resk} />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <button className="btn rotate btn-container" onClick={() => this.setBonus()}><i className="icon-large fas fa-dice-d20"></i></button>
                </div>
            </div>
        );
    }
}

export default BonusCard;

