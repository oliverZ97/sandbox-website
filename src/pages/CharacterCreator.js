import React, { Component } from "react";
import "../assets/scss/pages/CharacterCreator.scss";
import "regenerator-runtime/runtime.js";
const db = require("../sys/database");

class CharacterCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            races: [],
            classes: [],
            initial: true
        }

        this.setCharacterData = this.setCharacterData.bind(this);
    }

    async getFormularData() {
        db.pouchGET("gender", this.setCharacterData)
        db.pouchGET("race", this.setCharacterData)
        db.pouchGET("class", this.setCharacterData)
    }

    setCharacterData(data){
        switch(data._id) {
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
        if(this.state.initial) {
            this.setState({
                initial: false
            })
        }
    }

    render() {
        if(this.state.initial){
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
            <div className="d-flex flex-row">
                <div className="card">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-around">
                            <div className="input-label">
                                <label htmlFor="name">Vorname</label>
                                <input className="input" name="name" type="text"></input>
                            </div>
                            <div className="input-label">
                                <label htmlFor="name">Nachname</label>
                                <input className="input" name="name" type="text"></input>
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
                                <label htmlFor="age">Alter</label>
                                <input className="input" name="age" type="number"></input>
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
                                <input className="input" name="ST" type="number" min="1" max="100"></input>
                            </div>
                            <div className="input-label">
                                <label htmlFor="GS">GS</label>
                                <input className="input" name="GS" type="number" min="1" max="100"></input>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <div className="input-label">
                                <label htmlFor="GW">GW</label>
                                <input className="input" name="GW" type="number" min="1" max="100"></input>
                            </div>
                            <div className="input-label">
                                <label htmlFor="KO">KO</label>
                                <input className="input" name="KO" type="number" min="1" max="100"></input>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <div className="input-label">
                                <label htmlFor="IN">IN</label>
                                <input className="input" name="IN" type="number" min="1" max="100"></input>
                            </div>
                            <div className="input-label">
                                <label htmlFor="ZT">ZT</label>
                                <input className="input" name="ZT" type="number" min="1" max="100"></input>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
}

export default CharacterCreator;