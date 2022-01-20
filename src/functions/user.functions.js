import {config} from '../config'
import jwt from "jsonwebtoken";
import {pick} from "lodash";


export const createToken = async (user) => {
    const expiresIn = 86400;
    const dataStoredInToken = {
        _id: user._id,
    };
    return {
        token: jwt.sign(dataStoredInToken, config.secret, { expiresIn })
    };
}

export const serializeUser = (user) => {
    console.log(user)
    return pick(user, ['id', 'username', 'firstName', 'lastName', 'email'])
}
