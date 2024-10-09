import {UserType} from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    userId: number
    expireTime?: Date;
    maxNum: number;
    password?: string;
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoin: boolean;
    hasJoinNum?: number;
};