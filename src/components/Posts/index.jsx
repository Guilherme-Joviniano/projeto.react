import './styles.css';

import { PostCard } from '../Post-card';

export const Posts = ({posts}) => {
    return (
        <div className='posts'>
            {posts.map(post => (  
            <PostCard 
                key = { post.id } 
                post = { post }
                />
            ))}
        </div>
    )
}