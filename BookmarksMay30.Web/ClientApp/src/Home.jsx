import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {


    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const getMostPopular = async () => {
            const mostPopular = await axios.get("/api/Bookmark/getMostPopular");
            setBookmarks(mostPopular.data);
            setIsLoading(false);
        }
        getMostPopular();
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (<>

        <div className='container'>
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Link</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.map(b => {
                        return (
                            <tr key={b.id }>
                                <td><a href={b.siteUrl}>{b.bookmark}</a></td>
                                <td>{b.count}</td>
                            </tr>)
                    })
                    }
                </tbody>
            </table>
        </div>
    </>)
};

export default Home;
