import http from "../http-common";

class ShopService {
    // [authJwt.verifyToken, authJwt.isAdmin]
    create(data) {
        return http.post("/vendas", data);
    }

    get(id) {
        return http.get(`/vendas/${id}`);
    }

    getAll() {
        return http.get("/vendas");
    }

    update(id, data) {
        return http.put(`/vendas/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/vendas/${id}`);
    }
}
export default new ShopService();