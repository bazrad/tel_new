import axios from "axios"


export default async function CreateCall(postData) {
    try{
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/call`,postData)
        if(response && response.data)
          return response.data
        return false
    }
    catch(error){
        console.log(error)
        return false;
    }
}