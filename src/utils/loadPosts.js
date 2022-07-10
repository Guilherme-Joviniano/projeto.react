export default async function loadPosts() {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photoResponse]);
    
    const postsJson = await posts.json();
    const photosJson = await photos.json();

    //Get the same numbers of posts and images
    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url  }
    })
    return postsAndPhotos
}