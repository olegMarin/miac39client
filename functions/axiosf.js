import axios from 'axios';
export default axi
function axi(url, method, params) {
    return new Promise(function (resolve, reject) {       
            axios({
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded', 
                    'charset': 'utf-8',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'ReferrerPolicy': "unsafe-url"},
                url: 'http://80.87.192.94/connection/' + url,
                data: {
                    "jsonrpc": "2.0",
                    "id": 1,
                    "method": method,
                    "params": params
                },
                responseType: 'json', 
                referrerPolicy: "unsafe-url", 
            })
                .then((res) => {
                    //let per = Array.from(res.data.result.list);
                    //let per = Array.from(res.data)
                    console.log(res)
                    resolve(res.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });  
};  
    