import request from "./index"
import { ResultData, Topic, AuthorInfo, Comment_web, Message_, ReportStrvice } from '@/types/interfaces'

// 登录接口
export const login = function (data: any) {
    return request({
        url: "/user/login",
        method: "post",
        data: data
    })
}

// 自动登录接口
export const autoLogin = function (data: any): Promise<ResultData<AuthorInfo>> {
    return request({
        url: "/user/token",
        method: "post",
        data: data
    })
}

// 请求路由信息
export const getRoutes = function (data: any) {
    return request({
        url: "/user/getRouter",
        method: "post",
        data: data
    })
}

// 按照关键字查询话题
export const getFindTopic = function (data: any): Promise<ResultData<Array<Topic>>> {
    return request({
        url: `/topic/findTopic?keywords=${data.keywords}&key=${data.key}&end=${data.end}`,
        method: "get"
    })
}

// 获取所有的话题（按照时间降序（靠近当天日期）查找）
// 按照关键字查询话题
export const getAllTopic = function (data: any): Promise<ResultData<Array<Topic>>> {
    return request({
        url: `/topic/getAllTopic?userID=${data.userID}&key=${data.key}&end=${data.end}`,
        method: "get"
    })
}

// 获取所有用户信息
export const getAllUser = function (data: any): Promise<ResultData<Array<AuthorInfo>>> {
    return request({
        url: `/user/getAllUser.do?keyword=${data.keyword}&key=${data.key}&end=${data.end}`,
        method: "get",
        headers: {
            "token": data.token
        }
    })
}

// 获取所有的评论
export const getAllComment = function (data: any): Promise<ResultData<Array<Comment_web>>> {
    return request({
        url: `/topic/getAllComment.do?keyword=${data.keyword}&key=${data.key}&end=${data.end}`,
        method: "get",
        headers: {
            "token": data.token
        }
    })
}

// 获取所有的消息
export const getAllMessage = function (data: any): Promise<ResultData<Array<Message_>>> {
    return request({
        url: `/user/getAllMessage.do?keyword=${data.keyword}&key=${data.key}&end=${data.end}`,
        method: "get",
        headers: {
            "token": data.token
        }
    })
}

/**
 * 删除话题
 * @param data Object:{userID:'',topicID:''}
 * @returns 删除是否成功 boolean
 */
export const delete_topic = function (data: any): Promise<ResultData<boolean>> {
    return request({
        url: "/topic/deleteTopic.do",
        method: "post",
        data: {
            id: data.id,
            userID: data.userID
        },
        headers: data.headers
    })
}

// 获取举报消息
export const getReportMessage = function (data: any,token:string): Promise<ResultData<Array<ReportStrvice>>> {
    return request({
        url: "/user/getReportMessage.do",
        method: "get",
        params: data,
        headers: {
            'token':token
        }
    })
}