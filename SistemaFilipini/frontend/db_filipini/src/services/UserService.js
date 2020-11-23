import http from "../http-common";

class UserService {
    
    signup(data){
        return http.post("/signup", data);
    }

    // find(){
    //     return http.get("/usuarios");
    // }
}

export default new UserService();