import http from "../http-common";

class ProductService { 

    // [authJwt.verifyToken, authJwt.isAdmin]
    create(data) {
        return http.post("/produto", data);
    }

    get(id) {
        return http.get(`/produto/${id}`);
    }

    getAll() {
        return http.get("/produto");
    }

    update(id, data) {
        return http.put(`/produto/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/produto/${id}`);
    }

    // deleteAll() {
    //     return http.delete("/produtos");
    // };   
}

export default new ProductService();