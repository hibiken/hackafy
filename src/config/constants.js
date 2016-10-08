export const API_URL = process.env.NODE_ENV === 'production' ?
                      'https://enigmatic-mountain-38641.herokuapp.com/api' :
                      'http://localhost:5000/api';

export const WS_URL =  process.env.NODE_ENV === 'production' ?
                       'wss://enigmatic-mountain-38641.herokuapp.com/api/cable' :
                       'ws://localhost:5000/api/cable';
