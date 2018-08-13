//公用url地址
var fk_url = "http://10.103.25.80:9666/api";


/**
 * ajax封装
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储，
 * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
 * 注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
 * type 请求方式("POST" 或 "GET")， 默认为 "GET"
 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * successfn 成功回调函数
 * errorfn 失败回调函数
 */
function post(url, data, successfn, errorfn) {
	data = (data == null || data == "" || typeof(data) == "undefined") ? {
		"date": new Date().getTime()
	} : data;
	$.ajax({
		type: "post",
		async: false,
		data: JSON.stringify(data),
		url: fk_url + url,
		dataType: "json",
		xhrFields: {
            withCredentials: true//跨域
        },
        crossDomain: true,
        contentType: "application/json",
		success: function(d) {
			if(d.retCode == "510") {
				alert("请先登录！");
				location.href = 'login.html';
			} else {
				successfn(d);
			}
		},
		error: function(e) {
			errorfn(e);
		}
	});
};

function get(url, data, successfn, errorfn) {
	data = (data == null || data == "" || typeof(data) == "undefined") ? {
		"date": new Date().getTime()
	} : data;
	$.ajax({
		url: fk_url + url,
		type: "get",
		async: false,
		data: data,
		dataType: "json",
		xhrFields: {
            withCredentials: true//跨域
        },
        crossDomain: true,
        contentType: "application/json",
		success: function(d) {
			if(d.retCode == "510") {
				top.location.href = './login.html';
				// 获得frame索引
				var index = layer.getFrameIndex(window.name);
				//关闭当前frame
				layer.close(index);
			} else {
				successfn(d);
			}
		},
		error: function(e) {
			errorfn(e);
		}
	});
};

function getAsync(url, data, successfn, errorfn) {
	data = (data == null || data == "" || typeof(data) == "undefined") ? {
		"date": new Date().getTime()
	} : data;
	$.ajax({
		url: fk_url + url,
		type: "get",
		async: true,
		data: data,
		dataType: "json",
		xhrFields: {
            withCredentials: true//跨域
        },
        crossDomain: true,
        contentType: "application/json",
		success: function(d) {
			if(d.retCode == "510") {
				top.location.href = './login.html';
				// 获得frame索引
				var index = layer.getFrameIndex(window.name);
				//关闭当前frame
				layer.close(index);
			} else {
				successfn(d);
			}
		},
		error: function(e) {
			errorfn(e);
		}
	});
};

//分页
function toPage(total, currentPageAllAppoint, data) {
				
				layui.use(['form', 'laypage', 'layedit', 'layer', 'laydate'], function() {
					var form = layui.form,
						layer = layui.layer,
						layedit = layui.layedit,
						laydate = layui.laydate,
						laypage = layui.laypage;

					laypage.render({
						elem: 'paged',
						count: total, //得到总页数，在layui2.X中使用count替代了，并且不是使用"总页数"，而是"总记录条数"
						curr: currentPageAllAppoint,
						jump: function(obj, first) {

							currentPageAllAppoint = obj.curr;

							if(!first) {
								data;
							}
						}
					});

				});
				

			};
			
