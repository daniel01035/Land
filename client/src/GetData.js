module.exports=
{
    getdata : function(){
        return new Promise(function (resolve, reject) {   //抓資料而已
            let data = [];
            try {
            // binance
            fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT')
            .then((response) => response.json())
            .then((findresponse)=>{
                const binance = {
                    data: parseFloat(findresponse.price),
                    name: 'binance'
                };
                data.push(binance);
                if (data.length === 5) {
                    resolve(data);
                }
            })
            // maicoin
            fetch('https://max-api.maicoin.com/api/v2/summary')
            .then((response) => response.json())
            .then((findresponse)=>{
                const maicoin = {
                    data: parseFloat(findresponse.tickers.ethusdt.last),
                    name: 'maicoin'
                };
                data.push(maicoin);
                if (data.length === 5) {
                    resolve(data);
                }
            })
            // Gdax
            fetch('https://api.gdax.com/products/ETH-USD/ticker')
            .then((response) => response.json())
            .then((findresponse)=>{
                const Gdax = {
                    data: parseFloat(findresponse.price),
                    name: 'Gdax'
                };
                data.push(Gdax);
                if (data.length === 5) {
                    resolve(data);
                }
            })
            // Bit-Z
            fetch('https://apiv2.bitz.com/Market/getContractTickers?contractId=102')
            .then((response) => response.json())
            .then((findresponse)=>{
                const BitZ = {
                    data: parseFloat(findresponse.data[0].fairPrice),
                    name: 'Bit-Z'
                };
                data.push(BitZ);
                if (data.length === 5) {
                    resolve(data);
                }
            })
            // derbit
            fetch('https://test.deribit.com/api/v2/public/get_index_price?index_name=eth_usd')
            .then((response) => response.json())
            .then((findresponse)=>{
                const derbit = {
                    data: parseFloat(findresponse.result.index_price),
                    name: 'derbit'
                };
                data.push(derbit);
                if (data.length === 5) {
                    resolve(data);
                }
            })
            } catch (error) {
                console.error(error.message);
                resolve(false);
            }
            // }).then(() =>{ 
            //     resolve(data);
            // })
            
        });
    }
}