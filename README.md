# 食用教程：

## 克隆代码

`git clone https://github.com/yong-s/alms.git`

## 修改配置

### 替换为自己的收款码

在`images`内分别替换微信、支付宝的收款码

### 替换为自己的scheme url

支付宝替换：`qrcode`后面的值改为自己的收款码链接
`alipays://platformapi/startapp?saId=10000007&qrcode=https%3A%2F%2Fqr.alipay.com%2Ffkx17568wleuqk0ebdb8ia3`

### 替换为自己的leancloud API key

1. 没有去注册[leancloud](https://console.leancloud.app/apps)，国际版不用备案
2. 使用开发版（免费
3. 设置-应用凭证-复制`AppKey`
4. `custom.js`内修改`App_Key`为上一步复制的
5. 国际版需要使用自定义的域名，`API_BASE_URL` 改为自己的，先去设置-域名绑定

## 部署

通过GitHub pages，域名托管在cloudflare上，几块钱买一年的域名，完美搞定

# TO DO

- [ ] 实现对象存储，可以免去备案，方便微信内传播