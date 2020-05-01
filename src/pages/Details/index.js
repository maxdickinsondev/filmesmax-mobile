import React, { useState ,useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Clock from 'react-native-vector-icons/AntDesign';

import { MovieBackground, MovieInfo, MovieImage, MovieDetails, 
    Title, Description, Generes, MovieNumbers, DateInfo, Date, 
    DurationInfo, Duration
} from './styles';

import Actors from '../../components/Actors';

import api from '../../services/api';

export default function Details({ navigation }) {
    const [details, setDetails] = useState([]);
    const url = 'https://image.tmdb.org/t/p/w300';

    useEffect(() => {
        async function loadDetails() {
            const id = navigation.getParam('id');
            const url = 'https://image.tmdb.org/t/p/w185';

            const response = await api.get(`/movie/${id}?api_key=14ff7d5e5b5ac073419275359d9759a0&language=pt-BR`);

            setDetails(response.data);
        }

        loadDetails();
    }, []);

    return (
        <MovieBackground source={{ uri: url+details.poster_path }}>
            <MovieInfo>
                <MovieImage 
                    source={{ uri: url+details.poster_path }}
                    resizeMode="stretch"
                />

                <MovieDetails>
                    <Title> {details.original_title} </Title>
                    <Description> {details.overview} </Description>
                    <Generes>Action, Science Fiction</Generes>

                    <MovieNumbers>
                        <DateInfo>
                            <Icon name="calendar" color="#ffce00" />
                            <Date>{details.release_date}</Date>
                        </DateInfo>

                        <DurationInfo>
                            <Clock name="clockcircle" color="#ffce00" />
                            <Duration> {details.runtime} min </Duration>
                        </DurationInfo>
                        
                    </MovieNumbers>
                </MovieDetails>                
            </MovieInfo>

            <Actors />
        </MovieBackground>
    );
}