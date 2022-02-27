import { useState } from 'react';
import houses from '../../houses';
import Head from 'next/head';
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

export default function HouseDetails(props) {
    const [dateChosen, setDateChosen] = useState(false);
    const [numbOfNightsBetweenDates, setNumbOfNightsBetweenDates] = useState(0);

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
                    }}
                />
                {
                    dateChosen && (
                        <div>
                            <h2>Price per night</h2>
                            <p>${props.house.price}</p>
                            <h2>Total price for booking</h2>
                            <p>${(numbOfNightsBetweenDates * props.house.price).toFixed(2)}</p>
                            <button className='reserve'>Reserve</button>
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

export async function getServerSideProps({ query }) {
    const { id } = query;

    return {
        props: {
            house: houses.filter(house => house.id === parseInt(id))[0]
        }
    }
}