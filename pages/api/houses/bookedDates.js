import { Booking } from '../../../models';
import { Op } from 'sequelize';

const getDatesBetweenDates = (startDate, endDate) => {
    let dates = [];

    while (startDate < endDate) {
        dates = [...dates, new Date(startDate)];
        startDate.setDate(startDate.getDate() + 1);
    }

    return [...dates, endDate];
}

const getBookedDates = async (req, res) => {
    const houseId = req.query.id;

    const results = await Booking.findAll({
        where: {
            houseId,
            endDate: {
                [Op.gte]: new Date()
            }
        }
    });

    let bookedDates = [];

    for (let booking of results) {
        const dates = getDatesBetweenDates(
            new Date(booking.startDate),
            new Date(booking.endDate)
        );

        bookedDates = [...bookedDates, ...dates];
    }

    //Remove duplicates
    bookedDates = [... new Set(bookedDates.map((date) => date))];

    return res.status(200).send({
        error: false,
        message: `Successfully fetched booked dates for house with id: ${houseId}`,
        dates: bookedDates
    });
}

export default getBookedDates;