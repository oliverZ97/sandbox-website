import React, { Component } from "react";
import "../assets/scss/components/DiceInput.scss";

class DiceInput extends Component {
    constructor(props){
        super(props)
    }

    calcResult() {
        let roll = this.getRolls();
        let dice = this.getDice();
        let boni = this.getBonus();
        let results = [];
        for(let i = 0; i < roll; i++) {
            let result = (this.getRandom(dice)) + parseInt(boni);
            results.push(result)
        }
        this.pushResultToHistory(roll, dice, boni, results);
    }

    pushResultToHistory(roll, dice, boni, results) {
        let operator = "+/-";
        if(boni >= 0) {
            operator = " + ";
        } else {
            operator = ""
        }
        let result = 0;
        let resultsStr = "("
        let counter = 0;
        results.forEach(element => {
            counter++
            result += element
            if(counter === results.length) {
                resultsStr += element
            } else {
                resultsStr += element + "+"
            }
        });
        resultsStr += ")";
        let resultStr = roll + "d" + dice + operator + boni + " = "  + result;
        let resultData = {
            resultStr: resultStr,
            results: resultsStr
        }
        let history = this.props.history;
        history.push(resultData);
        this.props.setHistory(history);
    }

    getRandom(dice) {
        return Math.ceil(Math.random() * dice)
    }

    getRolls() {
        let rolls = document.getElementById("number" + this.props.index).value;
        if (rolls === "") {
            rolls = 1;
        }
        return rolls;
    }

    getDice() {
        let dice = document.getElementById("dice" + this.props.index);
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
        let bonus = document.getElementById("bonus" + this.props.index).value;
        if (bonus === "") {
            bonus = 0;
        }
        return bonus;
    }

    render() {
        return (
            <div className="row-container justify-content-se">
                <div className="input-container">
                    <label htmlFor="number">Number of Rolls</label>
                    <input id={"number" + this.props.index} placeholder="1" name="number" min="0" type="number"></input>
                </div>
                <div className="input-container">
                    <label htmlFor="dice">Dice</label>
                    <div className="select-wrapper">
                    <select name="dice" id={"dice" + this.props.index}>
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
                    
                </div>
                <div className="input-container">
                    <label htmlFor="bonus">Bonus/Malus</label>
                    <input id={"bonus" + this.props.index} name="bonus" type="number" placeholder="0"></input>
                </div>
                <button className="btn rotate" onClick={() => this.calcResult()}><i className="icon-large fas fa-dice-d20"></i></button>
            </div>
        );
    }
}

export default DiceInput;