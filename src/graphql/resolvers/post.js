export default {
    Query: {
        getAllPosts: async (_, {}, { PostModel }, info) => {
            const posts = PostModel.find();
            return posts;
        },

        getPostById: async (_, { id }, { PostModel }, info) => {
            const post = await PostModel.findById(id);
            return post;
        }
    },

    Mutation: {
        createNewPost: async (_, { newPost }, { PostModel }, info) => {
            let result = await PostModel.create(newPost);
            return result;
        },

        editPostById: async (_, { id, updatedPost }, { PostModel }, info) => {
            const editedPost = await PostModel.findByIdAndUpdate(id, { ...updatedPost }, { new: true });
            return editedPost;
        },

        deletePostById: async (_, { id }, { PostModel }, info) => {
            const deletedPost = await PostModel.findByIdAndDelete(id);
            return {
                success: true,
                id: deletedPost.id,
                message: "Your Post is deleted"
            }
        }
    }
}
