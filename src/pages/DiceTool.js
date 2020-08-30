import React, { Component } from "react";
import "../assets/scss/pages/DiceTool.scss";
import PageHeader from "../components/PageHeader";
import DiceInput from "../components/DiceInput";

class DiceTool extends Component {
    constructor(props) {
        super(props);
        this.state = {inputList: []};
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
    }

    calcResult() {
        let roll = this.getRolls();
        let dice = this.getDice();
        let boni = this.getBonus();
        let result = (roll * this.getRandom(dice)) + boni;
        alert(result)
    }

    getRandom(dice) {
        return Math.ceil(Math.random() * dice)
    }

    getRolls() {
        let rolls = document.getElementById("number").value;
        if (rolls === "") {
            rolls = 1;
        }
        return rolls;
    }

    getDice() {
        let dice = document.getElementById("dice");
        let dice_value = dice.options[dice.selectedIndex].value;
        switch (dice_value) {
            case "d2":
                return 2;
            case "d4":
                return 4;
            case "d6":
                return 6;
            case "d8":
                return 8;
            case "d10":
                return 10;
            case "d12":
                return 12;
            case "d20":
                return 20;
            case "d100":
                return 100;
        }
    }

    getBonus() {
        let bonus = document.getElementById("bonus").value;
        if (bonus === "") {
            bonus = 0;
        }
        return bonus;
    }

    onAddBtnClick(event) {
        const inputList = this.state.inputList;
        console.log(inputList.length)
        this.setState({
            inputList: inputList.concat(<DiceInput index={inputList.length}/>)
        });
    }

    render() {
        return (
            <div className="dicetool h-100">
                <div className="flex-row justify-content-sb h-100">
                    <div className="flex-column">
                        <DiceInput index={100}></DiceInput>
                        <DiceInput index={101}></DiceInput>
                        <DiceInput index={102}></DiceInput>
                        {this.state.inputList.map(function (input) {
                            return input;
                        })}
                        <button className="fas fa-plus-circle btn-large btn-ghost" onClick={this.onAddBtnClick}></button>
                    </div>
                    <div className="flex-column history">
                        <h2 className="history-title">Dice History</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default DiceTool;