import {schema} from 'normalizr';

export const genre = new schema.Entity('genres');
export const arrayOfGenres = new schema.Array(genre);