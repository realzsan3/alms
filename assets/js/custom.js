var userAgent = navigator.userAgent;
var API_BASE_URL = 'lecdapi.111533.xyz';
var App_Key = '7iudhWquXYN0uToAuxseBFJe'
var App_ID = 'XsJ7yqBSeG6Mu9ItZBjeKmuy-MdYXbMMI'

// 判断是否在微信内
if (userAgent.indexOf("MicroMessenger") !== -1) {
	document.getElementById("wxtips").textContent = "长按图片，点击识别图中二维码/赞赏码"
	document.getElementById("alitips").textContent = "点击右上角，选择在（默认）浏览器中打开"
	document.getElementById("btctips").textContent = "点击右上角，选择在（默认）浏览器中打开"
}

// 判断是否为Android设备
else if (userAgent.indexOf("Android") !== -1) {
	document.getElementById("myLink").href = "weixin://";
	document.getElementById("wxtips").textContent = "长按图片保存本地，点击图片打开微信,点击右上角扫一扫,选择相册并选择刚才保存的图片"
	document.getElementById("alitips").textContent = "点击图片一键施舍"
	document.getElementById("btctips").textContent = "点击图片一键施舍"
}

// 判断是否为iOS设备
else if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1 || userAgent.indexOf("iPod") !== -1) {
	document.getElementById("myLink").href = "weixin://scanqrcode";
	document.getElementById("wxtips").textContent = "长按图片保存本地，点击图片打开微信,点击相册并选择刚才保存的图片"
	document.getElementById("alitips").textContent = "点击图片一键施舍"
	document.getElementById("btctips").textContent = "点击图片一键施舍"
}

// 其他设备
else {
	document.getElementById("myLink").href = window.location.href;
}

// 获取表单元素
var form = document.getElementById('myForm');

// 监听表单提交事件
form.addEventListener('submit', function (event) {
	event.preventDefault(); // 阻止表单默认提交行为

	// 获取表单字段的值
	var name = form.name.value;
	var pay = form.pay.value;
	var amount = parseFloat(form.amount.value);
	var message = form.message.value;

	// 创建一个空的对象来存储错误信息
	var errors = {};

	// 校验字段的值
	if (name === '') {
		errors.name = '请输入您的昵称';
	} else if (name.length > 100) {
		errors.name = '昵称长度不能超过100个字符';
	}

	if (pay === '') {
		errors.pay = '请选择微信或支付宝';
	}

	if (pay === 'BTC') {
		// 如果选择为 BTC，则将金额乘以 10^8 来转换为聪
		const satoshiAmount = amount * Math.pow(10, 8);
		if (isNaN(amount) || satoshiAmount < 1 || satoshiAmount > 9999999999999) {
			errors.amount = '请输入有效的施舍金额（0.00000001 - 99999.99999999 BTC）';
		}
	} else {
		if (isNaN(amount) || amount < 0.01 || amount > 9999999) {
			errors.amount = '请输入有效的施舍金额（0.01 - 9999999）';
		}
	}

	if (message.length > 500) {
		errors.message = '留言长度不能超过500个字符';
	}

	// 显示错误提示
	showErrors(errors);

	// 如果没有错误，则提交表单
	if (Object.keys(errors).length === 0) {
		submitForm();
	}
});

// 显示错误提示
function showErrors(errors) {
	// 清除之前的错误提示
	clearErrors();

	// 遍历错误对象，显示错误消息
	for (var field in errors) {
		if (errors.hasOwnProperty(field)) {
			var errorMessage = errors[field];
			var errorElement = document.createElement('div');
			errorElement.className = 'error-message';
			errorElement.textContent = errorMessage;
			form[field].classList.add('error');
			form[field].parentNode.appendChild(errorElement);
		}
	}
}

