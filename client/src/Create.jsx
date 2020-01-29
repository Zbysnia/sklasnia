import React, {useState} from 'react';
import axios from 'axios';
const Create = () => {
    // state
    const [state, setState] = useState({
        title: '',
        content: '',
        user: ''
    });
    // destructure values from state
    const { title, content, user } = state;

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .post(`${process.env.REACT_APP_API}/post`, { title, content, user })
            .then(response => {
                console.log(response);
                // empty state
                setState({ ...state, title: '', content: '', user: '' });
                // show sucess alert
                alert(`Post titled ${response.data.title} is created`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return(
        <div className="container p-5">
            <h1>Create Post</h1>
            <br/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input 
                    value={title} 
                    onChange={handleChange('title')} 
                    type="text" 
                    className="form-control" 
                    placeholder="Post title." 
                    required/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Content</label>
                    <textarea 
                    value={content} 
                    onChange={handleChange('content')} 
                    type="text" 
                    className="form-control" 
                    placeholder="Write something.." 
                    required/>
                </div>
                <div className="form-group">
                    <label className="text-muted">User</label>
                    <input 
                    value={user} 
                    onChange={handleChange('user')} 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter your name." 
                    required/>
                </div>
                <div>
                    <button className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
 );
};


export default Create;
