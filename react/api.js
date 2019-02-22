/*
 * @Author: cuijian6
 * @Date: 2019-02-21 15:44:57
 * @Last Modified by: cuijian6
 * @Last Modified time: 2019-02-22 17:00:05
 * @Note: API列表
 */
// 判断是否服务器渲染
const __SERVER__ = typeof window == 'object' ? false : true;
// const SERVER = __SERVER__ ? 'http://www.jiancui.net' : '';
const SERVER = __SERVER__ ? 'http://localhost:3000' : 'http://www.jiancui.net';

export default  {
  list: `${SERVER}/api/articleList`,
  content: `${SERVER}/api/articleContent`
};