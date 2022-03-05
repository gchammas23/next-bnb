import Cookies from 'cookies';
import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';

import { House as HouseModel } from '../models';
import House from '../components/House';
import Layout from '../components/Layout';


export default function Home({ session, houses }) {
  const setLoggedIn = useStoreActions((actions) => actions.auth.setLoggedIn);

  useEffect(() => {
    if (session) {
      setLoggedIn(true);
    }
  }, []);

  return <Layout content={
    <div>
      <h2>Places to stay</h2>
      <div className='houses'>
        {
          houses.map((house, index) => {
            return <House key={index} {...house} />
          })
        }
      </div>
      <style jsx='true'>{`
      .houses {
        display: grid;
        grid-template-columns: 49% 49%;
        grid-template-rows: 300px 300px;
        grid-gap: 2%;
      }
    `}</style>
    </div>

  } />
}

export async function getServerSideProps({ req, res, next }) {
  const houses = await HouseModel.findAndCountAll();
  const cookies = new Cookies(req, res);
  const session = cookies.get('next-bnb-session');

  return {
    props: {
      session: session || null,
      houses: houses.rows.map((house) => house.dataValues)
    }
  }
}
