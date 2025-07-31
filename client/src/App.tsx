import './App.css'
import CreatePost from './components/CreatePost'
import PostList from './components/PostList'

function App() {

  return (
    <div className='container'>
      <h3>Create Post</h3>
      <CreatePost/>
      <hr/>
      <h1>Posts</h1>
      <PostList/>

    </div>
  )
}

export default App
