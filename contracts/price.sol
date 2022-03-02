pragma solidity ^0.4.26; // 0.4.26 commit
import "./DateTime.sol";

contract price{
    
    address owner;
    string promises;
    DateTime datetime = new DateTime();

    constructor() public{
        owner = msg.sender;
    }

    struct pricedata{
        uint lowprice;
        uint highprice;
        uint avgprice;
        string time;
    }
    
    mapping(string  => pricedata) PD;
    
    modifier onlyowner(){
        require(msg.sender == owner);
        _;
    }

    function setData(string token, uint _lowprice, uint _highprice, 
                        uint _avgprice ,string _ExchangeName) public onlyowner{
        require(_lowprice > 0 && _highprice > 0 && _avgprice > 0 , "price need positive number.");
        PD[token] = pricedata({
            lowprice : _lowprice,
            highprice : _highprice,
            avgprice : _avgprice,
            time : string(abi.encodePacked(
                uintToString(datetime.getYear(now)), '/', 
                uintToString(datetime.getMonth(now)) , '/', 
                uintToString(datetime.getDay(now)) , '/', 
                uintToString(transToTaiwanTime(datetime.getHour(now))) , ':', 
                uintToString(datetime.getMinute(now)) , ':', 
                uintToString(datetime.getSecond(now))
            ))
        });
        promises = _ExchangeName;
    }

    function getData(string token) public view returns (uint , uint , uint , string ,string){
        pricedata memory pd = PD[token];
        return (pd.lowprice, pd.highprice, pd.avgprice, pd.time ,promises);
    }
    
    function uintToString(uint v) pure public returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            s[j] = reversed[i - j];
        }
        str = string(s);
    }

    function transToTaiwanTime(uint t)public returns(uint){
        t = t + 8;
        if (t > 24) t = t - 24;
        return t;
    }
    
}