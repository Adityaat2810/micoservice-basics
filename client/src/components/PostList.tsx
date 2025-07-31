import axios from "axios";
import { useEffect, useState } from "react";
import CreateComment from "./CreateComment";

interface Post {
  id: string;
  title: {
    title: string;
  };
}

interface PostsResponse {
  [key: string]: Post;
}

export default function PostList() {
  const [posts, setPosts] = useState<PostsResponse>({});

  const fetchPost = async () => {
    try {
      const res = await axios.get<PostsResponse>('http://localhost:4000/posts');
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const renderPost = Object.values(posts).map((post: Post) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title.title}</h3>
          <CreateComment  postId={post.id}/>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPost}
    </div>
  );
}
