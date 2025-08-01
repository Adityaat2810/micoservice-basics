interface Comment {
  id: string;
  content: string;
  status: string;
}

export default function DisplayComments({ comments }: {
  comments: Comment[];
}) {

  const renderComments = comments.map((comment: Comment) => {
    let content ;

    if(comment.status === 'approved'){
      content = comment.content;
    }

    if(comment.status === 'pending'){
      content = "COMMENT WAITING FOR APPROVAL"
    }

    if(comment.status === 'rejected'){
      content = "COMMENT IS REJECTED"

    }

    return (
      <li key={comment.id}>
        {content}
      </li>
    );
  });

  return (
    <ul>
      {renderComments}
    </ul>
  );
}
