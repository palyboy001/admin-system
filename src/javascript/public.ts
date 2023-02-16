/**
 * 判断数组是否为空
 * @param arr 数组
 * @returns boolean
 */
export const isEmpty = function(arr: Array<any>): boolean {
    if (arr.length === 0) {
      return true;
    }
    return false;
}

/**
 * 获取当前时间
 * @param date 时间戳
 * @returns 时间字符串:YYYY:MM:DD
 */
export const timestamp_to_Date = function(date?: any):string {
    let date_ = new Date(date);
    return `${date_.getFullYear()}-${date_.getMonth()+1}-${date_.getDate()}`;
}

