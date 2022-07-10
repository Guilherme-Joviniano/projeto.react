//Props => atributos do jsx para o componente 
import './styles.css';

export const PostCard = (props) => {
    const { post } = props;

    return (
        <div className ='post' >
            <img src = { post.cover } alt ={ post.title }/>
            <div className="post-content">
                <h1>{post.title} {post.id} </h1>
                <p> { post.body }</p>
            </div>
        </div>
   )
}


