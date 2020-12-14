import http from "../http-common";

class UserLoginService {

    signup(data) {
        return http.post("/signup", data);
    }

    // signin(data) {

    // };

    get(id) {
        return http.get(`/userlogin/${id}`);
    }

    getAll() {
        return http.get("/userlogin");
    }

    update(id, data) {
        return http.put(`/userlogin/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/userlogin/${id}`);
    }

    // deleteAll() {
    //     return http.delete("/userlogins");
    // };   
}

export default new UserLoginService();