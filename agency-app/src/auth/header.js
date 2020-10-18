export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('response'));

    if (user && user.token) {
        return { Authorization: user.token };
    } else {
        return {};
    }
}