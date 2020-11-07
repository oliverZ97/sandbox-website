import React, { Component } from "react";
import Input from "./Input";
import Select from "./Select";
import Numberinput from "./Numberinput";
const c = require("../sys/calculations");

class BackgroundCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character_infos: {}
        }
        this.updateCardState = this.updateCardState.bind(this);
        this.initSelectsOnFirstUpdate = this.initSelectsOnFirstUpdate.bind(this);
        this.updateOrigin = this.updateOrigin.bind(this);
        this.calcLook = this.calcLook.bind(this);
        this.getFormulaValue = this.getFormulaValue.bind(this);
    }

    updateCardState(name, value) {
        let char = { ...this.state.character_infos };
        if (this.state.character_infos.race === undefined) {
            char = this.initSelectsOnFirstUpdate(char);
        }
        char[name] = value;
        this.setState({
            character_infos: char
        })
        this.props.state.character.character_info = char;
        this.props.update(this.props.state.character);
    }

    calcLook() {
        let char = { ...this.props.state.character.character_info };
        char = this.initSelectsOnFirstUpdate(char);
        let height;
        let numberinputs = Object.values(document.querySelectorAll("input[type=number]"));
        numberinputs.forEach((node) => {
            let add = 0;
            let name = node.name;
            if (node.name === "weight") {
                add = height;
            }
            let value = this.getFormulaValue(name, add);
            if (name === "height") {
                height = value;
            }
            node.value = value;
            char[name] = value;
        })
        this.setState({
            character_infos: char
        });
        this.props.state.character.character_info = char;
        this.props.update(this.props.state.character);
    }

    getFormulaValue(name, add) {
        let value;
        switch (name) {
            case "height":
                value = c.calcHeight(this.props.state.character.base.st, this.props.state.character.character_info.gender, this.props.state.character.character_info.race.toLowerCase());
                break;
            case "weight":
                value = c.calcWeight(this.props.state.character.base.st, this.props.state.character.character_info.gender, this.props.state.character.character_info.race.toLowerCase(), add);
                break;
            case "age":
                value = c.calcAge(this.props.state.character.character_info.race);
                break;
            case "whand":
                value = c.calcWeaponhand(this.props.state.character.character_info.race);
                break;
        }
        return value;
    }

    initSelectsOnFirstUpdate(char) {
        let nodes = Object.values(document.getElementsByClassName("back"));
        nodes.forEach((node) => {
            if (node.tagName === "SELECT") {
                let value = node.value;
                let name = node.name;
                char[name] = value;
            }
        });
        return char;
    }

    updateOrigin() {

    }

    render() {

        const origins = this.props.state.origins.map((origin, index) => {
            return <option key={index}>{origin.name}</option>
        });

        return (
            <div className="card">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row justify-content-around">
                        <Numberinput name={"Größe(cm)"} label={"height"} placeholder={"172"} type={"number"} classlist={"back"} function={this.updateCardState} />
                        <Numberinput name={"Gewicht(kg)"} label={"weight"} placeholder={"75"} type={"number"} classlist={"back"} function={this.updateCardState} />
                    </div>
                    <div className="d-flex flex-row justify-content-around">
                        <Select id={"stature"} name={"Statur"} label={"stature"} classlist={"back"} content={this.props.state.statures} function={this.updateCardState} />
                        <Numberinput name={"Alter"} label={"age"} placeholder={"21"} type={"number"} classlist={"back"} function={this.updateCardState} />
                    </div>
                    <div className="d-flex flex-row justify-content-around">
                        <Select id={"whand"} name={"Waffenhand"} label={"whand"} classlist={"back"} content={this.props.state.weaponhand} function={this.updateCardState} />
                    </div>
                    <div className="d-flex flex-row justify-content-around">
                        <Select id={"milieu"} name={"Stand"} label={"milieu"} classlist={"back"} content={this.props.state.milieus} function={this.updateCardState} />
                        <Input name={"Religion"} label={"religion"} placeholder={"-"} type={"text"} classlist={"back"} function={this.updateCardState} />
                    </div>
                    <div className="d-flex flex-row justify-content-around">
                        <div className="input-label">
                            <label htmlFor="origin">Herkunft</label>
                            <select id="origins" className="input back" name="origin" onChange={this.updateOrigin}>
                                {origins}
                            </select>
                        </div>
                        <Input name={"Herkunft Zusatz"} label={"originx"} placeholder={"-"} type={"text"} classlist={"back"} function={this.updateCardState} />
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <button className="btn rotate btn-container" onClick={() => this.calcLook()}><i className="icon-large fas fa-dice-d20"></i></button>
                </div>
            </div>
        );
    }
}

export default BackgroundCard;