import * as entities from './entities';
import fetch from './fetch';

const ath = entities.authors;
const gs = entities.genres;

const shortContent = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`.repeat(5);

export const books = [
	{
		...entities.books[0],
		genres: [gs[0], gs[9]],
		authors: [ath[0]]
	},
	{
		...entities.books[1],
		genres: [gs[1], gs[4]],
		authors: [ath[1]]
	},
	{
		...entities.books[2],
		genres: [gs[2], gs[5], gs[6]],
		authors: [ath[1]]
	},
	{
		...entities.books[3],
		genres: [gs[7]],
		authors: [ath[0], ath[2]]
	},
	{
		...entities.books[4],
		genres: [gs[4], gs[1], gs[8]],
		authors: [ath[0], ath[2]]
	},
	{
		...entities.books[5],
		genres: [gs[8]],
		authors: [ath[2]]
	},
	{
		...entities.books[6],
		genres: [gs[8], gs[7]],
		authors: [ath[3]]
	},
	{
		...entities.books[7],
		genres: [gs[2]],
		authors: [ath[4]]
	},
	{
		...entities.books[8],
		genres: [],
		authors: [ath[4]]
	},
	{
		...entities.books[9],
		genres: [gs[2], gs[6], gs[9], gs[7]],
		authors: [ath[4]]
	}
].map(book => {
	return {
		...book,
		shortContent
	};
});

export default (id) => {
	return fetch({entities: books, id});
};