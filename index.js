const {checkAccount}=require("./check_account.js");

exports.handler=async (event)=>{

    let username=event.username;

    let {error,accountExist}=await checkAccount(username);

    if (error){
        return {
            statusCode:500,
            body:JSON.stringify({error:error})
        };
    }

    return {
        statusCode:200,
        body:JSON.stringify({result:accountExist})
    };

}