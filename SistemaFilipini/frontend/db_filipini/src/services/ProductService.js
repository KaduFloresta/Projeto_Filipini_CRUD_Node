import http from "../http-common";

class ProductService { 

    // [authJwt.verifyToken, authJwt.isAdmin]
    create(data) {
        return http.post("/produto", data);
    }

    // get(id) {
    //     return http.get(`/produtos/${id}`);
    // };

    getAll() {
        return http.get("/produtos");
    }

    // update(id, data) {
    //     return http.put(`/produtos/${id}`, data);
    // };

    // delete(id) {
    //     return http.delete(`/produtos/${id}`);
    // };

    // deleteAll() {
    //     return http.delete("/produtos");
    // };   
}

export default new ProductService();