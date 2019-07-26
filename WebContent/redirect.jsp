<!DOCTYPE html>
<%@ page isErrorPage="true" language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<%
	boolean active = Boolean.valueOf(request.getParameter("active"));
%>
<html>
<head>
	<title>AWeb2.1</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body class="Login-bg">
	<form id="redirectForm" action="LoginAction_redirect.do" method="POST"></form>
	<script type="text/javascript">
		<% if (!active) { %>
		alert("用户在其他地方登录或本地缓存被清理（session超时），请重新登录");
		<% } %>
		document.getElementById("redirectForm").submit();
	</script>
</body>
</html>