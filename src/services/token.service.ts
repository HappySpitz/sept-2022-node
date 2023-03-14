import * as jwt from "jsonwebtoken";

import {ITokenPair, ITokenPayload} from "../types";
import {tokenConstants} from "../constants/token.constants";

class TokenService {
    public generateTokenPair(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, tokenConstants.ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, tokenConstants.REFRESH_SECRET, {expiresIn: '30d'});

        return {
            accessToken, refreshToken
        }
    }
}

export const tokenService = new TokenService();