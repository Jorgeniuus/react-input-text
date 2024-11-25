import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import './style.css';
import { loadPosts } from '../../utils/load-posts';
import {Posts} from '../../components/Posts'
import {Button} from '../../components/Button'
import { TextInput } from '../../components/TextInput';

const Home = () => {
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [postPerPage] = useState(2)  
  const [page, setPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')

  const noMorePosts = page + postPerPage >= allPosts.length

  const filteredPosts = !searchValue ? posts.filter(post => {
    return post.title.toLowerCase().includes(
      searchValue.toLowerCase()
    )
  }): posts

  const handleLoadPosts = useCallback(async (page, postPerPage) => {
    const postsAndPhotos = await loadPosts()
    setPosts(postsAndPhotos.slice(page, postPerPage))
    setAllPosts(postsAndPhotos)
  }, [])
  useEffect(() => {
    handleLoadPosts(0, postPerPage)
  }, [handleLoadPosts, postPerPage])

  const handleLoadMorePosts = () => {
    const nextPage = page + postPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)
    posts.push(...nextPosts)
    setPosts(posts)
    setPage(nextPage)
  }
  
  const handleChange = (e) => {
    const {value} = e.target
    setSearchValue(value)
  }

  return (
    <section className='container'>
      <div className='search-container'>
        {!!searchValue && (
            <h1>Test: {searchValue}</h1>
          )
        }
        <TextInput searchValue={searchValue} handleChange={handleChange}/>
      </div>
      {filteredPosts.length > 0 
        ?<Posts posts={filteredPosts}/>
        :<p>There are no posts available!</p>
      }
      <div className='button-container'>
        {!searchValue && (
          <Button 
            text='Load More Posts'
            onClickProp={handleLoadMorePosts}
            disabledProp={noMorePosts}
          />  
        )}
      </div>
    </section>
  )
}

export default Home;
