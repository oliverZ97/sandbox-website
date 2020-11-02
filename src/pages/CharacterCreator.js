import React, { Component } from "react";
import "../assets/scss/pages/CharacterCreator.scss";
import "regenerator-runtime/runtime.js";
const db = require("../sys/database");
const c = require("../sys/calculations");

class CharacterCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            races: [],
            classes: [],
            initial: true,
            base: {
                st: 1,
                gs: 1,
                gw: 1,
                ko: 1,
                in: 1,
                zt: 1
            },
            character_info: {
                prename: "",
                name: "",
                level: "1",
                gender: "",
                race: "",
                class: "",
                classtype: ""
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
        }

        this.setCharacterData = this.setCharacterData.bind(this);
        this.updateStats = this.updateStats.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async getFormularData() {
        db.pouchGET("gender", this.setCharacterData)
        db.pouchGET("race", this.setCharacterData)
        db.pouchGET("class", this.setCharacterData)
    }

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
        }
        if (this.state.initial) {
            this.init();
            this.setState({
                initial: false
            })
        }
    }

    init() {
        this.rollBasis(100);
        let ausb = c.calcAusB(this.state.base.ko, this.state.base.st);
        let schb = c.calcSchB(this.state.base.st, this.state.base.gs);
        let bonus = { ...this.state.bonus };
        bonus.ausb = ausb;
        bonus.schb = schb;
        let classinput = document.getElementById("classinput")
        let classname = classinput.value.toLowerCase();
        let character = { ...this.state.character_info };
        if(classinput.options[classinput.selectedIndex] !== undefined) {
            let classtype = classinput.options[classinput.selectedIndex].dataset.type;
            character.classtype = classtype;
        }
        character.class = classname;
        this.setState({
            bonus: bonus,
            character_info: character
        });
        this.updateStats();
    }

    rollBasis(dice) {
        let basis = Object.keys(this.state.base)
        let newBase = {}
        basis.forEach((att) => {
            let roll = c.getRandom(dice);
            newBase[att] = roll;
        })
        this.setState({
            base: newBase
        })
    }

    handleChange(event) {
        let base = this.state.base;
        let name = event.target.name.toLowerCase();
        base[name] = event.target.value;
        this.setState({ base: base });
        this.updateStats();
    }

    updateStats() {
        let data = document.querySelectorAll("input, select, span");
        let state = { ...this.state };
        data.forEach((stat) => {
            if (stat.nodeName === "INPUT") {
                let value = stat.value;
                let name = stat.name.toLowerCase();
                if (name === "st" || name === "gs" || name === "gw" || name === "ko" || name === "in" || name === "zt") {
                    state.base[name] = value;
                } else {
                    state.character_info[name] = value;
                }
            } else if (stat.nodeName === "SELECT") {
                if (stat.options[stat.selectedIndex] !== undefined) {
                    let value = stat.options[stat.selectedIndex].value.toLowerCase();
                    let name = stat.name;
                    console.log(stat, name, value)
                    state.character_info[name] = value;
                } else {
                    console.log("error")
                }

            } else if (stat.nodeName === "SPAN") {
                let value = stat.innerText;
                let name = stat.attributes.name.value;
                if (stat.classList.contains("bonus")) {
                    state.bonus[name] = value;
                } else {
                    state.character_info[name] = value;
                }
            }
        })
        this.setState({
            base: state.base,
            character_info: state.character_info
        });
        console.log(this.state)
    }

    render() {
        if (this.state.initial) {
            this.getFormularData()
        }
        const races = this.state.races.map((race, index) => {
            return <option key={index}>{race}</option>
        });

        const classes = this.state.classes.map((classitem, index) => {
            return <option data-type={classitem.type} key={index}>{classitem.name} ({classitem.short})</option>
        });

        const genders = this.state.genders.map((gender, index) => {
            return <option key={index}>{gender}</option>
        });

        return (
            <div>
                <div className="d-flex flex-row">
                    <div className="card">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-around">
                                <div className="input-label">
                                    <label htmlFor="prename">Vorname</label>
                                    <input className="input" name="prename" type="text" placeholder="Eorn"></input>
                                </div>
                                <div className="input-label">
                                    <label htmlFor="name">Nachname</label>
                                    <input className="input" name="name" type="text" placeholder="Schildhammer"></input>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="input-label">
                                    <label htmlFor="gender">Geschlecht</label>
                                    <select className="input" name="gender">
                                        {genders}
                                    </select>
                                </div>
                                <div className="input-label">
                                    <label htmlFor="level">Grad</label>
                                    <input className="input" name="level" type="number" placeholder="1" min="0" onInput={this.updateStats}></input>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="input-label">
                                    <label htmlFor="race">Rasse</label>
                                    <select className="input" name="race" onChange={this.updateStats}>
                                        {races}
                                    </select>
                                </div>
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
                                        <input className="base input-sm" name="ST" type="number" min="1" max="100" value={this.state.base.st} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="GS">GS</label>
                                        <input className="base input-sm" name="GS" type="number" min="1" max="100" value={this.state.base.gs} onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="GW">GW</label>
                                        <input className="base input-sm" name="GW" type="number" min="1" max="100" value={this.state.base.gw} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="KO">KO</label>
                                        <input className="base input-sm" name="KO" type="number" min="1" max="100" value={this.state.base.ko} onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="IN">IN</label>
                                        <input className="base input-sm" name="IN" type="number" min="1" max="100" value={this.state.base.in} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="ZT">ZT</label>
                                        <input className="base input-sm" name="ZT" type="number" min="1" max="100" value={this.state.base.zt} onChange={this.handleChange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column input-group-sm">
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="pA">pA</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark" name="pA" >{c.calcPA(this.state.base.in)}</span>
                                        </div>

                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="Wk">Wk</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark" name="Wk">{c.calcWk(this.state.base.ko, this.state.base.in)}</span>
                                        </div>

                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="Au">Au</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark" name="Au">{c.calcAu(this.state.race)}</span>
                                        </div>

                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="Ausb">B</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark" name="Ausb">{c.calcB(this.state.race)}</span>
                                        </div>

                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="LP">LP</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark" name="LP">{c.calcLP(this.state.character_info.race, this.state.base.ko)}</span>
                                        </div>

                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="AP">AP</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark" name="AP">{c.calcAP(this.state.character_info["class"], this.state.bonus.ausb)}</span>
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
                                    <label htmlFor="prename">Vorname</label>
                                    <input className="input" name="prename" type="text" placeholder="Eorn"></input>
                                </div>
                                <div className="input-label">
                                    <label htmlFor="name">Nachname</label>
                                    <input className="input" name="name" type="text" placeholder="Schildhammer"></input>
                                </div>
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
                                            <span className="span-sm text-dark bonus" name="ausb">{c.calcAusB(this.state.base.ko, this.state.base.st)}</span>
                                        </div>
                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="anb">Angriffsbonus</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="anb">{c.calcAnB(this.state.base.gs)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="abb">Abwehrbonus</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="abb">{c.calcAbB(this.state.base.gw)}</span>
                                        </div>
                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="schb">Schadensbonus</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="schb">{c.calcSchB(this.state.base.ko, this.state.base.st)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="zaub">Zauberbonus</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="zaub">{c.calcZauB(this.state.base.zt)}</span>
                                        </div>
                                    </div>
                                    <div className="input-label">
                                        <label htmlFor="resg">Resistenzb. Geist</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="resg">{c.calcResG(this.state.base.in, this.state.character_info.classtype, this.state.character_info.race)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-around">
                                    <div className="input-label">
                                        <label htmlFor="resk">Resistenzb. Körper</label>
                                        <div className="d-flex flex-column justify-content-center span-container">
                                            <span className="span-sm text-dark bonus" name="resk">{c.calcResK(this.state.base.ko, this.state.character_info.classtype, this.state.character_info.race)}</span>
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