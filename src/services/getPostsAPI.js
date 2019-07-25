import primaryApiUrl from '../static/apiUrls';

const getPosts = (start, limit) => fetch(`${primaryApiUrl}/posts?_start=${start}&_limit=${limit}`)
  .then(response => response.json())
  .then((data) => {
    data.map((item) => {
      const post = item;
      post.isFavourite = false;
      post.isLoading = false;
      return post;
    });
    return data;
  });

export default getPosts;
