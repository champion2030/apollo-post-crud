import {ApolloError} from "apollo-server-express";
import { hashSync } from 'bcryptjs';
import {createToken, serializeUser} from "../../functions/user.functions";

export default {
    Query: {
        getAllUsers: async (_, {}, { UserModel }, info) => {
            const users = UserModel.find();
            return users;
        },

        getUserById: async (_, { id }, { UserModel }, info) => {
            const user = await UserModel.findById(id);
            return user;
        }
    },

    Mutation: {
        registerUser: async (_, { newUser }, { UserModel }, info) => {
            try {

                const { username, email } = newUser;

                let user = await UserModel.findOne({ username });
                if (user)
                    throw new Error('Such username already exists');

                user = await UserModel.findOne({ email });
                if (user)
                    throw new Error('Such email already exists');

                user = new UserModel(newUser);
                user.password = hashSync(newUser.password, 10);

                let result = await user.save();
                result.id = result._id;

                result = serializeUser(result);

                const { token } = await createToken(result);

                return {
                    token,
                    user: result
                }

            } catch (error) {
                throw new ApolloError(error.message, 400);
            }
        },
    }
}
