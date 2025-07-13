# 7X24小时在线要饭🍚，欢迎👏各位老板打赏，打赏一分也是爱
### 布施随缘，福田自来 🙏 扫码支持顺便领红包。Scan to tip & get a food coupon.

1. 纯原生js手撸，无任何框架
2. 不用数据库，不用部署服务器上
3. 零成本，网站部署CF，CF托管加速，数据托管在`leancloud`
4. 移动端交互体验超棒，一键打赏，免去app来回切换
5. 微信内分享打赏更方便，长按即可（需域名备案
6. 增加红包页面，建议使用领红包代替打赏（站着要饭，不是）
7. 添加社交分享 Open Graph /SEO优化(借助ChatGPT 优化，顺便生成了一张[分享图](https://111533.xyz/images/og-image.jpg)大家看看这图生成的怎么样？我要吹爆了🫡 AI 越来越强了)

# 食用场景

文章最后加赞赏，Blog打赏页面

# 食用教程：

## 克隆代码

`git clone https://github.com/realzsan3/alms.git`

## 修改配置

### 替换为自己的收款码

在`images`内分别替换微信、支付宝的收款码

### 替换为自己的scheme url

支付宝替换：`qrcode`后面的值改为自己的收款码链接

`alipays://platformapi/startapp?saId=10000007&qrcode=https%3A%2F%2Fqr.alipay.com%2xxxoooxxxxooooia3`

### 替换为自己的leancloud API key

1. 没有去注册[leancloud](https://console.leancloud.app/apps)，国际版不用备案
2. 使用开发版（免费
3. 设置-应用凭证-复制`AppKey`
4. `custom.js`内修改`App_Key`为上一步复制的
5. 国际版需要使用自定义的域名，`API_BASE_URL` 改为自己的，先去`设置-域名绑定`

### img to base64

- 自己本地转换python

```python
import base64

def image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        # output to base64
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    # output to html img   
    return f'<img src="data:image/jpeg;base64,{encoded_string}" alt="图片描述">'
    # output to css
    # return f'.image {{ background-image: url("data:image/jpeg;base64,{encoded_string}"); }}'


# 替换为你的图像文件路径
image_path = "/Users/Downloads/btc.png"
html_img_tag = image_to_base64(image_path)
print(html_img_tag)
with open("base642image", "w") as base64img:
    base64img.write(html_img_tag)
```

- 在线转换
  
  [Image to Base64 | Base64 Encode | Base64 Converter | Base64](https://base64.guru/converter/encode/image)

## 部署

### 推荐[cloudflare-page](https://dash.cloudflare.com/)

域名、网页全托管，妈妈再也不担心我的网页速度和安全了

真 * 慈善家

### GitHub pages等服务器

通过GitHub pages，域名托管在cloudflare上，几块钱买一年的域名，完美搞定

### 对象存储

优点：免去域名备案，微信内直接打开，腾讯云cos按量计费
缺点：🈚️，要说有，就是不知道这个口子啥时候会被关了

1. 去腾讯☁️后台，找到对象存储，新建存储桶，基础配置，静态网站打开
2. 上传`index.html` `assets` `images`
3. 直接访问给的域名即可

# TO DO

- [x] 实现对象存储，可以免去备案，方便微信内分享
- [x] 国际化，中英文显示
- [ ] ~~支持国际（PayPal）收款，开启全世界要饭模式🤣~~
- [x] 支持加密货币收款₿

# 感谢

1. 模版来自[HTML5 UP](html5up.net)
2. [部分灵感参考](https://github.com/DomeenoH/Hexo-Donate)
3. [donate](https://blog.dominoh.com/donate)
4. 感谢ChatGPT🙏，纯原生js，通过GPT辅助完成✅
5. 感谢Midjourney🙏提供背景图片
6. [favicon](https://favicon.io/emoji-favicons/bowl-with-spoon/)提供favicon支持


# Star History

<a href="https://www.star-history.com/#realzsan3/alms&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=realzsan3/alms&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=realzsan3/alms&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=realzsan3/alms&type=Date" />
 </picture>
</a>