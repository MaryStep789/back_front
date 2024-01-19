import * as I from "./StockTable";
import {StockApi} from "../../api";
import {Stock} from "../../entity/stock";
import {CreateStockModalPL} from "../create-stock-modal/CreateStockModalPL";
import React from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import dayjs from "dayjs";
export default class StockTablePl extends React.Component<I.OwnProps, I.OwnState> {
    constructor(props: I.OwnProps) {
        super(props);
        this.state = {
            stocks: [],
            shownCreateModal: false,
            selectedStock: {
                id: -1,
                name: '',
                data: new Date,
                cost: 0,
            }
        };
    }
    private onChangeData = (event: any) => {
        this.setState({selectedStock: {...this.state.selectedStock, data: new Date(event.target.value)}});
    }
    private onChangeName = (event: any) => {
        this.setState({selectedStock: {...this.state.selectedStock, name: event.target.value}});
    }
    private onChangeCost = (event: any) => {
        this.setState({selectedStock: {...this.state.selectedStock, cost: event.target.value}});
    }
    private onClickInput = (id: number) => {
        this.setState({selectedStock: {...this.state.stocks.filter(el => el.id == id)[0]}});
    }
    private update = () => {
        StockApi.update(this.state.selectedStock).then(response => this.reloadData());
    }
    componentDidMount() {
        this.reloadData();
    }
    private reloadData = () => {
        StockApi.getStocks().then(response => this.setState({stocks: response.data}));
    }
    private renderRows = () => {
        return this.state.stocks.map(el => this.renderRow(el));
    }
    private renderRow = (stock: Stock) => {
        return <tr>
            <td>
                <input name="name" value={this.state.selectedStock.id !== stock.id ? stock.name : this.state.selectedStock.name} onClick={() => this.onClickInput(stock.id)} onInput={this.onChangeName}/>
            </td>
            <td>
                <input name="data" type='date' value={this.state.selectedStock.id !== stock.id ? dayjs(stock.data).format("YYYY-MM-DD") : dayjs(this.state.selectedStock.data).format("YYYY-MM-DD")} onClick={() => this.onClickInput(stock.id)} onInput={this.onChangeData}/>
            </td>
            <td>
                <input name="cost" type="number" min={0} value={this.state.selectedStock.id !== stock.id ? stock.cost : this.state.selectedStock.cost} onClick={() => this.onClickInput(stock.id)} onInput={this.onChangeCost}/>
            </td>
            <td>
                <button type="button" disabled={this.state.selectedStock.id !== stock.id} onClick={this.update}>Update</button>
            </td>
        </tr>

    }
    private renderTable = () => {
        return <table>
            <tr>
                <th>Name</th>
                <th>Data</th>
                <th>Cost</th>
            </tr>
            {
                this.renderRows()
            }
        </table>
    }
    private showCreateModal = () => {
        this.setState({shownCreateModal: true});
    }
    private closeModal = () => {
        this.setState({shownCreateModal: false});
    }
    render () {
        return(
            <React.Fragment>
                <div>
                    <div>
                        {
                            this.renderTable()
                        }
                    </div>
                    <button type="button" onClick={this.showCreateModal}>Add new</button>
                    {
                        this.state.shownCreateModal ? (
                            <CreateStockModalPL
                                closeModal={this.closeModal}
                                reloadData={this.reloadData}
                            />
                        ): null
                    }
                    <LineChart width={600} height={300} data={this.state.stocks}>
                        <CartesianGrid />
                        <Legend />
                        <Tooltip />
                        <Line type="monotone" dataKey="cost" stroke="#8884d8" />
                    </LineChart>
                </div>
            </React.Fragment>
        )
    }
}