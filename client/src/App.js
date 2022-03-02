import React, { Component } from "react"; // react框架
import SimpleStorageContract from "./contracts/price.json";
// import getWeb3 from "./utils/getWeb3";
import "./App.css";

class App extends Component {
  
    state = {web3: null, accounts: null, contract: null ,info:null ,lowprice : 0, highprice : 0, avgprice : 0, loading: true};
    pricedata = [] ;
    pricedataname = [];

    componentDidMount = async () => {
        try {
            // 獲取網路提供商和web3實例
            // 引入web3與以太坊交易模組
            const Web3 = require('web3')
            const Tx = require('ethereumjs-tx').Transaction
             
            // 連線至ganache虛擬網路獲取帳戶
            let web3 = new Web3(
              new Web3.providers.HttpProvider(
                "http://140.120.55.83:8550"
              )
            )
            const account = "0xF16E18958c4FdA85a66d3d531Eb775382edfcb60"
            const privatekey = Buffer.from("ccab32e27f23626eb3e1bd3a68a166d9ab508f0d81aae75645c6cf8210b9ce11", 'hex');
            const contractAddress = "0x4123F7147BD80Ab39410dF2F8a5A0A2afa5892Aa";
            
            // 使用web3獲取用戶的帳戶
            const accounts = await web3.eth.getAccounts();
            const balances  = await web3.eth.getBalance(accounts[0]);
            var bal = web3.utils.fromWei(balances, 'ether');

            this.setState({account : accounts[0], balance : bal});

            // 獲取合同實例
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];

            const instance = new web3.eth.Contract(
              SimpleStorageContract.abi,
              deployedNetwork && deployedNetwork.address,
            );

            // 將web3，帳戶和合同設置為狀態，然後繼續執行
            // 與合同方法進行交互的示例
            this.setState({ web3, accounts, contract: instance });

            // 呼叫getdata方法
            const getsD = require('./GetData.js');
            const getsdata = getsD.getdata();

            // 使用方法getsdata
            await getsdata.then((response) =>{ 
              const res = response;
              this.pricedata = res.map(data => data.data);
              this.pricedataname = res.map(data => data.name);
              // 將值存到html的dataP跟dataL
              document.getElementById("dataL").textContent = "DataLength : "+this.pricedata.length;
            }).then(() => {
              //取最大最小值
              const getP = require('./GetPrice.js');
              const getprice = getP.GetPriceMinMax(this.pricedata);
              
              this.setState({lowprice : financial(getprice.minprice) , 
                             highprice : financial(getprice.maxprice) , 
                             avgprice : financial(getprice.avgprice)});
              document.getElementById("lowprice").textContent = "lowprice : "+this.state.lowprice;
              document.getElementById("highprice").textContent = "highprice : "+this.state.highprice;
              document.getElementById("avgprice").textContent = "avgprice : "+this.state.avgprice;
            }).then(()=>{
              // 設成table方便使用者觀看
              const getT = require('./GetTable.js');
              getT.gettable("mytable",this.pricedataname,this.pricedata);
            })

            // 將pricedataname改成字串上傳至區塊鏈
            const D_name = this.pricedataname.toString();
            console.log("----Dname----",D_name);

            function financial(x) {
              return Number.parseFloat(x).toFixed(2);
            }
            
            const low = 0 | this.state.lowprice*100;
            const high = 0 | this.state.highprice*100;
            const avg = 0 | this.state.avgprice*100;
            const token = "eth_usd";

            const ContractFunctionsetData = this.state.contract.methods.setData(token, low, high, avg, D_name);

            // 對交易進行簽章
            const functionAbi = ContractFunctionsetData.encodeABI();
            var nonce = 0;
            web3.eth.getTransactionCount(account).then(_nonce => {
              nonce = _nonce.toString(16);
              const txParams = {
                  gasPrice: 100000,
                  gasLimit: 3000000,
                  to: contractAddress,
                  data: functionAbi,
                  from: account,
                  nonce:  '0x' + nonce
              };
            
              const tx = new Tx(txParams);
              tx.sign(privatekey);
          
              const serializedTx = tx.serialize();
          
              web3.eth.sendSignedTransaction(serializedTx.toString('hex'), function(err, hash) {
                  console.log("hash_setData:", hash);
              });
              
            })
              
            // 每20秒刷新一次
            // setTimeout(function () {window.location.reload()}, 20000);

        } catch (error) {
            // 捕獲以上任何操作的任何錯誤
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
      
    };

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div className="App">
              <h1>Account: {this.state.account}<span id="account"></span></h1>
              <h2>You have : {this.state.balance}<span id="balance"></span> Ether</h2>\
              <table width="1600" height="50" id = "mytable"></table>
              <h3 id="lowprice">lowprice:</h3>
              <h3 id="highprice">highprice:</h3>
              <h3 id="avgprice">highprice:</h3>
              <h4 id="dataL">PirceDataLength:</h4>
            </div>
        );
    }
}

export default App;
