export default ({entities, id}) => {
    const total = entities.length;

    if (id) {
        entities = entities.filter(entiti => entiti.id === Number(id));
    }

    return new Promise(resolve => {
        setTimeout(resolve.bind(null, {entities, total}), 2000);
    });
};