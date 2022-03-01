import { User } from "../../../models";
import { generateString } from '../../../utils/globalService';
import Cookies from 'cookies';

const login = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { email, password } = req.body;

    //Find the user first
    let user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(401).send({ error: true, message: 'Could not find account' });
    } else {
        const passwordCheck = await user.isPasswordValid(password);

        if(!passwordCheck) {
            return res.status(401).send({ error: true, message: 'Invalid password' });
        } else {
            let sessionToken;
            const sessionExpiration = new Date();
            sessionExpiration.setDate(sessionExpiration.getDate() + 1);

            if (new Date(user.session_expiry) < new Date()) {
                sessionToken = generateString(255);
                await User.update({
                    session_token: sessionToken,
                    session_expiry: sessionExpiration
                }, { where: { email } });
            } else {
                sessionToken = user.session_token;
                await User.update({
                    session_expiry: sessionExpiration
                }, { where: { email } });
            }

            // Create a cookie for the session
            const cookies = new Cookies(req, res);
            cookies.set('next-bnb-session', sessionToken, {
                httpOnly: true // This cookie is only accessible by the server
            });

            return res.status(200).send({ error: false, message: 'Successfully logged in' });
        }
    }
}

module.exports = login;