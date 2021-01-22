import styles from '../styles/Rooms.module.css';
import Card from '../components/Card/index'

const contentful = require('contentful')

const client = contentful.createClient({

    space:'ts47honc1w8u',
  
    accessToken: 'oSWUxeAc79SBQzieh8SMB4Q_lFOjU-pKEKlS7rWvq8g'
  
  });   

export default function rooms ({rooms}){
    console.log(rooms);
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