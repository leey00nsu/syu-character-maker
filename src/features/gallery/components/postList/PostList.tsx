import PostItem from '../postItem/PostItem';

const PostList = () => {
  return (
    <div className="grid grid-auto-rows-max grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 overflow-y-auto">
      <PostItem
        imgUrl="/suho.png"
        isLiked={true}
        likeCount={1}
        author="somebody"
      />
    </div>
  );
};

export default PostList;
