export const books = [...new Array(10)].map((v, idx) => {
	const id = idx + 1;

	return {id, title: `Book ${id}`};
});

export const authors = [...new Array(5)].map((v, idx) => {
	const id = idx + 1;

	return {id, fullName: `Author ${id}`};
});

export const genres = [...new Array(10)].map((v, idx) => {
	const id = idx + 1;
	
	return {id, name: `Genre ${id}`};
});