import styles from '../styles/Rooms.module.css';
import Card from '../components/Card/index'

const contentful = require('contentful')

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,

  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
}); 

export default function rooms ({rooms}){
  
    return (
        <div className={styles.grid}>
        {
            rooms.map(room=> <Card key={room.fields.slug} data={room}/>)
        }
        </div>
    );
};

export async function getStaticProps(){
    const rooms=(await client.getEntries({content_type:'room'}));

  return {props:{rooms:rooms.items}};
}