import { User, Booking } from '../../models';

const reserveHouse = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }


    // Check user cookie
    const userToken = req.cookies['next-bnb-session'];
    if (!userToken) {
        return res.status(401).end();
    }

    const user = await User.findOne({ where: { session_token: userToken } });

    if (user) {
        await Booking.create({
            houseId: req.body.houseId,
            userId: user.id,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });

        return res.status(200).send({ error: false, message: 'Successfully booked!' });
    } else {
        return res.status(401).send({ error: true, message: 'Unauthorized' });
    }
}

export default reserveHouse;