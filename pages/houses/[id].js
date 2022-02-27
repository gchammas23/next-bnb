import houses from '../../houses';

export default function HouseDetails(props) {
    return (
        <div>
            <p>{props.house.title}</p>
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const { id } = query;

    return {
        props: {
            house: houses.filter(house => house.id === parseInt(id))[0]
        }
    }
}