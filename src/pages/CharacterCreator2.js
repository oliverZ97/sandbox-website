import React, { Component } from "react";
import "../assets/scss/pages/CharacterCreator.scss";
import "regenerator-runtime/runtime.js";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import BasisCard from "../components/BasisCard";
import CharCard from "../components/CharCard";
import StatCard from "../components/StatCard";
import BonusCard from "../components/BonusCard";
import BackgroundCard from "../components/BackgroundCard";
import Infotext from "../components/Infotext";
const db = require("../sys/database");
const c = require("../sys/calculations");

class CharacterCreator2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            races: [],
            classes: [],
            statures: [],
            milieus: [],
            weaponhand: [],
            origins: [],
            character: {
                base: {},
                character_info: {},
                bonus: {}
            },
            options: {
                lock_height: false,
                lock_weight: false,
            },
            activeStep: 1
        }

        this.setCharacterData = this.setCharacterData.bind(this);
        this.setInfoTexts = this.setInfoTexts.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.updateCharacter = this.updateCharacter.bind(this);
    }

    componentDidMount() {
        this.getFormularData();
        this.init();
    }

    async getFormularData() {
        db.pouchGET("gender", this.setCharacterData);
        db.pouchGET("race", this.setCharacterData);
        db.pouchGET("class", this.setCharacterData);
        db.pouchGET("stature", this.setCharacterData);
        db.pouchGET("milieu", this.setCharacterData);
        db.pouchGET("weaponhand", this.setCharacterData);
        db.pouchGET("origin", this.setCharacterData);
        db.pouchGET("charactercreatorinfotext", this.setInfoTexts);
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
            case "origin":
                this.setState({
                    origins: Object.values(data.origins)
                })
        }
    }

    setInfoTexts(data) {
        this.setState({
            infotexts: data
        })
    }

    init() {
        console.log("initial: ", this.state.character);
    }

    updateCharacter(newChar) {
        this.setState({
            character: newChar
        })
    }

    nextStep() {
        console.log(this.state.character)
        let active = this.state.activeStep + 1;
        this.setState({
            activeStep: active
        })
    }

    previousStep() {
        let active = this.state.activeStep - 1;
        this.setState({
            activeStep: active
        })
    }

    render() {
        return (
            <div className="d-flex flex-row justify-content-center">
                <div className="d-flex flex-column justify-content-center w-50">
                    {this.state.activeStep === 1 && <Infotext title={"Basiseigenschaften"}/>}
                    {this.state.activeStep === 2 && <Infotext title={"Charakterdaten"}/>}
                    {this.state.activeStep === 3 && <Infotext title={"Charaktereigenschaften"}/>}
                    {this.state.activeStep === 4 && <Infotext title={"Eigenschaftsboni"}/>}
                    {this.state.activeStep === 5 && <Infotext title={"Hintergrunddaten"}/>}

                    {this.state.activeStep === 1 && <BasisCard character={this.state.character} update={this.updateCharacter} />}
                    {this.state.activeStep === 2 && <CharCard state={this.state} update={this.updateCharacter} />}
                    {this.state.activeStep === 3 && <StatCard state={this.state} update={this.updateCharacter} />}
                    {this.state.activeStep === 4 && <BonusCard state={this.state} update={this.updateCharacter} />}
                    {this.state.activeStep === 5 && <BackgroundCard state={this.state} update={this.updateCharacter} />}
                    <div className="d-flex flex-row justify-content-between">
                        {this.state.activeStep > 1 && <button className="btn btn-small" onClick={this.previousStep}><FaArrowLeft/></button>}
                        {this.state.activeStep < 6 && <button className="btn btn-small" onClick={this.nextStep}><FaArrowRight/></button>}
                    </div>
                </div>

            </div>
        );
    }
}

export default CharacterCreator2;