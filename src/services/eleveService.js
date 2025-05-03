import axios from "axios";
import { API_URL } from "../config/root/modules";
//import { header } from "./Auth.services";
class EleveService  {
    get(){
        return axios.get(API_URL + "/api/eleve");
    }
   
    post(data){
        return axios.post(API_URL + "/api/eleve", data,);
    }
    put(id){
        return axios.put(API_URL + "/api/eleve/" + id, [], );
    }
    delete(id) {
        return axios.delete(`${API_URL}/api/eleve/${id}`);
      }
}

export default new EleveService ()