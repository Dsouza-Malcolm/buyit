const searchFilterHandler = (query, displayData) => {
  const filteredByCategory =
    query.category === "0" ||
    query.category === 0 ||
    query.category === undefined
      ? displayData
      : displayData.filter((product) => product.category.id == +query.category);

  const filtered =
    query.search === "" || query.search === undefined
      ? filteredByCategory
      : filteredByCategory.filter((product) =>
          product.title.toLowerCase().includes(query.search.toLowerCase())
        );

  return filtered;
};

export default searchFilterHandler;