// 清除错误提示
function clearErrors() {
	var errorMessages = form.getElementsByClassName('error-message');
	var fields = form.getElementsByClassName('error');

	while (errorMessages.length > 0) {
		errorMessages[0].parentNode.removeChild(errorMessages[0]);
	}

	for (var i = 0; i < fields.length; i++) {
		fields[i].classList.remove('error');
	}
}

// 提交表单
function submitForm() {
	// 构建JSON对象
	var data = {
		name: form.name.value,
		pay: form.pay.value,
		amount: parseFloat(form.amount.value),
		message: form.message.value
	};

	// 要计算签名的数据
	const timestamp = Date.now();
	const md5data = timestamp + App_Key
	// 计算MD5签名
	const sign = CryptoJS.MD5(md5data).toString();
	// 发送POST请求
	fetch('https://' + API_BASE_URL + '/1.1/classes/yfdata', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-LC-Sign': sign + ',' + timestamp,
			'X-LC-Id': 'XsJ7yqBSeG6Mu9ItZBjeKmuy-MdYXbMMI',
		},
		body: JSON.stringify(data)
	})
		.then(function (response) {
			// 处理响应
			if (response.ok) {
				// 请求成功
				console.log('表单提交成功');
				// showModal("施舍留言成功");
				showToast("施舍留言成功", 3000);
				refreshPage(3000);
			} else {
				// 请求失败
				console.log('表单提交失败');
				// showModal("施舍留言失败");
				showToast("施舍留言失败", 3000);
			}
		})
		.catch(function (error) {
			// 处理错误
			console.log('发生错误:', error);
		});
}

function showToast(message, duration) {
	// 创建 Toast 提示框元素
	var toast = document.createElement("div");
	toast.className = "toast";
	toast.textContent = message;

	// 将 Toast 提示框添加到页面
	document.body.appendChild(toast);

	// 显示 Toast 提示框
	setTimeout(function () {
		toast.classList.add("show");
	}, 100);

	// 隐藏 Toast 提示框
	setTimeout(function () {
		toast.classList.remove("show");
		setTimeout(function () {
			toast.remove();
		}, 300);
	}, duration || 2000);
}

function refreshPage(duration) {
	// 在提示框隐藏后执行刷新操作
	setTimeout(function () {
		location.reload();
	}, duration || 300);
}

// 获取接口数据
const fetchData = async () => {
	try {
		// 要计算签名的数据
		const timestamp = Date.now();
		const md5data = timestamp + App_Key
		// 计算MD5签名
		const sign = CryptoJS.MD5(md5data).toString();
		const response = await fetch('https://' + API_BASE_URL + '/1.1/classes/yfdata?order=-createdAt', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-LC-Sign': sign + ',' + timestamp,
				'X-LC-Id': App_ID,
			}
		})
		const data = await response.json();
		renderList(data.results);
		analyzeData(data.results);
	} catch (error) {
		console.error('Error:', error);
	}
};

// 统计分析
const analyzeData = (results) => {
	const donorCount = results.length;
	const totalAmount = results.reduce((sum, item) => sum + item.amount, 0);
	const topDonor = results.reduce((max, item) => {
		if (item.amount > max.amount) {
			return item;
		} else if (item.amount === max.amount) {
			return new Date(item.createdAt) < new Date(max.createdAt) ? item : max;
		} else {
			return max;
		}
	}, results[0]);
	
	const summaryElement = document.getElementById('summary');
	summaryElement.innerHTML = `截至 ${new Date().toLocaleDateString()}，有 ${donorCount} 位大善人共布施了 ${totalAmount.toFixed(2)} 元！其中 <span class="legendary">${topDonor.name}</span> 大善人布施最多，为 ${topDonor.amount} 元!</br>Up to ${new Date().toLocaleDateString()}, ${donorCount} philanthropists have contributed a total of ${totalAmount.toFixed(2)} yuan! Among them, the top contributor, <span class="legendary">${topDonor.name}</span>, donated ${topDonor.amount} yuan.`;
	

};

