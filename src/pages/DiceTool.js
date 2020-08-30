import React, { Component } from "react";
import "../assets/scss/pages/DiceTool.scss";
import PageHeader from "../components/PageHeader";
import DiceInput from "../components/DiceInput";

class DiceTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputList: [],
            history: []
        };

        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.setHistory = this.setHistory.bind(this);
        this.resetHistory = this.resetHistory.bind(this);
    }

    setHistory(history) {
        this.setState({
            history: history
        })
    }

    resetHistory() {
        this.setState({
            history: []
        })
    }

    onAddBtnClick(event) {
        const inputList = this.state.inputList;
        this.setState({
            inputList: inputList.concat(<DiceInput history={this.state.history} setHistory={this.setHistory} index={inputList.length} />)
        });
    }

    render() {
        const history = this.state.history.map((item) => {
            return <div className="history-item-block">
                    <p className="history-item" >{item.resultStr}</p>
                    <p className="history-item" >{item.results}</p>
                </div>
        })

        return (
            <div className="dicetool h-100">
                <div className="flex-row justify-content-sb h-100">
                    <div className="flex-column">
                        <DiceInput history={this.state.history} setHistory={this.setHistory} index={100}></DiceInput>
                        <DiceInput history={this.state.history} setHistory={this.setHistory} index={101}></DiceInput>
                        <DiceInput history={this.state.history} setHistory={this.setHistory} index={102}></DiceInput>
                        {this.state.inputList.map(function (input) {
                            return input;
                        })}
                        <button className="fas fa-plus-circle btn-large btn-ghost" onClick={this.onAddBtnClick}></button>
                    </div>
                    <div className="flex-column history">
                        <h2 className="history-title">Dice History</h2>
                        <div className="history-item-container" id="history">{history}</div>
                        <button className="fas fa-trash-alt btn mx-auto icon-small reset-fixed" onClick={() => {this.resetHistory()}}></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DiceTool;