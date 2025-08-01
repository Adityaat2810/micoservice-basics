interface Comment {
  id: string;
  content: string;
}

export default function DisplayComments({ comments }: {
  comments: Comment[];
}) {
  
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
