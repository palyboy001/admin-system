import { timestamp } from "@vueuse/shared";

// 后端返回值类
export interface ResultData<T>{
    message:string;
    code:string;
    data:T;
}
// 搜索模式
export type Methods = 'search' | 'onload' | never

// 路由接口
export interface Router_interface{
    name:string;
    path:string;
    meta:any;
    component:any;
    children:Array<Router_interface>;
}

// 路由数组
export interface RouterArray{
    [index:number]:Router_interface
}

// 用户基本数据
export interface UserInfo{
    userRole:string; //用户权限
    userID:string; // 用户id
    userAccount:string; // 用户账号，（进入用户主页后充当访问者id）
    phoneNumber:string; // 电话号码
    password :string; // 密码?token
    email:string; // 用户邮箱
    createTime:Date; //创建时间
    delFlag:string; // 是否注销
    infoImage:string; // 用户头像
    nikeName:string; // 用户昵称
    sex:string; // 性别：1男，0女
    cover:string; // 个人中心背景图片
    birthday:string; // 生日
    address:string; // 地址
    ip:string; // ip地址
    education:string; // 学历
    signature:string; // 签名
    integral:number; // 积分余额
    lastLoginTime:Date; // 上一次登录时间
    status:string; // 账号是否在线
    level:number; // 账号等级
    VIPLevel:number; // vip等级
}

// 作者?登录用户数据接口
export interface AuthorInfo{
    user:UserInfo; // 用户基本信息
    credit:string; // 获赞总数
    fans:string; // 粉丝总数
    router:RouterArray; // 路由信息
    attention:string; // 关注总数
    visitor:string; // 访客总数
    whetherFocusOn:boolean; // 是否关注该作者
}

// 系统信息接口
export interface SystemValue{
    width:string;
    height:string;
}

// 话题接口
export interface Topic{
    userRole:UserInfo; // 发布用户信息
    id:string;// 话题id
    content:string; // 内容
    topicImage:Array<string>; // 图片
    topicAddress:string; // 地址
    topicCreateTime:Date; // 创建时间
    remindUser:Array<string>; // @的用户id
    read_count:number; // 阅读量
    like_count:number; // 点赞量（判断是否点赞  > 0 才是赞）
    collect_count:number; // 收藏量（判断是否点收藏 > 0 才是收藏）
    unlike_count:number; // 踩数量（判断是否点踩 > 0 才是踩）
    comment_count:number; // 评论总数
    whetherFocusOn:boolean; // 是否关注
    likeUser:boolean; // 当前登录用户是否点赞
    collectUser:boolean; // 当前登录用户是否收藏
    caiUser:boolean; // 当前登录用户是否踩attribute
}

// 评论接口
export interface Comment_web{
    cai:boolean;
    childs:Array<Comment_web>;
    comment:Comment;
    like:boolean;
    sendTime:string;
    sendUser:UserInfo;
    toUser:string
}

// 评论内容
export interface Comment{
    caiCount:number;
    commentID:string;
    content:string;
    createTime:Number;
    id:string;
    likeCount:number;
    pid:string;
    toCommentID:string;
    toUserID:string;
    userID:string;
}

// 消息
export interface Message_{
    count:number;
    createTime:string;
    destination:string;
    index:number;
    message:string;
    mySend:boolean;
    sendSuccess:false;
    source:UserInfo;
    type:string;
}

// 举报消息接口
export interface Report{
    reportID?:string; // id
    reportUser?:string; // 举报者id
    cheaters?:string; // 被举报者id
    reportImage?:string; // 举报信息图片
    reportType?:string; // 举报信息类型
    reportTopic?:string; // 举报的话题id
    reportContent?:string; // 举报内容
    createTime?:Date; // 举报时间
}

// 举报消息服务端就扣
export interface ReportStrvice{
    reportUser:UserInfo; // 举报者信息
    cheaters:UserInfo; // 被举报者信息
    sqlReportInfo:Report; // 举报信息
}