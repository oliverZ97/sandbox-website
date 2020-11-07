import React, { Component } from "react";
import Input from "./Input";
import Select from "./Select";
import Numberinput from "./Numberinput";
const c = require("../sys/calculations");

class CharCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character_infos: {}
        }
        this.updateCardState = this.updateCardState.bind(this);
        this.updateClass = this.updateClass.bind(this);
    }

    updateCardState(name, value) {
        let char = { ...this.state.character_infos };
        char[name] = value;
        this.setState({
            character_infos: char
        })
        this.props.state.character.character_info = char;
        this.props.update(this.props.state.character);
    }

    updateClass() {
        let char = { ...this.state.character_infos };
        let node = document.getElementById("classinput");
        let selected = node.options[node.selectedIndex];
        let value = selected.value;
        let type = selected.dataset.type;
        char.classname = value;
        char.classtype = type;
        this.setState({
            character_infos: char
        })
        this.props.state.character.character_info = char;
        this.props.update(this.props.state.character);
    }

    render() {

        const classes = this.props.state.classes.map((classitem, index) => {
            return <option data-type={classitem.type} key={index}>{classitem.name} ({classitem.short})</option>
        });

        return (
            <div className="card">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row justify-content-around">
                        <Input name={"Vorname"} label={"prename"} placeholder={"Eorn"} type={"text"} classlist={"char"} function={this.updateCardState}/>
                        <Input name={"Nachname"} label={"name"} placeholder={"Tiefschatten"} type={"text"} classlist={"char"} function={this.updateCardState}/>
                    </div>
                    <div className="d-flex flex-row justify-content-around">
                        <Select id={"genderinput"} name={"Geschlecht"} label={"gender"} content={this.props.state.genders} change={this.updateStats} classlist={"char"} function={this.updateCardState}/>
                        <Numberinput name={"Grad"} placeholder={"1"} label={"level"} type={"number"} classlist={"char"} function={this.updateCardState}/>
                    </div>
                    <div className="d-flex flex-row justify-content-around">
                        <Select id={"raceinput"} name={"Rasse"} label={"race"} content={this.props.state.races} change={this.updateStats} classlist={"char"} function={this.updateCardState}/>
                        <div className="input-label">
                            <label htmlFor="class">Klasse</label>
                            <select id="classinput" className="input char" name="class" onChange={this.updateClass}>
                                {classes}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CharCard;