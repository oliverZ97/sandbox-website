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
            }
        }

        this.setCharacterData = this.setCharacterData.bind(this);
        this.getRandom = this.getRandom.bind(this);
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
            this.setState({
                initial: false
            })
        }
    }

    getRandom(dice) {
        return Math.ceil(Math.random() * dice)
    }

    rollBasis(dice) {
        let basis = Object.keys(this.state.base)
        let newBase = {}
        basis.forEach((att) => {
            let roll = this.getRandom(dice);
            newBase[att] = roll;
        })
        this.setState({
            base: newBase
        })
    }

    render() {
        if (this.state.initial) {
            this.getFormularData()
        }
        const races = this.state.races.map((race, index) => {
            return <option key={index}>{race}</option>
        });

        const classes = this.state.classes.map((classitem, index) => {
            return <option key={index}>{classitem.name} ({classitem.short})</option>
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
                                    <label htmlFor="name">Vorname</label>
                                    <input className="input" name="name" type="text" placeholder="Eorn"></input>
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
                                    <input className="input" name="level" type="number" placeholder="1" min="0"></input>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="input-label">
                                    <label htmlFor="race">Rasse</label>
                                    <select className="input" name="race">
                                        {races}
                                    </select>
                                </div>
                                <div className="input-label">
                                    <label htmlFor="class">Klasse</label>
                                    <select className="input" name="class">
                                        {classes}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-around">
                                <div className="input-label">
                                    <label htmlFor="ST">ST</label>
                                    <input className="base input" name="ST" type="number" min="1" max="100" value={this.state.base.st}></input>
                                </div>
                                <div className="input-label">
                                    <label htmlFor="GS">GS</label>
                                    <input className="base input" name="GS" type="number" min="1" max="100" value={this.state.base.gs}></input>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="input-label">
                                    <label htmlFor="GW">GW</label>
                                    <input className="base input" name="GW" type="number" min="1" max="100" value={this.state.base.gw}></input>
                                </div>
                                <div className="input-label">
                                    <label htmlFor="KO">KO</label>
                                    <input className="base input" name="KO" type="number" min="1" max="100" value={this.state.base.ko}></input>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="input-label">
                                    <label htmlFor="IN">IN</label>
                                    <input className="base input" name="IN" type="number" min="1" max="100" value={this.state.base.in}></input>
                                </div>
                                <div className="input-label">
                                    <label htmlFor="ZT">ZT</label>
                                    <input className="base input" name="ZT" type="number" min="1" max="100" value={this.state.base.zt}></input>
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
                                    <label htmlFor="pA">pA</label>
                                    <span className="input text-dark" name="pA" >{c.calcPA(this.state.base.in)}</span>
                                </div>
                                <div className="input-label">
                                    <label htmlFor="Wk">Wk</label>
                                    <span className="input text-dark" name="Wk">{c.calcWk(this.state.base.ko, this.state.base.in)}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="input-label">
                                    <label htmlFor="Au">Au</label>
                                    <span className="input text-dark" name="Au">{c.calcAu(this.state.race)}</span>
                                </div>
                                <div className="input-label">
                                    <label htmlFor="Ausb">AusB</label>
                                    <span className="input text-dark" name="Ausb"></span>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="input-label">
                                    <label htmlFor="LP">LP</label>
                                    <span className="input text-dark" name="LP">8</span>
                                </div>
                                <div className="input-label">
                                    <label htmlFor="AP">AP</label>
                                    <span className="input text-dark" name="AP"></span>
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