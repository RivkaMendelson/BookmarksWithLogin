import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { produce } from 'immer';


const Bookmarks = () => {

    const { user } = useAuth();
    const navigate = useNavigate();
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentlyEditingBookmarks, setCurrentlyEditingBookmarks] = useState([]);


    useEffect(() => {
        getBookmarks();
    }, []);

    const getBookmarks = async () => {
        const { data } = await axios.get(`/api/bookmark/getById?id=${user.id}`);
        data.forEach(bkm => bkm.originalName = bkm.name);
        setBookmarks(data);

        setIsLoading(false);
    }


    const onEditClick = (id) => {
        setCurrentlyEditingBookmarks([...currentlyEditingBookmarks, id]);
  
    };

    const onCancelClick = (id) => {
        setCurrentlyEditingBookmarks(currentlyEditingBookmarks.filter(b => b !== id));
        const nextState = produce(bookmarks, draftBookmarks => {
            const bookmark = draftBookmarks.find(b => b.id === id);
            bookmark.name = bookmark.originalName;
        });
        setBookmarks(nextState);


    }

    const onNameChange = (e, id) => {

        const nextState = produce(bookmarks, draftBookmarks => {
            const bookmark = draftBookmarks.find(b => b.id === id);
            bookmark.name = e.target.value;
        });
        setBookmarks(nextState);
    }



const onDeleteClick = async id => {
    await axios.post('/api/bookmark/delete', { id });
    navigate('/Bookmarks');
    getBookmarks();
};

const onUpdateClick = async id => {
    const bookmark = bookmarks.find(b => b.id === id);
    await axios.post('/api/bookmark/update', bookmark);
    setCurrentlyEditingBookmarks(currentlyEditingBookmarks.filter(b => b !== id));
    getBookmarks();
};



if (isLoading) {
    return <h1>Loading...</h1>
}

if (!bookmarks) {
    return (<div className="row" style={{ alignItems: 'center' }}>
        <h3>You have no bookmarks added yet. Click here to add one!</h3>
        <a href='/AddBookmark' className='btn btn-dark'>Add Bookmark</a>
    </div>)
}


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
                            {!currentlyEditingBookmarks.includes(b.id) ? <td>{b.name}</td> : <td><input type="text"
                                onChange={(e) => onNameChange(e, b.id)}
                                className="form-control" name="name" placeholder="Title" value={b.name} /></td>}

                            <td><a href={b.siteUrl}>{b.siteUrl}</a></td>

                            <td>
                                {currentlyEditingBookmarks.includes(b.id) &&
                                    <>
                                        <button className='btn btn-primary' style={{ margin: '5px' }} onClick={() => onUpdateClick(b.id)}>Update</button>
                                        <button className='btn btn-warning' style={{ margin: '5px' }} onClick={() => onCancelClick(b.id)}>Cancel</button>
                                    </>
                                }

                                {!currentlyEditingBookmarks.includes(b.id) &&
                                    <><button className='btn btn-warning' style={{ margin: '5px' }} onClick={() => onEditClick(b.id)}> Edit</button></>
                                }

                                <button onClick={() => onDeleteClick(b.id)} style={{ margin: '5px' }} className='btn btn-danger'>Delete</button></td>
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
