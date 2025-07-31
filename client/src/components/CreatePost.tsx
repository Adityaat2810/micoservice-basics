import axios from "axios";
import { useState } from "react"

export default function CreatePost() {

    const [title, setTitle] = useState('');
    const onSubmit = async (event: { preventDefault: () => void; })=> {
        event.preventDefault();

        await axios.post('http://localhost:4000/posts', {
            title
        });

        setTitle('')
 

    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                  value={title} className="form-control"
                  onChange={e=> setTitle(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary mt-3"> SUBMIT</button>
        </form>
    </div>
}