import {Stock} from "../../entity/stock";

export interface OwnProps {}

export interface OwnState {
    stocks: Stock[];
    shownCreateModal: boolean;
    selectedStock: Stock;
}