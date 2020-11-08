import React, { Component } from "react";
import Input from "./Input";
import Select from "./Select";
import Numberinput from "./Numberinput";
const c = require("../sys/calculations");

class CharCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character_infos: {},
            classes_active: []
        }
        this.updateCardState = this.updateCardState.bind(this);
        this.updateClass = this.updateClass.bind(this);
        this.initSelectsOnFirstUpdate = this.initSelectsOnFirstUpdate.bind(this);
        this.charinit = this.charinit.bind(this);
        this.updateClassView = this.updateClassView.bind(this);
        this.editClassList = this.editClassList.bind(this);
    }

    updateCardState(name, value) {
        let char = { ...this.state.character_infos };
        let activeClasses = this.props.state.classes;
        if (this.state.character_infos.race === undefined) {
            char = this.initSelectsOnFirstUpdate(char);
        }
        if (name === "race") {
            activeClasses = this.updateClassView(value);
        }
        char[name] = value;
        this.setState({
            character_infos: char,
            classes_active: activeClasses
        })
        this.props.state.character.character_info = char;
        this.props.update(this.props.state.character);
    }

    initSelectsOnFirstUpdate(char) {
        let nodes = Object.values(document.getElementsByClassName("char"));
        nodes.forEach((node) => {
            if (node.tagName === "SELECT") {
                let value = node.value;
                if (node.name === "race") {
                    node.options.selectedIndex = 3;
                    value = node.options[3].value;
                }

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
        let value;
        let type;
        if(selected === undefined) {
            value = "Assasine (As)";
            type = "Warrior";
        } else {
            value = selected.value;
            type = selected.dataset.type;
        }
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
            if (node.tagName === "INPUT") {
                node.value = node.placeholder;
                char[node.name] = node.value;
            }
        })
        char.classname = "Assasine (As)";
        char.classtype = "Warrior";
        this.setState({
            character_infos: char,
            classes_active: this.props.state.classes
        })
        this.props.state.character.character_info = char;
        this.props.update(this.props.state.character);
    }

    componentDidMount() {
        this.charinit();
    }

    updateClassView(race) {
        let classlist = [];
        switch (race.toLowerCase()) {
            case "elf":
                classlist = ["Gl", "Kr", "Wa", "Ba", "Dr", "Hx", "Ma"];
                break;
            case "gnom":
                classlist = ["As", "Gl", "Sp", "Wa", "Dr", "Hx", "Ma"];
                break;
            case "halbling":
                classlist = ["As", "Hä", "Sp", "Wa", "Ba", "PB"];
                break;
            case "zwerg":
                classlist = ["Hä", "Kr", "Ma", "PB", "PS"];
                break;
            case "mensch":
                classlist = [];
                break;
        }
        return this.editClassList(classlist)
    }

    editClassList(classlist) {
        if (classlist.length === 0) {
            return [...this.props.state.classes]; 
        } else {
            let all = [...this.props.state.classes];
            let active = [];
            for (let i = 0; i < all.length; i++) {
                for (let j = 0; j < classlist.length; j++) {
                    if (all[i].short === classlist[j]) {
                        active.push(all[i]);
                    }
                }
            }
            return active
        }

    }

    render() {

        const classes = this.state.classes_active.map((classitem, index) => {
            return <option data-type={classitem.type} key={index}>{classitem.name} ({classitem.short})</option>
        });

        return (
            <div className="card">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row justify-content-around">
                        <Input name={"Vorname"} label={"prename"} placeholder={"Eorn"} type={"text"} classlist={"char"} function={this.updateCardState} />
                        <Input name={"Nachname"} label={"name"} placeholder={"Tiefschatten"} type={"text"} classlist={"char"} function={this.updateCardState} />
                    </div>
                    <div className="d-flex flex-row justify-content-around">
                        <Select id={"genderinput"} name={"Geschlecht"} label={"gender"} content={this.props.state.genders} classlist={"char"} function={this.updateCardState} />
                        <Numberinput name={"Grad"} placeholder={"1"} label={"level"} type={"number"} classlist={"char"} function={this.updateCardState} />
                    </div>
                    <div className="d-flex flex-row justify-content-around">
                        <Select id={"raceinput"} name={"Rasse"} label={"race"} content={this.props.state.races} classlist={"char"} function={this.updateCardState} />
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