import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';


const AddBookmark = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    const [name, setName] = useState();
    const [siteURL, setSiteURL] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const onFormSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        const id = user.id;
        const usersId = id;
        await axios.post('/api/bookmark/new', { usersId, name, siteURL });
        setIsSubmitting(false);
        navigate('/Bookmarks');

    }


    return (<>

        <div className="row" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Add Bookmark</h3>
                <form onSubmit={onFormSubmit}>
                    <input onChange={e => setName(e.target.value)} type="text"  placeholder="Title" className="form-control" />
                    <br />
                    <input onChange={e => setSiteURL(e.target.value)} type="text"  placeholder="Url" className="form-control" />
                    <br />
                    <button className="btn btn-primary">{isSubmitting ? 'Adding...' : 'Add'}</button>
                </form>
            </div>
        </div>
    </>)
}

export default AddBookmark;
