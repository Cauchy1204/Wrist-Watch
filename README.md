# Rise the Watch

一个iPhone端 PWA 原型，用于记录右腕疼痛症状，并在就诊前生成最近 14 天摘要。

## 技术栈

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- LocalStorage 本地存储
- 前端 mock AI 解析与提醒逻辑

## 启动

```bash
npm install
npm run dev
```

浏览器打开：

```bash
http://localhost:3000
```

建议使用浏览器移动端模拟器或 iPhone 尺寸查看。

## 页面

- `/` Dashboard 首页
- `/record` 四步症状记录流程
- `/timeline` 历史时间轴
- `/summary` 就诊总结
- `/trends` 趋势统计
- `/settings` 设置与晚间提醒

## 数据说明

所有症状记录与设置都保存在浏览器 LocalStorage 中，暂不连接真实后端。语音识别以文本框输入模拟，AI 解析以本地规则和 mock parser 实现。
