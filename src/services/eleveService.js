import axios from "axios";
import { API_URL } from "../config/root/modules";
//import { header } from "./Auth.services";
class EleveService  {
    get(){
        return axios.get(API_URL + "/eleves");
    }
   
    post(data){
        return axios.post(API_URL + "/eleves", data,);
    }
    put(id){
        return axios.put(API_URL + "/pictures/" + id, [], );
    }
    delete(id){
        return axios.delete(API_URL + "/pictures/" + id, );
    }
}

export default new EleveService ()