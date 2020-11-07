import React, { Component } from "react";
import Numberinput from "./Numberinput";
const c = require("../sys/calculations");

class BasisCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            base: {}
        }

        this.roll = this.roll.bind(this);
        this.updateCardState = this.updateCardState.bind(this);
        this.calcAusb = this.calcAusb.bind(this);
        this.baseinit = this.baseinit.bind(this);
    }

    roll(dice) {
        let inputs = Object.values(document.getElementsByClassName("base"));
        let base = { ...this.state.base }
        inputs.forEach((node) => {
            let val = c.getRandom(dice);
            let name = node.name.toLowerCase();
            node.value = val;
            base[name] = val;
        })
        this.setState({
            base: base
        })
        let ausb = this.calcAusb(base);
        this.props.character.base = base;
        this.props.character.bonus.ausb = ausb;
        this.props.update(this.props.character);
    }

    calcAusb(base) {
        let val = c.calcAusB(base.ko, base.st);
        return val;
    }

    updateCardState(name, value) {
        let base = { ...this.state.base };
        base[name] = value;
        this.setState({
            base: base
        })
        this.props.character.base = base;
        this.props.update(this.props.character);
    }

    baseinit() {
        this.roll(100);
    }

    componentDidMount() {
        this.baseinit();
    }

    render() {
        return (
            <div className="card">
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column input-group">
                        <div className="d-flex flex-row justify-content-around">
                            <Numberinput name={"ST"} placeholder={"1"} label={"ST"} type={"number"} classlist={"base"} function={this.updateCardState} />
                            <Numberinput name={"GS"} placeholder={"1"} label={"GS"} type={"number"} classlist={"base"} function={this.updateCardState} />
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <Numberinput name={"GW"} placeholder={"1"} label={"GW"} type={"number"} classlist={"base"} function={this.updateCardState} />
                            <Numberinput name={"KO"} placeholder={"1"} label={"KO"} type={"number"} classlist={"base"} function={this.updateCardState} />
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <Numberinput name={"IN"} placeholder={"1"} label={"IN"} type={"number"} classlist={"base"} function={this.updateCardState} />
                            <Numberinput name={"ZT"} placeholder={"1"} label={"ZT"} type={"number"} classlist={"base"} function={this.updateCardState} />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <button className="btn rotate btn-container" onClick={() => this.roll(100)}><i className="icon-large fas fa-dice-d20"></i></button>
                </div>
            </div>
        );
    }
}

export default BasisCard;