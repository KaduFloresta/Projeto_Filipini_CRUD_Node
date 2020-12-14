import http from "../http-common";

class UserService {
    create(data) {
        return http.post("/user", data);
    }
    get(id) {
        return http.get(`/user/${id}`);
    }

    getAll() {
        return http.get("/user");
    }

    update(id, data) {
        return http.put(`/user/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/user/${id}`);
    }

    // deleteAll() {
    //     return http.delete("/produtos");
    // };   
}

export default new UserService();