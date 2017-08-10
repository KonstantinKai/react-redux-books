import {schema} from 'normalizr';

export const book = new schema.Entity('books');
export const arrayOfBooks = new schema.Array(book);
