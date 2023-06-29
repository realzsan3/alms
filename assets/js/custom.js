var userAgent = navigator.userAgent.toLowerCase();

// 判断是否为Android设备
if (userAgent.indexOf("android") !== -1) {
	document.getElementById("myLink").href = "weixin://";
	document.getElementById("tips").textContent = "长按图片保存本地，点击图片打开微信,点击右上角扫一扫,选择相册并选择刚才保存的图片"
}
// 判断是否为iOS设备
else if (userAgent.indexOf("iphone") !== -1 || userAgent.indexOf("ipad") !== -1 || userAgent.indexOf("ipod") !== -1) {
	document.getElementById("myLink").href = "weixin://scanqrcode";
	document.getElementById("tips").textContent = "长按图片保存本地，点击图片打开微信,点击相册并选择刚才保存的图片"
}
// 其他设备
else {
	document.getElementById("myLink").href = window.location.href;
}