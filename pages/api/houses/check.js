import { Booking } from '../../../models';
import { Op } from 'sequelize';

// This function is used to check if there are any bookings for the given house id
const canBook = async (houseId, startDate, endDate) => {
    const results = await Booking.findAll({
        where: {
            houseId,
            startDate: {
                [Op.lte]: new Date(endDate)
            },
            endDate: {
                [Op.gte]: new Date(startDate)
            }
        }
    });
    
    return results.length > 0;
}

const checkBookingDates = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    let message = "You can book this house!";
    if (await canBook(req.query.id, req.body.startDate, req.body.endDate)) {
        message = "The house is booked in the specified dates";
    }

    return res.status(200).send({ error: false, message });
}

export default checkBookingDates;