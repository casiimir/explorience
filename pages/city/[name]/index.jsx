import axios from 'axios'
import styles from './index.module.scss'

import HeaderCity from '../../../components/headerCity'
import ContentCity from '../../../components/contentCity'

import citiesList from '../../../services/cityList.json'
import { getCity } from '../../../utils/utils.js'

const City = ({ city }) => {
  return (
    <>
      {city && (
        <div className={styles.City}>
          <HeaderCity
            image={city.cover_image_url + '?fit=crop&h=900'}
            name={city.name}
            country={city.country.name}
          />
          <ContentCity
            name={city.name}
            content={city.content}
            activityID={city.id}
          />
        </div>
      )}
    </>
  )
}

export default City

export async function getServerSideProps(context) {
  const resCity = await axios.get(
    `https://sandbox.musement.com/api/v3/cities/${
      getCity(context.query.name, citiesList)[1]
    }`,
    { headers: { 'Accept-Language': 'it-IT' } }
  )

  return {
    props: {
      city: resCity.data,
      query: context.query,
    },
  }
}
