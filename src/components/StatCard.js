import React, { Component } from "react";
import Numberinput from "./Numberinput";
const c = require("../sys/calculations");

class BasisCard extends Component {
    constructor(props){
        super(props)

        this.state = {
            stat: {}
        }

        this.roll = this.roll.bind(this);
        this.updateCardState = this.updateCardState.bind(this);
    }
    
    roll() {
        let inputs = Object.values(document.getElementsByClassName("stat"));
        let stat = {...this.state.stat}
        inputs.forEach((node) => {
            let name = node.name.toLowerCase();
            let val = parseInt(this.getFormulaValue(name));
            node.value = val;
            stat[name] = val;
        })
        this.setState({
            stat: stat
        })
        this.props.state.character.stat = stat;
        this.props.update(this.props.state.character);
    }

    getFormulaValue(name) {
        let value;
        switch(name) {
            case "au":
                value = c.calcAu(this.props.state.character.character_info.race);
                break;
            case "pa":
                value = c.calcPA(this.props.state.character.base.in);
                break;
            case "wk":
                value = c.calcWk(this.props.state.character.base.ko, this.props.state.character.base.in);
                break;
            case "b": 
                value = c.calcB(this.props.state.character.character_info.race);
                break;
            case "lp": 
                value = c.calcLP(this.props.state.character.character_info.race, this.props.state.character.base.ko);
                break;
            case "ap":
                value = c.calcAP(this.props.state.character.character_info.classname, this.props.state.character.bonus.ausb);
                break;
        }
        return value
    }

    updateCardState(name, value) {
        let stat = {...this.state.stat};
        stat[name] = value;
        this.setState({
            stat : stat
        })
        this.props.state.character.stat = stat;
        this.props.update(this.props.state.character);
    }

    render() {
        return (
            <div className="card">
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column input-group-sm">
                        <div className="d-flex flex-row justify-content-around">
                            <Numberinput name={"pA"} placeholder={"1"} label={"pA"} type={"number"} classlist={"stat"} function={this.updateCardState}/>
                            <Numberinput name={"Wk"} placeholder={"1"} label={"Wk"} type={"number"} classlist={"stat"} function={this.updateCardState}/>
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <Numberinput name={"Au"} placeholder={"1"} label={"Au"} type={"number"} classlist={"stat"} function={this.updateCardState}/>
                            <Numberinput name={"B"} placeholder={"1"} label={"B"} type={"number"} classlist={"stat"} function={this.updateCardState}/>
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <Numberinput name={"LP"} placeholder={"1"} label={"LP"} type={"number"} classlist={"stat"} function={this.updateCardState}/>
                            <Numberinput name={"AP"} placeholder={"1"} label={"AP"} type={"number"} classlist={"stat"} function={this.updateCardState}/>
                        </div>
                    </div>
                </div>
                <button className="btn rotate" onClick={() => this.roll()}><i className="icon-large fas fa-dice-d20"></i></button>
            </div>
        );
    }
}

export default BasisCard;

                                    