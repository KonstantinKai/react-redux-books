import * as entities from './entities';
import fetch from './fetch';

const b = entities.books;

const biography = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`.repeat(5);

export const authors = [
	{
		...entities.authors[0],
		books: [b[0], b[3]]
	},
	{
		...entities.authors[1],
		books: [b[1], b[2]]
	},
	{
		...entities.authors[2],
		books: [b[3], b[4], b[5]]
	},
	{
		...entities.authors[3],
		books: [b[6]]
	},
	{
		...entities.authors[4],
		books: [b[7], b[8], b[9]]
	}
].map(author => {
	return {
		...author,
		biography
	};
});

export default (id) => {
	return fetch({entities: authors, id});
};