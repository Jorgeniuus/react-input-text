import { Component } from 'react';
import './style.css';
import { loadPosts } from '../../utils/load-posts';
import {Posts} from '../../components/Posts'
import {Button} from '../../components/Button'
import { TextInput } from '../../components/TextInput';

class Home extends Component{
  state = {
    posts: [],
    allPosts: [],
    page: 0, 
    postPerPage: 2,
    searchValue: ''
  }

  async componentDidMount(){
    await this.loadPosts()
  }

  loadPosts = async () => {
    const {page, postPerPage} = this.state

    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos,
    })
  }

  handleLoadMorePosts = () => {
    const {
      page,
      postPerPage,
      allPosts, 
      posts
    } = this.state
    const nextPage = page + postPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)
    posts.push(...nextPosts)
    this.setState({posts, page: nextPage})
  }
  
  handleChange = (e) => {
    const {value} = e.target
    this.setState({searchValue: value})
  }

  render(){
    const {posts, page, postPerPage, allPosts, searchValue} = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length

    const filteredPosts = !!searchValue ? posts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      )
    }): posts

    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
              <h1>Test: {searchValue}</h1>
            )
          }
          <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        </div>
        {filteredPosts.length > 0 
          ?<Posts posts={filteredPosts}/>
          :<p>There are no posts available!</p>
        }
        <div className='button-container'>
          {!searchValue && (
            <Button 
              text='Load More Posts'
              onClickProp={this.handleLoadMorePosts}
              disabledProp={noMorePosts}
            />  
          )}
        </div>
      </section>
    )
  }
}

export default Home;
