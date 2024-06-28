const fetch=require("node-fetch");

const HEADERS={
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "es-ES,es;q=0.9,en;q=0.8",
        "dpr": "1.25",
        "priority": "u=0, i",
        "sec-ch-prefers-color-scheme": "dark",
        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
        "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"125.0.6422.142\", \"Chromium\";v=\"125.0.6422.142\", \"Not.A/Brand\";v=\"24.0.0.0\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": "\"\"",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-ch-ua-platform-version": "\"10.0.0\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "viewport-width": "697"
}


async function checkAccount(username){
    

    let response,html;
    try{
        response=await fetch(`https://www.instagram.com/${username}/`,{
            headers:HEADERS,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET"
        })
    
        html=await response.text()  
    }
    catch(e){
        return {error:e,accountExist:undefined};
    }

    let htmlSize=html.length;

    let result=evaluateHtmlSize(htmlSize);

    return {error:undefined,accountExist:result};


}

function evaluateHtmlSize(size) {
    const existsSize = 489000;
    const notExistsSize = 369000;
    const tolerance = 10000;
  
    if (Math.abs(size - existsSize) <= tolerance) {
      return true;
    } else if (Math.abs(size - notExistsSize) <= tolerance) {
      return false;
    } else {
      return null; // O puedes retornar otro valor predeterminado
    }
}

module.exports={checkAccount};
