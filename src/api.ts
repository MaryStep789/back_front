import axios from "axios"
import {Stock} from "./entity/stock";

export class StockApi {
    public static getStocks = () => {
        return axios.get("/stock");
    }
    public static save = (stock: Stock) => {
        return axios.post("/stock", stock);
    }
    public static update = (stock: Stock) => {
        return axios.put("/stock", stock);
    }
}
