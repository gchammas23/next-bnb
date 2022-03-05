import { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Head from 'next/head';
import Cookies from 'cookies';
import axiosInstance from '../../axiosInstance';

import { House as HouseModel } from '../../models';
import Layout from '../../components/Layout';
import DateRangePicker from '../../components/DateRangePicker';

const calcNumberOfNightsBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate) //clone
    const end = new Date(endDate) //clone
    let dayCount = 0

    while (end > start) {
        dayCount++
        start.setDate(start.getDate() + 1)
    }

    return dayCount
}

const getBookedDates = async (id) => {
    try {
        const response = await axiosInstance.get(`houses/bookedDates`, {
            params: {
                id
            }
        });

        if (response.data.error) {
            return alert(response.data.message);
        }

        return response.data.dates;
    } catch(e) {
        console.log('ERROR WHILE GETTING BOOKED DATES ', e);
    }
}

const canBookHouse = async (houseId, startDate, endDate) => {
    try {
        const response = await axiosInstance.get('houses/check', {
            params: {
                id: houseId,
                startDate,
                endDate
            }
        });

        if (response.data.message === 'busy') return false;
        return true;
    } catch (e) {
        console.log('ERROR WHEN CHECKING IF USER CAN BOOK HOUSE ', e);
    }
}


export default function HouseDetails(props) {
    const setShowLoginModal = useStoreActions((actions) => actions.modals.setShowLoginModal);
    const setLoggedIn = useStoreActions((actions) => actions.auth.setLoggedIn);
    const isLoggedIn = useStoreState((state) => state.auth.loggedIn);

    const [dateChosen, setDateChosen] = useState(false);
    const [numbOfNightsBetweenDates, setNumbOfNightsBetweenDates] = useState(0);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!(await canBookHouse(props.house.id, startDate, endDate))) {
            return alert('The chosen dates are unavailable');
        }
        try {
            const response = await axiosInstance.post('houses/reserve', {
                houseId: props.house.id,
                startDate,
                endDate
            });

            if (response.data.error) {
                return alert(response.data.message);
            }
            console.log(response.data);
        } catch(e) {
            console.log('BOOKING Error ', e);
        }
    }

    useEffect(() => {
        if (props.session) {
            setLoggedIn(true);
        }
    }, []);

    const content = (
        <div className='container'>
            <Head>
                <title>{props.house.title}</title>
            </Head>
            <article>
                <img src={props.house.picture} width='100%' alt='House picture' />
                <p>
                    {props.house.type} - {props.house.town}
                </p>
                <p>{props.house.title}</p>
            </article>
            <aside>
                <h2>Pick a date</h2>
                <DateRangePicker
                    datesChanged={(startDate, endDate) => {
                        // Compute the number of nights between the dates when they change
                        setNumbOfNightsBetweenDates(calcNumberOfNightsBetweenDates(startDate, endDate));

                        setDateChosen(true);
                        setStartDate(startDate);
                        setEndDate(endDate);
                    }}
                    bookedDates={props.bookedDates}
                />
                {
                    dateChosen && (
                        <div>
                            <h2>Price per night</h2>
                            <p>${props.house.price}</p>
                            <h2>Total price for booking</h2>
                            <p>${(numbOfNightsBetweenDates * props.house.price).toFixed(2)}</p>
                            {
                                isLoggedIn ? (
                                    <button className='reserve' onClick={handleBooking}>Reserve</button>
                                ) : (
                                    <button className='reserve' onClick={() => setShowLoginModal()}>Log in to reserve</button>
                                )
                            }
                        </div>
                    )
                }
            </aside>
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 60% 40%;
                    grid-gap: 30px;
                }

                aside {
                    border: 1px solid #ccc;
                    padding: 20px;
                }
                
                button {
                    background-color: rgb(255, 90, 35);
                    color: white;
                    font-size: 13px;
                    width: 100%;
                    border: none;
                    height: 40px;
                    border-radius: 4px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
    return <Layout content={content} />
}

export async function getServerSideProps({ req, res, query }) {
    const { id } = query;
    const cookies = new Cookies(req, res);
    const session = cookies.get('next-bnb-session');
    const house = await HouseModel.findByPk(id);
    const bookedDates = await getBookedDates(id);

    return {
        props: {
            house: house.dataValues,
            session: session || null,
            bookedDates
        }
    }
}