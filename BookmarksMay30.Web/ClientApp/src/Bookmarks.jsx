import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {

    const { user } = useAuth();
    const navigate = useNavigate();
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentBookmark, setCurrentBookmark] = useState({ id: 0, name: '' });


    useEffect(() => {
        const getBookmarks = async () => {
            const bookmarks = await axios.get(`/api/bookmark/getById?id=${user.id}`);
            setBookmarks(bookmarks.data);
            setIsLoading(false);
        }
        getBookmarks();
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (bookmarks.length == 0) {
        return (<div className="row" style={{ alignItems: 'center' }}>
            <h3>You have no bookmarks added yet. Click here to add one!</h3>
            <a href='/AddBookmark' className='btn btn-dark'>Add Bookmark</a>
            </div> )
    }

    const onEditClick = async (name, id) => {
        setCurrentBookmark({name, id});
    };

    const onNameChange = e => {
        const copy = { ...currentBookmark };
        copy.name = e.target.value;
        setCurrentBookmark(copy);
    }

    const onDeleteClick = async id => {
        await axios.post('/api/bookmark/delete', { id });
        navigate('/Bookmarks');
        const bookmarks = await axios.get(`/api/bookmark/getById?id=${user.id}`);
        setBookmarks(bookmarks.data);
    };

    const onUpdateClick = async () => {
        await axios.post('/api/bookmark/update', currentBookmark);
        setCurrentBookmark({});
        const bookmarks = await axios.get(`/api/bookmark/getById?id=${user.id}`);
        setBookmarks(bookmarks.data);
    };

    return (<>
        <h1>Welcome Back {user.firstName} {user.lastName}</h1>
        <div className='container'>
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Link</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.map(b => {
                        return (
                            <tr key={b.id} >
                                {b.id != currentBookmark.id ? <td>{b.name}</td> : <td><input type="text"
                                    onChange={onNameChange}
                                    className="form-control" placeholder="Title" value={currentBookmark.name} /></td>}

                                <td><a href={b.siteUrl}>{b.siteUrl}</a></td>

                                <td>
                                    {b.id == currentBookmark.id &&
                                        <button className='btn btn-primary' onClick={onUpdateClick }>Update</button>
                                            /*<button className='btn btn-warning' onClick={setCurrentBookmark({})}>Cancel</button>*/}
                                    {b.id != currentBookmark.id &&
                                        <button className='btn btn-warning' onClick={() => onEditClick(b.name, b.id)}> Edit</button>}
                                    
                                    <button onClick={() => onDeleteClick(b.id)} className='btn btn-danger'>Delete</button></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    </>)
};

export default Bookmarks;
