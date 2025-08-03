import axios from "axios";
import { useState } from "react"

export default function CreateComment({postId}:{
    postId:string
}){

    const [comment, setComment] = useState('')

    const onSubmit = async (event: { preventDefault: () => void; })=> {
        event.preventDefault();

        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content:comment
        });

        setComment('')
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label> NEW COMMENT</label>
                <input
                    className="form-control"
                    value={comment}
                    onChange={e=> setComment(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary"
            >
                SUBMIT
            </button>
        </form>
    </div>
}