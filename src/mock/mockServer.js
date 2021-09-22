/* 
使用mockjs定义mock接口的模块
*/
import Mock from 'mockjs'

import data from './data.json'


// 定义mock接口: goods
Mock.mock('/api/goods', {code: 0, data: data.goods})

// 定义mock接口: ratings
Mock.mock('/api/ratings', {code: 0, data: data.ratings})

// 定义mock接口: info
Mock.mock('/api/info', {code: 0, data: data.info})
