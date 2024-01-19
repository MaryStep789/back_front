import {Stock} from "../../entity/stock";

export interface OwnProps {
    closeModal: Function;
    reloadData: Function;
}

export interface OwnState {
    stock: Stock;
}