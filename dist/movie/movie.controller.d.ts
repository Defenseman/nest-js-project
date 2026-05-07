import { MovieService } from "./movie.service";
import { type Request, type Response } from "express";
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getMovies(): Promise<{
        message: string;
    }>;
    getMovieById(id: string): {
        id: string;
    };
    createMovie(body: {
        tittle: string;
        director: string;
    }): {
        body: {
            tittle: string;
            director: string;
        };
    };
    getAllHeaders(headers: string): {
        headers: string;
    };
    getUserAgentHeader(headers: string): {
        headers: string;
    };
    getRequest(req: Request): any;
    getResponse(res: Response): Response<any, Record<string, any>>;
}
