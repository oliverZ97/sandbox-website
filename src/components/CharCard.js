import React, { Component } from "react";
import Input from "./Input";
import Select from "./Select";
import Numberinput from "./Numberinput";
import { FaChargingStation } from "react-icons/fa";
const c = require("../sys/calculations");

class CharCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character_infos: {}
        }
        this.updateCardState = this.updateCardState.bind(this);
        this.updateClass = this.updateClass.bind(this);
        this.initSelectsOnFirstUpdate = this.initSelectsOnFirstUpdate.bind(this);
        this.charinit = this.charinit.bind(this);
    }

    updateCardState(name, value) {
        let char = { ...this.state.character_infos };
        if(this.state.character_infos.race === undefined){
            char = this.initSelectsOnFirstUpdate(char);
        }
        char[name] = value;
        console.log(char)
        this.setState({
            character_infos: char
        })
        this.props.state.character.character_info = char;
        this.props.update(this.props.state.character);
    }

    initSelectsOnFirstUpdate(char) {
        let nodes = Object.values(document.getElementsByClassName("char"));
        nodes.forEach((node) => {
            if(node.tagName === "SELECT"){
                let value = node.value;
                let name = node.name;
                char[name] = value;
            }
        });
        return char;
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

    charinit() {
        let char = { ...this.state.character_infos };
        char = this.initSelectsOnFirstUpdate(char);
        let inputs = Object.values(document.getElementsByClassName("char"));
        inputs.forEach((node) => {
            if(node.tagName === "INPUT") {
                node.value = node.placeholder;
                char[node.name] = node.value;
            }
        })
        this.setState({
            character_infos: char
        })
        this.props.state.character.character_info = char;
        this.props.update(this.props.state.character);
    }

    componentDidMount() {
        this.charinit();
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
                        <Select id={"genderinput"} name={"Geschlecht"} label={"gender"} content={this.props.state.genders} classlist={"char"} function={this.updateCardState}/>
                        <Numberinput name={"Grad"} placeholder={"1"} label={"level"} type={"number"} classlist={"char"} function={this.updateCardState}/>
                    </div>
                    <div className="d-flex flex-row justify-content-around">
                        <Select id={"raceinput"} name={"Rasse"} label={"race"} content={this.props.state.races} classlist={"char"} function={this.updateCardState}/>
                        <div className="input-label">
                            <label htmlFor="classname">Klasse</label>
                            <select id="classinput" className="input char" name="classname" onChange={this.updateClass}>
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