import axios from "axios";
import { useEffect, useState } from "react";

interface Comment {
  id: string;
  content: string;
}

export default function DisplayComments({ postId }: {
  postId: string;
}) {
  const [comments, setComments] = useState<Comment[]>([]);

  async function getComments() {
    try {
      const res = await axios.get<Comment[]>(`http://localhost:4001/posts/${postId}/comments`);
      setComments(res.data);

      console.log(res.data, 'comments are');
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  useEffect(() => {
    getComments();
  }, [postId]); 

  const renderComments = comments.map((comment: Comment) => {
    return (
      <li key={comment.id}>
        {comment.content}
      </li>
    );
  });

  return (
    <ul>
      {renderComments}
    </ul>
  );
}
