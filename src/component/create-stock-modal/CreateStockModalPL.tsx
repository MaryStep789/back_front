import * as I from './CreateStockModal';
import {StockApi} from "../../api";
import dayjs from "dayjs";
import React from "react";
export class CreateStockModalPL extends React.Component<I.OwnProps, I.OwnState> {
    constructor(props: I.OwnProps) {
        super(props);
        this.state = {
            stock: {
                id: -1,
                name: '',
                data: new Date,
                cost: 0,
            }
        };
    }
    private onChangeData = (event: any) => {
        this.setState({stock: {...this.state.stock, data: new Date(event.target.value)}});
    }
    private onChangeName = (event: any) => {
        this.setState({stock: {...this.state.stock, name: event.target.value}});
    }
    private onChangeCost = (event: any) => {
        this.setState({stock: {...this.state.stock, cost: event.target.value}});
    }

    private save = () => {
        StockApi.save(this.state.stock).then(response => {
            this.close();
            this.props.reloadData();
        });
    }

    private close = () => {
        this.props.closeModal();
    }
    render() {
        return <div style={{display: "grid"}}>
            <label>
                Name: <input name="name" value={this.state.stock.name} onInput={this.onChangeName}/>
            </label>
            <label>
                Data: <input name="data" type='date' value={dayjs(this.state.stock.data).format("YYYY-MM-DD")} onInput={this.onChangeData}/>
            </label>
            <label>
                Cost: <input name="cost" type="number" min={0} value={this.state.stock.cost} onInput={this.onChangeCost}/>
            </label>
            <div>
                <button type="button" onClick={this.save}>Save</button>
                <button type="button" onClick={this.close}>Close</button>
            </div>
        </div>;
    }
}