import React, { Component } from "react";
import "../assets/scss/pages/DiceTool.scss";
import PageHeader from "../components/PageHeader";

class DiceTool extends Component {

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

    render() {
        return (
            <div className="dicetool">
                <div className="flex-row justify-content-sb">
                    <div className="flex-column">
                        <div className="row-container justify-content-se">
                            <div className="input-container">
                                <label for="number">Number of Rolls</label>
                                <input id="number" placeholder="1" name="number" min="0" type="number"></input>
                            </div>
                            <div className="input-container">
                                <label for="dice">Dice</label>
                                <select name="dice" id="dice">
                                    <option value="d2">D2</option>
                                    <option value="d4">D4</option>
                                    <option value="d6">D6</option>
                                    <option value="d8">D8</option>
                                    <option value="d10">D10</option>
                                    <option value="d12">D12</option>
                                    <option value="d20">D20</option>
                                    <option value="d100">D100</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <label for="bonus">Bonus/Malus</label>
                                <input id="bonus" name="bonus" type="number" placeholder="0"></input>
                            </div>
                        </div>
                        <button className="btn rotate" onClick={() => this.calcResult()}><i className="icon-large fas fa-dice-d20"></i></button>

                    </div>
                    <div className="flex-column history">
                        <h2>Dice History</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default DiceTool;