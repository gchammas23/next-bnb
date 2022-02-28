const register = (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).end();
    }
    console.log(req.body);
    res.end();
};

export default register;