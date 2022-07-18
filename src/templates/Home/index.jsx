import React, { useEffect, useState, useCallback } from 'react';
import '../../input.css';
import { Posts } from '../../components/Posts';
import loadPosts from '../../utils/loadPosts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3);
  const [searchValue, setSearchValue] = useState('');

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;

    setSearchValue(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    loadMorePosts();
  };

  const noMorePosts = page + postsPerPage >= allPosts.length;

  let TextButton = 'Load More';
  !!noMorePosts && (TextButton = 'No More Posts');

  const filteredPosts = searchValue
    ? posts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  // Hooks
  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  return (
    <section className="container">
      <div className="search-container">
        <div className="input-container">
          <TextInput handleChange={handleInputChange} searchValue={searchValue} />
        </div>
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <h1> Não existem Posts </h1>}

      <div className="button-container">
        {!searchValue && <Button onClick={handleClick} disabled={noMorePosts} text={TextButton} />}
      </div>
    </section>
  );
};
