import {Express} from "express";
import {NotFound} from "./api";

export const SetPrivateRoutes = (app: Express): Express => {
    app.get('*', NotFound);

    return app;
}