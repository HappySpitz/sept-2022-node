import { Request } from "express";

export interface IError extends Error {
    status: number;
}

export interface IMessage {
    message: string;
}

export interface ICommentResponse<T> extends IMessage {
    data: T;
}

interface IIndex {
    [key: string]: any;
}

export interface IRequest extends Request, IIndex{}
