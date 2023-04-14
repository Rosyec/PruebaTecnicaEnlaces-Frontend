import type { MusicBrainzDta } from '@/helpers/data.interface';
import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:3005'});

async function getAllGenres( limit: number, offset: number ) {
    const response = await API.get<MusicBrainzDta>(`getAllGenresByCount?limit=${limit}&offset=${offset}`);
    return response.data;
}

export {
    getAllGenres
}