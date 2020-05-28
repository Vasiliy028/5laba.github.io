
var key = "key"
var otst = "__"
let i = 0
analogID = (root) => {
    var text;
    for (var oNode = root.firstChild; oNode.nextSibling != null; oNode = oNode.nextSibling) {
      if (oNode.id != undefined){
        if(text != undefined){
            if (i == 0){
                text = text  + "->" + otst + oNode + "#" + oNode.id
            }
            else{
                text = text + otst + oNode + "#" + oNode.id
            }
        }
        else{
            if (i == 0){
                text =  "->" + otst + oNode + "#" + oNode.id
            }
            else{
                text = otst + oNode + "#" + oNode.id
            }
        }
      }
      if(oNode.childNodes.length!=0){
        if(text != undefined){
            i++;
            otst = otst + "__" ;
            text = text + "->" + analogID(oNode)
            otst = otst.replace("__", "");
            i--;
        }
        else{
            i++;
            otst = otst + "__"
            text = "->" + analogID(oNode)
            otst = otst.replace("__", "");
            i--;
        }
      }
    }
    if(text!=undefined){
        return(text)
    }
    else{
        return("")
    }
} 
// создаеёт строку элементов 

Click = (id)=>{
    let idd = document.getElementById('text').value;
    if (idd === id){
        let text = analogID(document.getElementById(id))
        text = document.getElementById(id) + "#" + id + "->" + text
        sessionStorage.setItem(key, text);
        window.close()
        window.open("new.html") 
    }
}
// обработчик события onclick

function replaceAll(find, replace, str) {
    while( str.indexOf(find) > -1) {
      str = str.replace(find, replace);
    }
    return str;
}
//удаление некоторой части строки, которую мы задаём 

Obrabot = (text) => {
    let otv = text;
    otv = replaceAll("[object HTML", '', otv);
    otv = replaceAll("Element]", '', otv);
    otv = replaceAll("->->", '->', otv);
    otv = replaceAll("->", '<br>', otv);
    return otv
}
// обработка строки элементов для крассивого вывода

Treatment = () => {
    let text = sessionStorage.getItem(key)
    text = Obrabot(text)
    document.getElementById("domtree").innerHTML = text;    
}
// вывод элементов в новый html


Back = ()=>{
    window.close()
    window.open("index.html")
}
//обработчик события кнопки "назад"