import * as express from 'express';
import {IController} from '../Interfaces/IController';
import {RouteRoles, Permissions} from '../Interfaces/IController';
import {Logger} from '../Log/Logger';

export class BaseController implements IController
{
    App: express.Application;
    BaseUrl: string;
    Prefix: string;
    RouteRoles: Array<RouteRoles>;

    constructor(app: express.Application)
    {
        this.App = app;
        this.BaseUrl = "";
        this.Prefix = "";
        this.RouteRoles = new Array<RouteRoles>();
    }

    Register()
    {

    }

    protected RegisterRoute(method:string, url: string, callback: any, role: number = Permissions.Public)
    {
        (this.App as any)[method](`${this.Prefix}${this.BaseUrl}${url}`, callback);
        
        this.RouteRoles.push({
            Route: `${this.Prefix}${this.BaseUrl}${url}`,
            Permission: role,
            Verb: method
        });
    }

}