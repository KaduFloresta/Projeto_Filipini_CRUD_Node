import http from "../http-common";

class UserAccessService {
    
    create(data) {
        return http.post("/user", data);
    }
    // committ
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

export default new UserAccessService();