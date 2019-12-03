import store from "store";
const USER = "user";
export default {
    saveUser(user) {
        // localStorage.setItem(USER, JSON.stringify(user));
        store.set(USER, user);
    },

    getUser() {
        //return JOSN.parse(localStorage.getItem(USER) || '{}')
        return store.get(USER);
    },

    removeUser() {
        // localStorage.removeItem(USER)
        store.remove(USER);
    }
};