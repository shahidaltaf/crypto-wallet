import axios from 'axios';
import { ServerResponse } from '../store/types';

export const fetchTxData = () => {
    return new Promise<ServerResponse>((resolve, reject) => {
        const baseUrl = 'http://localhost:8888';
        const pricesUrl = `${baseUrl}/prices`;
        const custodialUrl = `${baseUrl}/custodial-txs`;
        const btcUrl = `${baseUrl}/btc-txs`;
        const ethUrl = `${baseUrl}/eth-txs`;

        axios.all([
            axios.get(pricesUrl),
            axios.get(custodialUrl),
            axios.get(btcUrl),
            axios.get(ethUrl)
        ]).then(axios.spread((...responses) => {
            const serverResponse: ServerResponse = {
                prices: responses[0].data,
                custodialTxs: responses[1].data,
                btcTxs: responses[2].data,
                ethTxs: responses[3].data,
            }

            return resolve(serverResponse);
        })).catch(errors => {
            return reject(errors);
        });
    });
}
