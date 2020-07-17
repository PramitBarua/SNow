const functionGeneral = () => {
  const baseData = {
    url: {
      discover: 'https://api.themoviedb.org/3/discover',
      popularPerson: 'https://api.themoviedb.org/3/person/popular?',
      byId: 'https://api.themoviedb.org/3',
    },
    image: {
      urlBase: 'https://image.tmdb.org/t/p/',
      sizePosterBig: 'w500',
      sizePosterSmall: 'w185',
      // sizeBackDrop: 'w1280',
      sizeBackDrop: 'w780',
    },
    genre: {
      movie: [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentary' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Family' },
        { id: 14, name: 'Fantasy' },
        { id: 36, name: 'History' },
        { id: 27, name: 'Horror' },
        { id: 10402, name: 'Music' },
        { id: 9648, name: 'Mystery' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Science Fiction' },
        { id: 10770, name: 'TV Movie' },
        { id: 53, name: 'Thriller' },
        { id: 10752, name: 'War' },
        { id: 37, name: 'Western' },
      ],
      tv: [
        { id: 10759, name: 'Action & Adventure' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentary' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Family' },
        { id: 10762, name: 'Kids' },
        { id: 9648, name: 'Mystery' },
        { id: 10763, name: 'News' },
        { id: 10764, name: 'Reality' },
        { id: 10765, name: 'Sci-Fi & Fantasy' },
        { id: 10766, name: 'Soap' },
        { id: 10767, name: 'Talk' },
        { id: 10768, name: 'War & Politics' },
        { id: 37, name: 'Western' },
      ],
    },
    mediaType: {
      movie: 'movie',
      tv: 'tv',
      people: 'people',
    },
    sortBy: {
      movie: [
        { id: 'popularity.desc', value: 'Popularity' },
        { id: 'revenue.desc', value: 'Revenue' },
        { id: 'primary_release_date.desc', value: 'Primary Release Date' },
        { id: 'original_title.desc', value: 'Original Title' },
        { id: 'vote_average.desc', value: 'Vote Average' },
        { id: 'vote_count.desc', value: 'Vote Count' },
      ],
      tv: [
        { id: 'popularity.desc', value: 'Popularity' },
        { id: 'vote_average.desc', value: 'Vote Average' },
        { id: 'first_air_date.desc', value: 'First Air Date' },
      ],
    },
  };

  return {
    getImageURL: () => baseData.image,
    getGenre: () => baseData.genre,
    getBaseURL: () => baseData.url,
    getMediaType: () => baseData.mediaType,
    getSortBy: () => baseData.sortBy,
  };
};

export { functionGeneral };
