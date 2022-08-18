module.exports = () => (req, res, next) => {
    res.setHeader('Access-Contol-Allow-Origin', '*');
    res.setHeader('Access-Contol-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
    res.setHeader('Access-Contol-Allow-Header', 'Content-Type, X-Authorization');
    next();
}