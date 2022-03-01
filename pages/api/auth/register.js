import { User } from "../../../models";
import { generateString } from "../../../utils/globalService";


const register = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).end();
    }
    const { email, password, confirmPassword } = req.body;

    //Check if passwords match first
    if (password !== confirmPassword) {
        res.status(400).send({ error: true, message: 'Passwords do not match' });
    }

    //Check if user already exists
    let user = await User.findOne({ where: { email } });

    if (user) {
        res.status(409).send({ error: true, message: 'User already exists' });
    } else {
        //Generate a session token
        const session_token = generateString(255);
        const session_expiry = new Date();
        session_expiry.setDate(session_expiry.getDate() + 1);

        user = await User.create({ email, password, session_token, session_expiry });
        res.status(201).send({ error: false, message: 'Account successfully created'});
    }
};

export default register;