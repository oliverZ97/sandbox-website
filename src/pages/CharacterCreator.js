import React, { Component } from "react";
import "../assets/scss/pages/CharacterCreator.scss";
import "regenerator-runtime/runtime.js";
import { FaLock, FaUnlock } from "react-icons/fa";
import Input from "../components/Input";
import Select from "../components/Select";
const db = require("../sys/database");
const c = require("../sys/calculations");

class CharacterCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            races: [],
            classes: [],
            statures: [],
            milieus: [],
            weaponhand: [],
            character: {
                base: {
                    st: 1,
                    gs: 1,
                    gw: 1,
                    ko: 1,
                    in: 1,
                    zt: 1
                },
                character_info: {
                    prename: "Eorn",
                    name: "Tiefschatten",
                    level: "1",
                    gender: "männlich",
                    race: "elf",
                    class: "assasine (as)",
                    classtype: "Warrior",
                    height: "170",
                    weight: "70"
                },
                bonus: {
                    ausb: "",
                    anb: "",
                    abb: "",
                    schb: "",
                    resk: "",
                    resg: "",
                    zaub: ""
                }
            },
            options: {
                lock_height: false,
                lock_weight: false
            }
        }

        this.setCharacterData = this.setCharacterData.bind(this);
        this.updateStats = this.updateStats.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLockChange = this.handleLockChange.bind(this);
        this.setLockedValuesToDisplay = this.setLockedValuesToDisplay.bind(this);
    }

    componentDidMount() {
        this.getFormularData();
        this.init();
    }

    async getFormularData() {
        db.pouchGET("gender", this.setCharacterData)
        db.pouchGET("race", this.setCharacterData)
        db.pouchGET("class", this.setCharacterData)
        db.pouchGET("stature", this.setCharacterData)
        db.pouchGET("milieu", this.setCharacterData)
        db.pouchGET("weaponhand", this.setCharacterData)
    }

    //set select contents
    setCharacterData(data) {
        switch (data._id) {
            case "gender":
                this.setState({
                    genders: Object.values(data.genders)
                });
                break;
            case "race":
                this.setState({
                    races: Object.values(data.races)
                });
                break;
            case "class":
                this.setState({
                    classes: Object.values(data.classes)
                });
                break;
            case "stature":
                this.setState({
                    statures: Object.values(data.statures)
                })
                break;
            case "milieu":
                this.setState({
                    milieus: Object.values(data.milieus)
                })
                break;
            case "weaponhand":
                this.setState({
                    weaponhand: Object.values(data.weaponhands)
                })
                break;
        }
    }

    init() {
        //roll base values
        this.rollBasis(100);

        //calc default boni
        let ausb = c.calcAusB(this.state.character.base.ko, this.state.character.base.st);
        let schb = c.calcSchB(this.state.character.base.st, this.state.character.base.gs);
        let character = { ...this.state.character };
        character.bonus.ausb = ausb;
        character.bonus.schb = schb;

        //set boni to state
        this.setState({
            character: character
        });
    }

    rollBasis(dice) {
        let basis = Object.keys(this.state.character.base)
        let newBase = {}
        basis.forEach((att) => {
            let roll = c.getRandom(dice);
            newBase[att] = roll;
        })
        let character = { ...this.state.character };
        character.base = newBase;
        this.setState({
            character: character
        })
    }

    handleChange(event) {
        let character = { ...this.state.character };
        let base = character.base;
        let name = event.target.name.toLowerCase();
        base[name] = event.target.value;
        this.setState({ character: character });
        this.updateStats();
    }

    handleLockChange(name) {
        let node = document.getElementById(name);
        let state = {...this.state};
        if(!state.options["lock_" + name]){
            state.character.character_info[name] = node.value;
        } 
        state.options["lock_" + name] = !this.state.options["lock_" + name];
        this.setState({
            options: state.options,
            character: state.character
        })
        console.log("handleLock: ", this.state.character_info);
        this.updateStats()
        this.setLockedValuesToDisplay()
    }

    setLockedValuesToDisplay() {
        let character = {...this.state.character};
        console.log("setBefore", character.character_info);
        let locked = document.querySelectorAll("[data-locked]");
        locked.forEach((node) => {
            let name = node.name;
            node.value = character.character_info[name];
            console.log(node.value)
        })
        console.log("setAfter", character.character_info);
    }

    updateStats() {
        let inputs = document.querySelectorAll("input");
        let selects = document.querySelectorAll("select");
        let spans = document.querySelectorAll("span");

        let character = { ...this.state.character }
        console.log("updateBefore: ", character.character_info);

        inputs.forEach((input) => {
            if (!input.dataset.locked) {
                let value = input.value;
                let name = input.name.toLowerCase();
                if (input.classList.contains("base")) {
                    character.base[name] = value;
                } else {
                    character.character_info[name] = value;
                }
            } else {
                input.value = character.character_info[name];
            }
        })
        selects.forEach((select) => {
            if (select.options[select.selectedIndex] !== undefined) {
                if (select.id === "classinput") {
                    let classtype = select.options[select.selectedIndex].dataset.type;
                    character.character_info.classtype = classtype;
                }
                let value = select.options[select.selectedIndex].value.toLowerCase();
                let name = select.name;
                character.character_info[name] = value;
            }
        })
        spans.forEach((span) => {
            let value = span.innerText;
            let name = span.attributes.name.value;
            if (span.classList.contains("bonus")) {
                character.bonus[name] = value;
            } else {
                character.character_info[name] = value;
            }
        })
        this.setState({
            character: character
        })
        console.log("updateAfter: ", character.character_info);
    }

    render() {

        const classes = this.state.classes.map((classitem, index) => {
            return <option data-type={classitem.type} key={index}>{classitem.name} ({classitem.short})</option>
        });

        return (
            <div>
                <div className="d-flex flex-row">
                    <div className="card">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-around">
                                <Input name={"Vorname"} label={"prename"} placeholder={"Eorn"} type={"text"} />
                                <Input name={"Nachname"} label={"name"} placeholder={"Tiefschatten"} type={"text"} />
                            </div>
                            <div className="d-flex flex-row justify-content-around">
                                <Select id={"genderinput"} name={"Geschlecht"} label={"gender"} content={this.state.genders} change={this.updateStats} />
                                <Input name={"Grad"} placeholder={"1"} label={"level"} type={"number"} />
                            </div>
                            <div className="d-flex flex-row justify-content-around">
                                <Select id={"raceinput"} name={"Rasse"} label={"race"} content={this.state.races} change={this.updateStats} />
                                <div className="input-label">
                                    <label htmlFor="class">Klasse</label>
                                    <select id="classinput" className="input" name="class" onChange={this.updateStats}>
                                        {classes}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column input-group-sm">
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="ST">ST</label>
                                        <input className="base input-sm" name="ST" type="number" min="1" max="100" value={this.state.character.base.st} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="GS">GS</label>
                                        <input className="base input-sm" name="GS" type="number" min="1" max="100" value={this.state.character.base.gs} onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="GW">GW</label>
                                        <input className="base input-sm" name="GW" type="number" min="1" max="100" value={this.state.character.base.gw} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="KO">KO</label>
                                        <input className="base input-sm" name="KO" type="number" min="1" max="100" value={this.state.character.base.ko} onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="IN">IN</label>
                                        <input className="base input-sm" name="IN" type="number" min="1" max="100" value={this.state.character.base.in} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="ZT">ZT</label>
                                        <input className="base input-sm" name="ZT" type="number" min="1" max="100" value={this.state.character.base.zt} onChange={this.handleChange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column input-group-sm">
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="pA">pA</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark" name="pA" >{c.calcPA(this.state.character.base.in)}</span>
                                        </div>

                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="Wk">Wk</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark" name="Wk">{c.calcWk(this.state.character.base.ko, this.state.character.base.in)}</span>
                                        </div>

                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="Au">Au</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark" name="Au">{c.calcAu(this.state.character.character_info.race)}</span>
                                        </div>

                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="Ausb">B</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark" name="Ausb">{c.calcB(this.state.character.character_info.race)}</span>
                                        </div>

                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="LP">LP</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark" name="LP">{c.calcLP(this.state.character.character_info.race, this.state.character.base.ko)}</span>
                                        </div>

                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="AP">AP</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark" name="AP">{c.calcAP(this.state.character.character_info["class"], this.state.character.bonus.ausb)}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="btn rotate" onClick={() => this.rollBasis("100")}><i className="icon-large fas fa-dice-d20"></i></button>

                    </div>


                </div>
                <div className="d-flex flex-row">
                    <div className="card">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-around">
                                <div className="input-label">
                                    <label htmlFor="height">Größe(cm)</label>
                                    {this.state.options.lock_height && <div className="d-flex flex-row justify-content-between span-container">
                                        <span id="height" data-locked={this.state.options.lock_height} className="span-sm text-dark" name="height">{c.calcHeight(this.state.character.base.st, this.state.character.character_info.gender, this.state.character.character_info.race, this.state.character.height, this.state.options.lock_height)}</span>
                                        <FaLock className="text-dark" onClick={() => { this.handleLockChange("height") }} />
                                    </div>}
                                    {!this.state.options.lock_height && <div className="d-flex flex-row justify-content-between span-container">
                                        <input id="height" data-locked={this.state.options.lock_height} className="input text-dark" type="number" min="1" defaultValue="150" placeholder="170" name="height" ></input>
                                        <FaUnlock className="text-dark" onClick={() => { this.handleLockChange("height") }} />
                                    </div>}

                                </div>
                                <div className="input-label">
                                    <label htmlFor="weight">Gewicht(kg)</label>
                                    {this.state.options.lock_weight && <div className="d-flex flex-row justify-content-between span-container">
                                        <span id="weight" data-locked={this.state.options.lock_weight} className="span-sm text-dark" name="weight">{c.calcWeight(this.state.character.base.st, this.state.character.character_info.gender, this.state.character.character_info.race, this.state.character.character_info.height, this.state.character.character_info.weight, this.state.options.lock_weight)}</span>
                                        <FaLock className="text-dark" onClick={() => { this.handleLockChange("weight") }} />
                                    </div>}
                                    {!this.state.options.lock_weight && <div className="d-flex flex-row justify-content-between span-container">
                                        <input id="weight" data-locked={this.state.options.lock_weight} className="input text-dark" type="number" min="1" defaultValue="75" placeholder="75" name="weight" ></input>
                                        <FaUnlock className="text-dark" onClick={() => { this.handleLockChange("weight") }} />
                                    </div>}

                                </div>
                            </div>

                        </div>
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-around">
                                <Select id={"statureinput"} name={"Statur"} label={"stature"} content={this.state.statures} change={this.updateStats} />
                                <Select id={"weaponhand"} name={"Waffenhand"} label={"whand"} content={this.state.weaponhand} change={this.updateStats} />
                            </div>

                        </div>
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-around">
                                <div className="input-label">
                                    <label htmlFor="age">Alter</label>
                                    <input className="input" name="age" type="number" placeholder="21"></input>
                                </div>
                                <Select id={"milieuinput"} name={"Stand"} label={"milieu"} content={this.state.milieus} change={this.updateStats} />
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-around">
                                <Input name={"Religion"} label={"religion"} placeholder={"-"} type={"text"} />
                                <Input name={"Herkunft"} label={"origin"} placeholder={"Alba"} type={"text"} />
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column input-group-sm">
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="ausb">Ausdauerbonus</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="ausb">{c.calcAusB(this.state.character.base.ko, this.state.character.base.st)}</span>
                                        </div>
                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="anb">Angriffsbonus</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="anb">{c.calcAnB(this.state.character.base.gs)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="abb">Abwehrbonus</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="abb">{c.calcAbB(this.state.character.base.gw)}</span>
                                        </div>
                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="schb">Schadensbonus</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="schb">{c.calcSchB(this.state.character.base.ko, this.state.character.base.st)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="zaub">Zauberbonus</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="zaub">{c.calcZauB(this.state.character.base.zt)}</span>
                                        </div>
                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="resg">Resistenzb. Geist</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="resg">{c.calcResG(this.state.character.base.in, this.state.character.character_info.classtype, this.state.character.character_info.race)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="resk">Resistenzb. Körper</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="resk">{c.calcResK(this.state.character.base.ko, this.state.character.character_info.classtype, this.state.character.character_info.race)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default CharacterCreator;