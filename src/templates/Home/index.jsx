import React from 'react';
import './style.css';
import { Posts } from '../../components/Posts';
import loadPosts from '../../utils/loadPosts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends React.Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: '',
  };

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
       posts: postsAndPhotos.slice(page, postsPerPage),
       allPosts: postsAndPhotos 
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts,
    } = this.state;
    
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    
    posts.push(...nextPosts)

    this.setState({
      posts,
      page: nextPage,
    })
    
  }


  handleInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  handleClick = (e) => {
    e.preventDefault();
    this.loadMorePosts();
  }
  
  async componentDidMount() { 
    await this.loadPosts();
  }



  render() { 
    const { posts, page, postsPerPage, allPosts, searchValue, textButtonLoadMorePosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    let TextButton = 'Load More Posts';
    !!noMorePosts && (
      TextButton = 'No More Posts'
    )

    const filteredPosts = !!searchValue ? 
    posts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }): posts;

    return ( 
    <section className='container'>
        
        { !!searchValue && (
          <>
          <h1>Search Value : { searchValue }</h1>
          </>
        ) }
        
       <div className='input-container'>
          <TextInput
              handleChange = { this.handleInputChange }
              searchValue = { searchValue }
            />
        </div>
        
        {filteredPosts.length > 0 && (
          <Posts posts = { filteredPosts } />
        )}

        {filteredPosts.length === 0 && (
          <h1> Não existem Posts </h1>
        )}
        

        <div className='button-container'>
          {!searchValue && (
            <Button 
              onClick = { this.handleClick } 
              disabled = { noMorePosts }
              text = { TextButton }
            />
          )}

        </div>
      </section>
    );
  }
}
