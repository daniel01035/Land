module.exports=
{
gettable : function(name,arr1,arr2) {
    let table = document.getElementById(name);
    let tr1 = document.createElement("tr");
    let tr2 = document.createElement("tr");
    tr1.appendChild(document.createTextNode("price data name : "));
    tr2.appendChild(document.createTextNode("price data : "));
      for (let key of arr1) {
        let td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(key));
        tr1.appendChild(td1);
        table.appendChild(tr1);
      }
      for (let key of arr2) {
        let td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(key));
        tr2.appendChild(td2);
        table.appendChild(tr2);
      }
    }
}