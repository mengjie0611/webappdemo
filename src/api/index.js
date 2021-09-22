import axios from './myAxios'
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (longitude, latitude) => axios(`/position/${latitude},${longitude}`)
    // [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqCategorys = () => axios('/index_category')
    // [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = ({ longitude, latitude }) => axios('/shops', { params: { longitude, latitude } })

export const reqGetDate = (param) => axios.post('/csdata/index/selectTradeDate', { param })
export const reqGetChartsData = (param) => axios.post('/csdata/index/selectAsharesDealListByVo', { param })

// // 5.用户名密码登陆
// export const reqPwdLogin = ({ phoneNumber, messageCode }) => axios.post('/csdata/login/loginByMessageCode', { phoneNumber, messageCode });

// 6. 手机号验证码登陆
export const reqSmsLogin = ({ phoneNumber, messageCode }) => axios.post('/csdata/login/loginByMessageCode', { phoneNumber, messageCode })

// 7. 自动登陆
export const reqGetChartsTwoData = (tradeDate) => axios.post('/csdata/index/selectFundProfileIndexList', { tradeDate })
export const reqFtzzData = ({ tradeDateStr, limit = 12, condition }) => axios.post('/csdata/index/selectInvestorNetAmountIndexListByVo', { tradeDateStr, limit, condition })