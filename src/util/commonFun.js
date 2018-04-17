/**
 * Created by hg on 2017/10/19.
 * @type {{dateFormat: commonFun.dateFormat}}
 */
var commonFun = {
    /**
     * @param date el-date-picker 日期转换
     * @returns {*}  yyyy-mm-dd
     */
    dateFormat: function(date){
        if(!date){return "";}
        var date = new Date(date);
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        m = m<10?'0'+m:m;
        d = d<10?'0'+d:d;
        return y + '-' + m + '-'+ d;
    },
    formatDate(rel){
        if(!rel){ return ""; }
        var date = new Date(rel);
        return date.getTime();
    },
    /**
     * 限制输入的金额为（可输入2位小数）
     * @param val
     * @returns {number|*}
     */
    matchPriceNum:function(val){
        val=val.replace(/[^0-9|\.]/g,'');
        if(val.indexOf('.')==0){//首位不能输入小数点
            val=''
        }
        if(val.indexOf('.')==-1){
            val=val.substring(0,5)
        }else{                        //存在小数点
            var num=val.indexOf('.');//判断小数点位数
            for(var i=num+1;i<val.length;i++){
                if(val[i]=='.'){
                    val=val.substring(0,i); //只能输入一个小数点
                }
            }
            val=val.substring(0,num+3);
        }
        val=+val>9999?9999:val;
        return val;
    },
    /**
     * 获取地址栏参数
     * @param param 参数名称
     * @returns {string} value
     */
    getUrlParam:function(param){
        var find_val = "";
        var search = window.location.href;
        search = search.substr(search.indexOf('?')+1);
        var searchs = search.split("&");
        for (var i = 0, l = searchs.length; i < l; i++) {
            var this_val = searchs[i],
                this_keys = this_val.split("="),
                this_key = this_keys[0];
            if (this_key == param) {
                find_val = this_keys[1];
                break;
            }
        }
        return find_val;
    },
    /**
    *  浮点数求和（在后端未对数据处理的情况下使用，下同）
    * */
    addFloat(a, b){
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.mulFloat(a, e) + this.mulFloat(b, e)) / e;
    },
    /**
     *  浮点数相乘
     * */
    mulFloat(a, b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {}
        try {
            c += e.split(".")[1].length;
        } catch (f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    }
};
export default commonFun;