// 渲染列表
const renderList = (results) => {
	const listBody = document.getElementById('listBody');

	// 清空列表内容
	listBody.innerHTML = '';

	if (results.length === 0) {
		const defaultRow = document.createElement('tr');
		const defaultCell = document.createElement('td');
		defaultCell.setAttribute('colspan', '4');
		defaultCell.classList.add('default-text');
		defaultCell.textContent = '饿饿，🍚🍚，老板，赏点🍚吧；还没有人施舍，施舍一分钱，成为榜单第一大哥';

		defaultRow.appendChild(defaultCell);
		listBody.appendChild(defaultRow);
	} else {

		// 遍历接口返回的数据并渲染列表行
		results.forEach((item) => {

			const row = document.createElement('tr');

			const nameCell = document.createElement('td');
			nameCell.textContent = item.name;
			nameCell.classList.add('deep-purple');
			nameCell.classList.add('border')
			row.appendChild(nameCell);

			const payCell = document.createElement('td');
			payCell.textContent = item.pay;
			if (item.pay === '微信') {
				payCell.classList.add('green');
				payCell.textContent += ' (CNY)';
			} else if (item.pay === '支付宝') {
				payCell.classList.add('blue');
				payCell.textContent += ' (CNY)';
			} else if (item.pay === 'BTC') {
				payCell.classList.add('bitcoin-orange');
			}
			payCell.classList.add('border');
			row.appendChild(payCell);

			const amountCell = document.createElement('td');
			let amountText = item.amount.toString(); // 将数值转换为字符串形式
			if (amountText.includes('e-')) {
				// 判断是否为科学计数法表示的小数
				amountText = parseFloat(amountText).toFixed(8); // 将科学计数法转换为常规表示形式，并保留8位小数
			}
			if (item.pay === '微信' || item.pay === '支付宝') {
				amountText = '¥ ' + amountText;
			} else if (item.pay === 'BTC') {
				amountText = '₿ ' + amountText;
			}
			amountCell.textContent = amountText;
			if (item.pay === '微信' || item.pay === '支付宝') {
				if (item.amount > 0 && item.amount <= 5) {
					amountCell.classList.add('common');
				} else if (item.amount > 5 && item.amount <= 100) {
					amountCell.classList.add('uncommon');
				} else if (item.amount > 100 && item.amount <= 200) {
					amountCell.classList.add('rare');
				} else if (item.amount > 200 && item.amount <= 500) {
					amountCell.classList.add('epic');
				} else if (item.amount > 500) {
					amountCell.classList.add('legendary');
				}
			}
			else if (item.pay === 'BTC') {
				if (item.amount > 0.00000000 && item.amount <= 0.00000005) {
					amountCell.classList.add('common');
				} else if (item.amount > 0.00000005 && item.amount <= 0.000001) {
					amountCell.classList.add('uncommon');
				} else if (item.amount > 0.000001 && item.amount <= 0.000002) {
					amountCell.classList.add('rare');
				} else if (item.amount > 0.000002 && item.amount <= 0.000005) {
					amountCell.classList.add('epic');
				} else if (item.amount > 0.000005) {
					amountCell.classList.add('legendary');
				}
			}

			amountCell.classList.add('border');
			row.appendChild(amountCell);

			const messageCell = document.createElement('td');
			messageCell.textContent = item.message;
			messageCell.classList.add('border');
			messageCell.classList.add('font-style');
			row.appendChild(messageCell);

			listBody.appendChild(row);
		});
	}
};

// 调用 fetchData 函数获取数据并渲染列表
fetchData();

// 复制btc地址
function copyAddress() {
	var address = document.querySelector('.btc-address').textContent;

	var tempInput = document.createElement('input');
	tempInput.value = address;
	document.body.appendChild(tempInput);
	tempInput.select();
	document.execCommand('copy');
	document.body.removeChild(tempInput);

	showToast("复制成功/Success", 3000)
}
