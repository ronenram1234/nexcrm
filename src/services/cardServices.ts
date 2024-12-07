import axios from "axios";
import { Card } from "../interfaces/Card";


const api: string = `${process.env.REACT_APP_API}/cards`;

export function createCart(cardID: string) {
  return axios.post(api, { cardID, products: [], active: true });
}