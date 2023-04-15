import type { MusicBrainzDta } from '@/helpers/data.interface';
import axios from 'axios';

const API = axios.create({baseURL: 'https://prueba-tecnica-enlaces-backend.vercel.app'});

async function getAllGenres( limit: number, offset: number ) {
    const response = await API.get<MusicBrainzDta>(`getAllGenresByCount?limit=${limit}&offset=${offset}`);
    return response.data;
}

export {
    getAllGenres
}