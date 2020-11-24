import http from "../http-common";

class ProductService { 
    create(data) {
        return http.post("/produto", data);
    }

    // findOne(data) {

    // };

    // findAll(data) {

    // };

    // update(data) {

    // };

    // delete(data) {

    // };

    // deleteAll(data) {

    // };   
}

export default new ProductService();