import {schema} from 'normalizr';

export const author = new schema.Entity('authors');
export const arrayOfAuthors = new schema.Array(author);
