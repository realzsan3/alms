> 史诗级更新2.0版本，1.0版本不建议食用，leancloud 2027年将不再提供服务，尽早迁移到cf上，享受全新服务 

# 🧧 打赏页

> 红包引流 + 打赏收款 + 留言榜单，部署在 Cloudflare 全家桶，零成本。

## 技术栈

| 模块 | 方案 |
|------|------|
| 前端托管 | Cloudflare Pages |
| API | Cloudflare Workers |
| 数据库 | Cloudflare D1（SQLite） |
| 图片存储 | Cloudflare R2（红包二维码） |
| 人机验证 | Cloudflare Turnstile |

## 目录结构

```
├── index.html      前端页面（单文件）
├── worker.js       CF Worker API
├── wrangler.toml   Worker 配置
├── schema.sql      D1 数据库初始化
└── .dev.vars       本地环境变量（不提交 git）
```

## 快速开始

### 1. 安装依赖

```bash∏
npm install -g wrangler
wrangler login
```

### 2. 创建 D1 数据库

```bash
wrangler d1 create donation-db
# 把输出的 database_id 填入 wrangler.toml
```

### 3. 初始化表结构

```bash
# 本地
wrangler d1 execute donation-db --local --file=schema.sql

# 线上
wrangler d1 execute donation-db --remote --file=schema.sql
```

### 4. 配置环境变量

本地新建 `.dev.vars`：

```
TURNSTILE_SECRET=1x0000000000000000000000000000000BB
ADMIN_KEY=local-test-key
ALLOWED_ORIGIN=http://localhost:8788
```

线上：

```bash
wrangler secret put TURNSTILE_SECRET
wrangler secret put ADMIN_KEY
wrangler secret put ALLOWED_ORIGIN   # 支持逗号分隔多个域名
```

### 5. 本地调试

```bash
wrangler dev --local        # 启动 Worker（:8787）
python3 -m http.server 8788 # 启动前端（:8788）
```

### 6. 部署

```bash
wrangler deploy
# 把 index.html 推到 CF Pages
```

## 配置说明

所有配置集中在 `index.html` 顶部的 `CONFIG` 对象：

```js
CONFIG = {
  apiBase: '',        // Worker URL
  pay: {
    wechat:  { qr: 'base64...', appLink: 'weixin://' },
    alipay:  { qr: 'base64...', appLink: 'alipays://...' },
    btc:     { qr: 'base64...', address: 'bc1q...' },
  },
  hongbaos: [         // 红包列表，支持任意数量
    { platform, desc, icon, color, bg, qr, qrHint, appLink, appLabel }
  ],
  seed: [],           // 打赏榜预置数据
}
```

**收款码**（固定）→ 转成 base64 填入 `CONFIG.pay`

**红包二维码**（常换）→ 上传到 CF R2，填 R2 公开 URL，换图直接覆盖文件无需重新部署

## 留言审核

```bash
# 查看待审核
curl https://your-worker.workers.dev/api/admin/pending \
  -H "Admin-Key: YOUR_ADMIN_KEY"

# 审核通过
curl -X POST https://your-worker.workers.dev/api/admin/approve \
  -H "Admin-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'

# 审核拒绝
curl -X POST https://your-worker.workers.dev/api/admin/reject \
  -H "Admin-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'

# 删除记录
curl -X POST https://your-worker.workers.dev/api/admin/delete \
  -H "Admin-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

手机端推荐用 **Apidog** 保存以上请求，一键操作。

## License

MIT

## Star History

<a href="https://www.star-history.com/#realzsan3/alms&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=realzsan3/alms&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=realzsan3/alms&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=realzsan3/alms&type=Date" />
 </picture>
</a>