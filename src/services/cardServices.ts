import axios, { AxiosResponse } from "axios";
import { CardRecFull } from "../interfaces/Card";

const api: string = `${process.env.REACT_APP_API}/cards`;

export function createCart(cardID: string): Promise<AxiosResponse> {
  return axios.post(api, { cardID, products: [], active: true });
}

export function getAllMyCards(token:string): Promise<AxiosResponse> {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${api}/my-cards`,
    headers: {'x-auth-token': token},
  };
  console.log(token)

  return axios.request(config);
}


export function getAllCards(): Promise<AxiosResponse> {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards',
    headers: { }
  };
    
  return axios.request(config);
}


export function setLikeDislike(cardId:string, token:string): Promise<AxiosResponse> {

  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: `${api}/${cardId}`,
    
    headers: { 'x-auth-token': token}
  };
  
  return axios.request(config)

}


// export function updateCard(): Promise<AxiosResponse> {}
export function updateCard(){}
export function createNewCard(){}