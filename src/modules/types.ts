import * as mongoose from 'mongoose';

export interface ApiResponse {
    status: number;
    message?: string;
    data?: any;
    error?: boolean;
}

export interface Models {
    [ key: string ]: mongoose.Model<any>
}