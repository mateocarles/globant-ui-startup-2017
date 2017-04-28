
import FavoriteSongBox from '../../components/FavoriteSongsContainer/FavoriteSongBox';
import Footer from '../../components/Footer/Footer';
import Header from'../../components/Header/Header';
import InputSearch from '../../components/InputSearch/InputSearch';
import Subtitle from '../../components/Subtitle/Subtitle';
import Title from '../../components/Title/Title';
import FavoriteSongsContainer from '../../components/FavoriteSongsContainer/FavoriteSongsContainer';
import React, { Component } from 'react';



class Home extends React.Component{

    render() {
        return(
            <div className='content'>
                <Header />           
                <Title />               
                <Subtitle />          
                <InputSearch />            
                <favoriteSongBox />
                <FavoriteSongsContainer />
            </div>
        )
    }
}


export default Home;

