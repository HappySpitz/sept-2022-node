import {NextFunction, Request, Response} from "express";
import {isObjectIdOrHexString} from "mongoose";

import {User} from "../dataBase/User.model";
import {ApiError} from "../errors/api.error";
import {UserValidator} from "../validators";

class UserMiddleware {
    public async getByIdOrThrow(req:Request, res:Response, next:NextFunction): Promise<void> {
        try{
            const { userId } = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError("User not found!", 404);
            }
            res.locals.user = user;
            next();
        } catch (e) {
            next(e)
        }
    }

    public async isUserValid(req:Request, res:Response, next:NextFunction): Promise<void> {
        try {
            if (!isObjectIdOrHexString(req.params.userId)) {
                throw new ApiError("ID not valid", 400)
            }
            next();
        } catch (e) {
            next(e)
        }
    }

    public async isUserValidCreate(req:Request, res:Response, next:NextFunction): Promise<void> {
        try {
            const {error, value} = UserValidator.createUser.validate(req.body)

            if (error) {
                throw new ApiError(error.message, 400)
            }

            req.body = value
            next();
        } catch (e) {
            next(e)
        }
    }

    public async isUserValidUpdate(req:Request, res:Response, next:NextFunction): Promise<void> {
        try {
            const {error, value} = UserValidator.updateUser.validate(req.body)

            if (error) {
                throw new ApiError(error.message, 400)
            }

            req.body = value
            next();
        } catch (e) {
            next(e)
        }
    }
}

export const userMiddleware = new UserMiddleware();