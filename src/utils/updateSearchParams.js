const updateSearchParams = (updates) => {
  const currentParams = new URLSearchParams(window.location.search);

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      currentParams.delete(key);
    } else {
      currentParams.set(key, value);
    }
  });

  return currentParams;
};

export default updateSearchParams;
