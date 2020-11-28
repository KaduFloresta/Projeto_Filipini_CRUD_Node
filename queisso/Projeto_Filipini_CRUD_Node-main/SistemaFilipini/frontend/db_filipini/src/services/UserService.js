import http from "../http-common";

class UserService {
    signup(data) {
        return http.post("/signup", data);
    }

    signin(data) {

    };

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

export default new UserService();