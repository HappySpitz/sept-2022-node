import {NextFunction, Request, Response} from "express";

import {User} from "../dataBase/User.model";
import {ApiError} from "../errors/api.error";

class UserMiddleware {
    public async getByIdAndThrow(req:Request, res:Response, next:NextFunction): Promise<void> {
        try{
            const { userId } = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError("User not found!", 404);
            }

            next();
        } catch (e) {
            next(e)
        }
    }

    public async createVerifyAndThrow(req:Request, res:Response, next:NextFunction): Promise<void> {
        try {
            const {name, email, password, gender} = req.body;

            if (!name || name.length < 2) {
                throw new ApiError("Wrong name!", 400);
            }

            if (!email || email.length < 6 && email.length > 30) {
                throw new ApiError("Wrong email!", 400);
            }

            if (!password || password.length < 8) {
                throw new ApiError("Wrong password!", 400);
            }

            if (!gender || (gender !== 'male' && gender !== 'female' && gender !== 'mixed')) {
                throw new ApiError("Wrong gender!", 400);
            }

            next();
        } catch (e) {
            next(e)
        }
    }

    public async updateByIdVerifyAndThrow(req:Request, res:Response, next:NextFunction): Promise<void> {
        try {
            const {name, email, password, gender} = req.body;
            const { userId } = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError("User not found!", 422);
            }

            if (!name || name.length < 2) {
                throw new ApiError("Wrong name!", 400);
            }

            if (!email || email.length < 6 && email.length > 30) {
                throw new ApiError("Wrong email!", 400);
            }

            if (!password || password.length < 8) {
                throw new ApiError("Wrong password!", 400);
            }

            if (!gender || (gender !== 'male' && gender !== 'female' && gender !== 'mixed')) {
                throw new ApiError("Wrong gender!", 400);
            }

            next();
        } catch (e) {
            next(e)
        }
    }

    public async deleteByIdAndThrow(req:Request, res:Response, next:NextFunction): Promise<void> {
        try {
            const { userId } = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError("User not found!", 422);
            }

            next();
        } catch (e) {
            next(e)
        }
    }
}

export const userMiddleware = new UserMiddleware();