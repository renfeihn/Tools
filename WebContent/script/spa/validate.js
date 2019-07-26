/*!
 * Javascript library v 3.0
 * Based on Agree JavaScript Library v1.1.0
 * 
 * Date : 2015.05.18
 * Dep : jquery-v.js, agree.common.js
 */

/**
 * [Fnt.data对象 提供表单验证功能]
 * @param  {[jQuery]} $         [jQuery]
 * @param  {[object]} Fnt       [Fnt对象]
 * @param  {[undefined]} undefined 
 * @author lihao01@cfischina.com 
 */
( /*<global>*/ function (undefined) {

	(function (factory) {
		"use strict";

		//amd module
		if (typeof define === "function" && define.amd) {
			define("validate", ["jquery"], factory);
		}
			//global
		else {
			factory();
		}

	})(function ($) {
		"use strict";

		var oSettings = {

			/**
			 * [oRegExp 正则表达式]
			 * @type {object}
			 */
			oRegExp: {
				/* 整数 */
				rInteger: /^-?\d+$/,
				/* 浮点数 */
				rFloat: /^(-?\d+\.)(\d+)?$/,
				/* 全数字 */
				rNumStr: /^\d+?$/,
				/* 全字母 */
				rLetter: /^[a-zA-Z]+$/,
				/* 全大写字母 */
				rUppercase: /^[A-Z]+$/,
				/* 全小写字母 */
				rLowercase: /^[a-z]+$/,
				/* 字母数字下划线，且由字母开头 */
				rAccount: /^[a-zA-Z]+([a-zA-Z0-9_]+)?$/,
				/* 邮箱格式 */
				rEmail: /^([\w-]+(\.[\w-]+)*)@[\w-]+(\.[\w-]+)+$/,
				/* 邮编格式 */
				rZipcode: /^[1-9]\d{5}$/,
				/* 手机格式 */
				rMobile: /^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/,
				/* 端口格式 */
				rPort: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
				/* 主机格式*/
				rHost:/^(((2(5[0-5]|[0-4][0-9]))|(1[0-9]{2})|([1-9][0-9])|[0-9])\.){3}((2(5[0-5]|[0-4][0-9]))|(1[0-9]{2})|([1-9][0-9])|[0-9])$/,
				/* 版本格式*/
           		rVersion: /^\d+\.\d+$/,
           		/* 容量单位*/
           		rUnit: /^((\d+)|((\d+\.)(\d+)+))((b)|(k)|(m)|(g)|(t)|(kb)|(mb)|(gb)|(tb))$/i
			},

			fn: (function () {
				/**
				 * [_fnSingleValidate 字段验证]
				 * @param  {[object]} oFilter [包括字段类型及详细规则]
				 * @param  {[string]} sValue  [字段内容]
				 * @return {[object]}         [验证结果]
				 */
				var _fnSingleValidate = function (oFilter, sValue) {
					var sType = oFilter[oSettings.oFilter.sType];
					//default string
					sType = sType||"string";

					if (sType in oSettings.oContext) {
						var sMethodName = _fnGetMethodName(sType),
							aContext = oSettings.oContext[sType],
							oResult = oSettings.fn[sMethodName].call({}, sValue);

						//若类型判断无误，则检查是否有具体业务规则
						if (oResult.bResult && aContext && aContext.length > 0) {
							$.each(aContext, function (idx, sRole) {
								var oRole = oFilter[sRole], oRoleResult;
								if (oRole) {
									oRoleResult = oSettings.fn[_fnGetMethodName(sRole)].apply({}, [oRole, sValue]);
									if (!oRoleResult.bResult) {
										oResult.sErrMsg += (oRoleResult.sErrMsg + "\n");
										oResult.bResult = false;
									}
								}
							});
						}

					}

					return oResult;
				};

				/**
				 * [_fnGetMethodName 按照规则拼出规则验证方法名]
				 * @param  {[string]} sType [字段类型]
				 * @return {[string]}       [方法名]
				 */
				var _fnGetMethodName = function (sType) {
					return "fn" + sType.substr(0, 1).toUpperCase() +
						sType.substr(1);
				};

				/**
				 * [_fnString 均为true]
				 * @return {[object]} [验证结果]
				 */
				var _fnString = function () {
					return {
						bResult: true,
						sErrMsg: ""
					};
				};

				/**
				 * [_fnNumber 数值类型判断]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnNumber = function (sValue) {
					var bResult = !isNaN(parseFloat(sValue)) && isFinite(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sNumber, sValue)
					};
				};

				/**
				 * [_fnInteger 整数类型判断]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnInteger = function (sValue) {
					var bResult = oSettings.oRegExp.rInteger.test(sValue);

                    //不能出现 -00000  的形式
                    if(bResult){
                        //字符串化
                        sValue = sValue + '';
                        bResult = (parseInt(sValue, 10).toString() === sValue);
                    }

					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sInteger, sValue)
					};
				};

				/**
				 * [_fnNonNegativeInteger 非负整数类型判断 0、1、2、3...]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnNonNegativeInteger = function (sValue) {
					var bResult = oSettings.oRegExp.rInteger.test(sValue);
					//不能出现 -0和012  的形式
                    if(bResult){
                        //字符串化
                        sValue = sValue + '';
                        bResult = (parseInt(sValue, 10).toString() === sValue);
                    }
                    
					bResult = bResult ? parseInt(sValue) >= 0 : bResult;
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sNonNegativeInteger, sValue)
					};
				};

				/**
				 * [_fnNonPositiveInteger 非正整数类型判断 0、-1、-2、-3...]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnNonPositiveInteger = function (sValue) {
					var bResult = oSettings.oRegExp.rInteger.test(sValue);
					//不能出现 -0和-012  的形式
                    if(bResult){
                        //字符串化
                        sValue = sValue + '';
                        bResult = (parseInt(sValue, 10).toString() === sValue);
                    }
                    
					bResult = bResult ? parseInt(sValue) <= 0 : bResult;
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sNonPositiveInteger, sValue)
					};
				};

				/**
				 * [_fnFloat 浮点数类型判断]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnFloat = function (sValue) {
					var bResult = oSettings.oRegExp.rFloat.test(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sFloat, sValue)
					};
				};

				/**
				 * [_fnNumStr 全数字字符串]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnNumStr = function (sValue) {
					var bResult = oSettings.oRegExp.rNumStr.test(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sNumStr, sValue)
					};
				};

				/**
				 * [_fnLetter 全字母字符串]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnLetter = function (sValue) {
					var bResult = oSettings.oRegExp.rLetter.test(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sLetter, sValue)
					};
				};

				/**
				 * [_fnUppercase 全大写字母字符串]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnUppercase = function (sValue) {
					var bResult = oSettings.oRegExp.rUppercase.test(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sUppercase, sValue)
					};
				};

				/**
				 * [_fnLowercase 全小写字母字符串]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnLowercase = function (sValue) {
					var bResult = oSettings.oRegExp.rLowercase.test(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sLowercase, sValue)
					};
				};

				/**
				 * [_fnAccount 账号规则验证]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnAccount = function (sValue) {
					var bResult = oSettings.oRegExp.rAccount.test(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sAccount, sValue)
					};
				};

				/**
				 * [_fnEmail 邮箱规则验证]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnEmail = function (sValue) {
					var bResult = oSettings.oRegExp.rEmail.test(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sEmail, sValue)
					};
				};

				/**
				 * [_fnZipcode 邮编规则验证]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnZipcode = function (sValue) {
					var bResult = oSettings.oRegExp.rZipcode.test(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sZipcode, sValue)
					};
				};

				/**
				 * [_fnMobile 手机规则验证]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnMobile = function (sValue) {
					var bResult = oSettings.oRegExp.rMobile.test(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sMobile, sValue)
					};
				};

				/**
				 * [_fnPort 端口规则验证]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnPort = function (sValue) {
					var bResult = oSettings.oRegExp.rPort.test(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sPort, sValue)
					};
				};

				/**
				 * [_fnHost ip地址规则验证]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnHost = function (sValue) {
					var bResult=oSettings.oRegExp.rHost.test(sValue);
					return{
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sHost, sValue)
					};
				};

				/**
				 * [_fnVersion 版本规则验证]
				 * @param  {[string]} sValue [字段内容]
				 * @return {[object]}        [验证结果]
				 */
				var _fnVersion = function (sValue) {
					var bResult=oSettings.oRegExp.rVersion.test(sValue);
					return{
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sVersion, sValue)
					};
				};
				
				/**
				 * [_fnUnit 容量单位验证]
				 * @param {[string]} sValue [字段内容]
				 * @return {[object]}		[验证结果]
				 */
				var _fnUnit = function(sValue){
					var bResult = oSettings.oRegExp.rUnit.test(sValue);
					return{
						bResult: bResult,
						sErrMsg: bResult?"": _fnGetErrMsg(oSettings.oFilter.sUnit,sValue)
					}
				};
				
                var _fnFile=function(sValue,sAccept){
                    sAccept = '('+(sAccept || '').replace(/\s/g,'').split(',').join('|')+')'.replace(/\./g,'\\\\\\\\.');
                    /*文件格式*/
                    var rFile=new RegExp('([^\\\\/]+)'+sAccept+'$','i'),
                        bResult=rFile.test(sValue);
                    return{
                        bResult: bResult,
                        sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sFile, sValue)
                    };
                };

				//以下为详细规则校验-------------------------------------------------------------
				/**
				 * [_fnRequire 验证是否必输，仅当验证类型不输入或为string时生效]
				 * @param  {[boolean]} bChecked [是否校验]
				 * @param  {[string]} sValue   [字段内容]
				 * @return {[object]}          [验证结果]
				 */
				var _fnRequire = function (bChecked, sValue) {
					var bResult = bChecked ? _fnTrim(sValue).length > 0 : true;
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sRequire, sValue)
					};
				};

				/**
				 * [_fnMin 最小值设置，数值类型可加此校验]
				 * @param  {[object]} oMin 		[最小值]
				 * @param  {[string]} sValue   [字段内容]
				 * @return {[object]}          [验证结果]
				 */
				var _fnMin = function (oMin, sValue) {
					var bResult = parseFloat(oMin) <= parseFloat(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sMin, sValue, oMin)
					};
				};

				/**
				 * [_fnMax 最大值设置，数值类型可加此校验]
				 * @param  {[object]} oMax 		[最大值]
				 * @param  {[string]} sValue   [字段内容]
				 * @return {[object]}          [验证结果]
				 */
				var _fnMax = function (oMax, sValue) {
					var bResult = parseFloat(oMax) >= parseFloat(sValue);
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sMax, sValue, oMax)
					};
				};

				/**
				 * [_fnPositive 是否为正数，数值类型可加此校验]
				 * @param  {[boolean]} bChecked 	[是否校验]
				 * @param  {[string]} sValue   [字段内容]
				 * @return {[object]}          [验证结果]
				 */
				var _fnPositive = function (bChecked, sValue) {
					var bResult = bChecked ? parseFloat(sValue) > 0 : true;
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sPositive, sValue)
					};
				};

				/**
				 * [_fnNegative 是否为负数，数值类型可加此校验]
				 * @param  {[boolean]} bChecked 	[是否校验]
				 * @param  {[string]} sValue   [字段内容]
				 * @return {[object]}          [验证结果]
				 */
				var _fnNegative = function (bChecked, sValue) {
					var bResult = bChecked ? parseFloat(sValue) < 0 : true;
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sNegative, sValue)
					};
				};

				/**
				 * [_fnTailLen 小数点后位数，浮点数值类型可加此校验]
				 * @param  {[boolean]} oLen 	[精度长度]
				 * @param  {[string]} sValue   [字段内容]
				 * @return {[object]}          [验证结果]
				 */
				var _fnTailLen = function (oLen, sValue) {
					var aExec = oSettings.oRegExp.rFloat.exec(sValue),
						bResult = aExec ? (aExec[2] ? aExec[2].length === parseInt(oLen,10) : false) : false;
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sTailLen, sValue, oLen)
					};
				};

				/**
				 * [_fnMinLen 最小长度，字符串类型可加此校验]
				 * @param  {[object]} oMinLen 	[长度]
				 * @param  {[string]} sValue   [字段内容]
				 * @return {[object]}          [验证结果]
				 */
				var _fnMinLen = function (oMinLen, sValue) {
					var bResult = parseInt(oMinLen,10) <= sValue.length;
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sMinLen, sValue, oMinLen)
					};
				};

				/**
				 * [_fnMaxLen 最大长度，字符串类型可加此校验]
				 * @param  {[object]} oMaxLen 	[长度]
				 * @param  {[string]} sValue   [字段内容]
				 * @return {[object]}          [验证结果]
				 */
				var _fnMaxLen = function (oMaxLen, sValue) {
					var bResult = parseInt(oMaxLen,10) >= sValue.length;
					return {
						bResult: bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sMaxLen, sValue, oMaxLen)
					};
				};
				
				/**
				 * [_fnChineseMinLen 包含汉字的最小长度，字符串类型可加此校验]
				 * @param  {[object]} oMaxLen 	[长度]
				 * @param  {[string]} sValue   [字段内容]
				 * @return {[object]}          [验证结果]
				 */
				var _fnChineseMinLen=function(oMinLen,sValue){
					var bResult;
					bResult=parseInt(oMinLen,10) <= sValue.replace(/[^\x00-\xff]/g,'**').length;
					
					return {
						bResult:bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sChineseMinLen, sValue, oMinLen)
					};
				};
				
				/**
				  * [_fnChineseMinLen 包含汉字的最大长度，字符串类型可加此校验]
				 * @param  {[object]} oMaxLen 	[长度]
				 * @param  {[string]} sValue   [字段内容]
				 * @return {[object]}          [验证结果]
				 */
				var _fnChineseMaxLen=function(oMaxLen,sValue){
					var bResult;
					bResult=parseInt(oMaxLen,10) >= sValue.replace(/[^\x00-\xff]/g,'**').length;
					
					return {
						bResult:bResult,
						sErrMsg: bResult ? "" : _fnGetErrMsg(oSettings.oFilter.sChineseMaxLen, sValue, oMaxLen)
					};
				};

				/**
				 * [_fnTrim 去除字符串左右空白符]
				 * @param  {[string]} sStr [字符串]
				 * @return {[boolean]}      []
				 */
				var _fnTrim = function (sStr) {
					return sStr.replace(/(^\s*)|(\s*$)/g, '');
				};

				//FIXME extend

				/**
				 * [_fnGetErrMsg 根据校验规则获取错误信息]
				 * @param  {[string]} sType  [类型]
				 * @param  {[string]} sValue [字段内容]
				 * @param  {[string]} sRole  [当前规则]
				 * @return {[object]}        
				 */
				var _fnGetErrMsg = function (sType, sValue, sRole) {
					var sMsgFmt = oSettings.oMsgFmt[sType];

					sMsgFmt = sMsgFmt.replace(new RegExp("%r", "gi"), sRole);

					return sMsgFmt;
				};

				return {
					"fnSingleValidate": _fnSingleValidate,
					"fnGetErrMsg": _fnGetErrMsg,

					"fnString": _fnString,
					"fnNumber": _fnNumber,
					"fnInteger": _fnInteger,
					"fnNonNegativeInteger": _fnNonNegativeInteger,
					"fnNonPositiveInteger": _fnNonPositiveInteger,
					"fnFloat": _fnFloat,
					"fnNumStr": _fnNumStr,
					"fnLetter": _fnLetter,
					"fnUppercase": _fnUppercase,
					"fnLowercase": _fnLowercase,
					"fnAccount": _fnAccount,
					"fnEmail": _fnEmail,
					"fnZipcode": _fnZipcode,
					"fnMobile": _fnMobile,
					"fnPort": _fnPort,
					"fnHost": _fnHost,
					"fnUnit": _fnUnit,
					"fnVersion": _fnVersion,
                    "fnFile": _fnFile,

					"fnRequire": _fnRequire,
					"fnMin": _fnMin,
					"fnMax": _fnMax,
					"fnPositive": _fnPositive,
					"fnNegative": _fnNegative,
					"fnTailLen": _fnTailLen,
					"fnMinLen": _fnMinLen,
					"fnMaxLen": _fnMaxLen,
					
					"fnChineseMinLen":_fnChineseMinLen,
					"fnChineseMaxLen":_fnChineseMaxLen
					
					//FIXME extend
				};

			})(),

			/**
			 * [oFilter 过滤规则静态字符串]
			 * @type {object}
			 */
			oFilter: {
				sId: "id",
				sValue: "value",
				sFilter: "filter",
				sType: "type",
                sMsg:"msg",
                sPreMsg:"preMsg",

				sString: "string",
				sNumber: "number",
				sInteger: "integer",
				sNonNegativeInteger: "nonNegativeInteger",
				sNonPositiveInteger: "nonPositiveInteger",
				sFloat: "float",
				sNumStr: "numStr",
				sLetter: "letter",
				sUppercase: "uppercase",
				sLowercase: "lowercase",
				sAccount: "account",
				sEmail: "email",
				sZipcode: "zipcode",
				sMobile: "mobile",
				sPort: "port",
				sHost: "host",
				sVersion: "version",
				sUnit: "unit",
                sFile: "file",

				sRequire: "require",
				sMin: "min",
				sMax: "max",
				sPositive: "positive",
				sNegative: "negative",
				sTailLen: "tailLen",
				sMinLen: "minLen",
				sMaxLen: "maxLen",
				sChineseMinLen:'chineseMinLen',
				sChineseMaxLen:'chineseMaxLen'

				//FIXME extend
			}

		};

		$.extend(oSettings, {

			/**
			 * [关联字段类型与详细规则]
			 */
			oContext: (function () {
				var oCtx = Object();
				
				oCtx[oSettings.oFilter.sString] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMinLen, oSettings.oFilter.sMaxLen, oSettings.oFilter.sChineseMinLen, oSettings.oFilter.sChineseMaxLen];
				oCtx[oSettings.oFilter.sNumber] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMin, oSettings.oFilter.sMax,
												   oSettings.oFilter.sPositive, oSettings.oFilter.sNegative];
				oCtx[oSettings.oFilter.sInteger] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMin, oSettings.oFilter.sMax,
												   oSettings.oFilter.sPositive, oSettings.oFilter.sNegative];
				oCtx[oSettings.oFilter.sNonNegativeInteger] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMin, oSettings.oFilter.sMax];
				oCtx[oSettings.oFilter.sNonPositiveInteger] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMin, oSettings.oFilter.sMax];
				oCtx[oSettings.oFilter.sFloat] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMin, oSettings.oFilter.sMax,
												   oSettings.oFilter.sPositive, oSettings.oFilter.sNegative,
												   oSettings.oFilter.sTailLen];
				oCtx[oSettings.oFilter.sNumStr] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMinLen, oSettings.oFilter.sMaxLen];
				oCtx[oSettings.oFilter.sLetter] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMinLen, oSettings.oFilter.sMaxLen];
				oCtx[oSettings.oFilter.sUppercase] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMinLen, oSettings.oFilter.sMaxLen];
				oCtx[oSettings.oFilter.sLowercase] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMinLen, oSettings.oFilter.sMaxLen];
				oCtx[oSettings.oFilter.sAccount] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMinLen, oSettings.oFilter.sMaxLen];
				oCtx[oSettings.oFilter.sEmail] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMinLen, oSettings.oFilter.sMaxLen];
				oCtx[oSettings.oFilter.sZipcode] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMinLen, oSettings.oFilter.sMaxLen];
				oCtx[oSettings.oFilter.sMobile] = [oSettings.oFilter.sRequire, oSettings.oFilter.sMinLen, oSettings.oFilter.sMaxLen];
				oCtx[oSettings.oFilter.sPort] = [oSettings.oFilter.sRequire];
				oCtx[oSettings.oFilter.sHost] = [oSettings.oFilter.sRequire];
				oCtx[oSettings.oFilter.sUnit] = [oSettings.oFilter.sRequire];
				oCtx[oSettings.oFilter.sVersion] = [oSettings.oFilter.sRequire];
                oCtx[oSettings.oFilter.sFile] = [oSettings.oFilter.sRequire];
                
				//FIXME extend

				return oCtx;
			})(),

			/**
			 * [具体规则及对应的错误信息格式]
			 */
			oMsgFmt: (function () {
				var oMsgFmt = Object();

				oMsgFmt[oSettings.oFilter.sNumber] = "必需为数值类型";
				oMsgFmt[oSettings.oFilter.sInteger] = "必需为整数";
				oMsgFmt[oSettings.oFilter.sNonNegativeInteger] = "必需为非负整数";
				oMsgFmt[oSettings.oFilter.sNonPositiveInteger] = "必需为非正整数";
				oMsgFmt[oSettings.oFilter.sFloat] = "必需为浮点数";
				oMsgFmt[oSettings.oFilter.sNumStr] = "必需为纯数字字符串";
				oMsgFmt[oSettings.oFilter.sLetter] = "必需为纯字母字符串";
				oMsgFmt[oSettings.oFilter.sUppercase] = "必需为纯大写字母字符串";
				oMsgFmt[oSettings.oFilter.sLowercase] = "必需为纯小写字母字符串";
				oMsgFmt[oSettings.oFilter.sAccount] = "必需由字母、数字和下划线组成，且为字母开头";
				oMsgFmt[oSettings.oFilter.sEmail] = "不满足邮箱格式";
				oMsgFmt[oSettings.oFilter.sZipcode] = "不满足邮编格式";
				oMsgFmt[oSettings.oFilter.sMobile] = "不满足手机格式";
				oMsgFmt[oSettings.oFilter.sPort] = "不满足端口格式";
				oMsgFmt[oSettings.oFilter.sHost] = "不满足主机格式";
				oMsgFmt[oSettings.oFilter.sVersion] = "不满足版本格式";
				oMsgFmt[oSettings.oFilter.sUnit] = "不满足单位格式";
                oMsgFmt[oSettings.oFilter.sFile] = "不满足文件格式";

				oMsgFmt[oSettings.oFilter.sRequire] = "不能为空或空白行";
				oMsgFmt[oSettings.oFilter.sMin] = "不能小于%r";
				oMsgFmt[oSettings.oFilter.sMax] = "不能大于%r";
				oMsgFmt[oSettings.oFilter.sPositive] = "不能为0或负数";
				oMsgFmt[oSettings.oFilter.sNegative] = "不能为0或正数";
				oMsgFmt[oSettings.oFilter.sTailLen] = "小数点后长度不为%r";
				oMsgFmt[oSettings.oFilter.sMinLen] = "字符串长度不能少于%r位";
				oMsgFmt[oSettings.oFilter.sMaxLen] = "字符串长度不能超过%r位";

				oMsgFmt[oSettings.oFilter.sChineseMinLen] = "字符串长度不能少于%r位";
				oMsgFmt[oSettings.oFilter.sChineseMaxLen] = "字符串长度不能超过%r位";
				
				//FIXME extend

				return oMsgFmt;
			})(),

		});

		var Data = {

			/**
			 * [validate 字段类型及规则验证]
			 * @param  {[array]} aDatas [存储字段校验信息]
			 * @return {[object]}        [返回校验结果及校验成功数据的json对象]
			 */
			validate: function (validates) {
                //传入参数
                //校验的数组队列
                var aDatas=validates.data,

                    //错误处理函数
                    errorCallback=validates.errorCallback||function ($el, errMsg) {
                            $el.closest('.control-group').addClass('error');
                            $el.next().removeClass('hide').text(errMsg);
                        },
                    //正确处理函数
                    correctCallback=validates.correctCallback||function ($el, correctMsg) {
                            $el.closest('.control-group').removeClass('error');
                            $el.next().addClass('hide');
                        },
                    //校验元素上下文
                    $context=validates.$context;

				var oFilter = oSettings.oFilter,
					fn = oSettings.fn,
					oResDatas = [],
					bResult = true,
					sErrMsg = "",
                    firstError = true;

				if (!$.isArray(aDatas)) {
					throw new Error("参数必须为数组类型！");
				}

				$.each(aDatas, function (idx, oData) {
					var $el = $('#'+oData[oFilter.sId],$context),
						sValue = oData[oFilter.sValue] !== undefined ? oData[oFilter.sValue] : ($el.val() || ''),
						oValiRes,
						accept,
                        type,
                        errMsg;
						
					if(!$el.length && !sValue){//若对应id已被删除则不进行校验
						return true; //跳出当前循环
					}
					
                    //判断文件类型
                    accept=$el.attr('accept')||oData[oFilter.sFilter].accept;
                    type=$el.attr('type')||oData[oFilter.sFilter.sType];
                    if(type==='file'&&accept) {
                        oValiRes = fn.fnFile(sValue, accept);
                    }else if (oData[oFilter.sFilter]) {
						oValiRes = fn.fnSingleValidate(oData[oFilter.sFilter], sValue);
					}

					if (oValiRes.bResult && oData[oFilter.sId]) {
						oResDatas.push({
                            name:$el[0].name,
                            value:sValue
                        });
                        correctCallback&&correctCallback($el,'');
                    }else {
                        oResDatas.push(oValiRes.sErrMsg);
						bResult = false;

                        errMsg=oData[oFilter.sMsg] || ((oData[oFilter.sPreMsg] || '') + oValiRes.sErrMsg);
                        
                        if (firstError) {
                        	errorCallback&&errorCallback($el,errMsg, true);
                        	firstError = false;
                        } else {
                        	errorCallback&&errorCallback($el,errMsg, false);
                        }

                        $el.one('focus',function(){
                            correctCallback&&correctCallback($(this),'');
                        });
					}

				});

				return {
					bResult: bResult,
					oDatas: oResDatas
				};
			},

			ajax: function (oOpt) {
				var oResult = this.validate(oOpt.data);
				if (oResult.bResult) {
					oOpt.data = oResult.oDatas;
                    oOpt= $.extend({sheleter:'正在校验，请稍后…'},oOpt);
					$.ajax(oOpt);
				}
			}

		};

		//扩展基础方法，供外部调用
		$.extend(Data, {
			isNumber: oSettings.fn.fnNumber,
			isInteger: oSettings.fn.fnInteger,
			isNonNegativeInteger: oSettings.fn.fnNonNegativeInteger,
			isNonPositiveInteger: oSettings.fn.fnNonPositiveInteger,
			isFloat: oSettings.fn.fnFloat,
			isNumStr: oSettings.fn.fnNumStr,
			isLetter: oSettings.fn.fnLetter,
			isUppercase: oSettings.fn.fnUppercase,
			isLowercase: oSettings.fn.fnLowercase,
			isAccount: oSettings.fn.fnAccount,
			isEmail: oSettings.fn.fnEmail,
			isZipcode: oSettings.fn.fnZipcode,
			isMobile: oSettings.fn.fnMobile,
			isPort: oSettings.fn.fnPort,
			isHost: oSettings.fn.fnHost,
			isUnit: oSettings.fn.fnUnit,
			isVersion: oSettings.fn.fnVersion
			
			//FIXME extend
		});

		return Data;
	});

})();