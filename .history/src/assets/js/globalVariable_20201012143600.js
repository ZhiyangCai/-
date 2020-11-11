//用户session变量
const userCode = sessionStorage.getItem('userCode');
const userName = sessionStorage.getItem('userName');

const serviceItmsPort = '/transfer/api/dsm';

const serviceDsmPort = serviceItmsPort; //服务接口目录

//测试环境
const httpTestUrl = 'http://10.156.5.145:8083/';
const fileDownloadUrlTest = 'http://10.156.5.145:8083/transfer/business/file/download';

//正式环境
const httpFormalUrl = 'https://portal.hbtobacco.cn/';
const fileDownloadUrlFormal = 'https://portal.hbtobacco.cn/transfer/business/file/download';


const isNormal = 'false'; //测试环境
// const isNormal = 'true'; //正式环境

// const wxNormal = 'true';//企业微信包
const wxNormal = 'false'; //非企业微信包

sessionStorage.setItem('isNormal', isNormal);
sessionStorage.setItem('wxNormal', wxNormal);

let httpUrl; //附件上传、删除接口url
let fileDownloadUrl; //附件下载url

if (isNormal && isNormal === 'true') { //正式环境
    httpUrl = httpFormalUrl;
    fileDownloadUrl = fileDownloadUrlFormal;
} else if (isNormal === 'false') {
    httpUrl = httpTestUrl;
    fileDownloadUrl = fileDownloadUrlTest;
}

export default {
    httpUrl,
    serviceDsmPort,
    userCode,
    userName,
    isNormal,
    wxNormal,
    fileDownloadUrl
}