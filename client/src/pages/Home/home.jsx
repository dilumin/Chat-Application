import React from 'react'
import Navbar from './components/Navbar'
import {HomeProvider} from '../../context/HomeProvider';
import Addposts from './components/Addposts';
import Posts from './components/Posts';
import Post from './components/Post';


const Home = () => {
  return (
    <div className='home bg-white' >
        <Navbar />
        <Addposts />
        <Posts />
    </div>
  )
}

const HomeWrapper =() =>(

  <HomeProvider>
    <Home />
  </HomeProvider>
  
)


export default HomeWrapper;