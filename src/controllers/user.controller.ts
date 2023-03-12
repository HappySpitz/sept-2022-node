import {NextFunction, Request, Response} from "express";

import {User} from "../dataBase/User.model";
import {IUser} from "../types/user.types";
import {userService} from "../services/user.service";
import {ICommentResponse, IMessage} from "../types/common.types";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response<IUser[]>> {
        try {
            const users = await userService.getAll();

            return res.json(users);
        } catch (e) {
            next(e)
        }
    };

    public async getById(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const user = res.locals;
            return res.json(user);
        } catch (e) {
            next(e)
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response<ICommentResponse<IUser>>> {
        try {
            const body = req.body;
            const user = await User.create(body)

            return res.status(201).json({
                message: "User created",
                data: user
            });
        } catch (e) {
            next(e)
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response<ICommentResponse<IUser>>> {
        try {
            const {userId} = req.params;

            const updateUserById = await User.findByIdAndUpdate(userId, {...req.body}, {new: true})

            return res.status(201).json(updateUserById);
        } catch (e) {
            next(e)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<Response<IMessage>> {
        try {
            const {userId} = req.params;

            await User.deleteOne({_id: userId})

            return res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    }
}

export const userController = new UserController();