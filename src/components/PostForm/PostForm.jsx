import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
//import * as postService from '../src/services/postService';


const PostForm = (props) => {
    const user = useContext(AuthedUserContext);

    const [formData, setFormData] = useState({
        title: '', 
        description: '', 
        isPublic: true, 
    })

    const handleChange = (evt) => {
        const { name, value, type, checked } = evt.target; 

        // if the input is a checkbox, then whatever the value in checked is will be stored
        // else, applies to other inputs 
        setFormData({...formData, [name] : type === 'checkbox' ? checked : value }); 
    }

    const handleSubmit = (evt) =>  {
        evt.preventDefault(); 
        props.handleAddPost(formData)
    }
  return (
    <>

    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title: </label>
                <input 
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="description"></label>
                <textarea
                    name="description"
                    placeholder="What's on your mind?"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="isPublic">Share with Community?</label>
                <input 
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange} 
                />

            </div>

            <button>submit</button>

        </form>
    </div>

    </>
  )
}

export default PostForm
