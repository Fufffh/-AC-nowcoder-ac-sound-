# 牛客AC音效（NowCoder AC Sound）

一个篡改猴（Tampermonkey）脚本，用于 **替换 / 关闭** 牛客竞赛 AC 通过提示音。

---

## ✨ 功能

- 替换牛客 AC 提示音为自定义音效（本地 base64）
- 一键静音（关闭 AC 提示音）
- 一键恢复原音效
- 支持代码内切换模式（replace / mute / off）

---

## 📥 安装

点击安装脚本：

👉 **[点击安装脚本](https://raw.githubusercontent.com/Fufffh/-AC-nowcoder-ac-sound-/main/src/nowcoder-ac-sound.user.js)**

安装完成后，打开篡改猴管理面板，确保脚本已启用。

---

## 🌐 支持页面

- https://ac.nowcoder.com/*

---

## ⚙️ 使用方法

打开篡改猴脚本编辑界面，在脚本中找到配置区：

```js
// ========= 配置区===================
const MODE = "replace"; // "replace" | "mute" | "off"

// 这里存放要替换音频的BASE64
const MY_SOUND_B64 = '' 

const COOLDOWN_MS = 800; // 防止重复触发把音效打断
// ===================================
```

---

## 🎛 MODE 模式说明

| MODE 值 | 含义 |
|--------|------|
| `replace` | 替换牛客 AC 音效为自定义音效 |
| `mute` | 静音（关闭牛客 AC 音效） |
| `off` | 不拦截（恢复牛客原音效） |

---

### 示例：关闭音效

```js
const MODE = "mute";
```

---

### 示例：恢复原音效

```js
const MODE = "off";
```

---

### 示例：启用替换音效

```js
const MODE = "replace";
```

---

## 🎵 替换音效（base64）

本脚本通过 base64 存储本地音频数据，你需要把音频文件转换成 base64，然后填入：

```js
const MY_SOUND_B64 = '...'
```

⚠ 注意事项：

- `MY_SOUND_B64` 里只放 **纯 base64**
- 不要带 `data:audio/xxx;base64,` 前缀
- base64 必须完整，否则可能出现 **只播放 1 秒** 或 **无法播放**
- 推荐使用 `ogg` 或 `mp3` 格式，兼容性较好

---

## 🐍 Python 转 base64（推荐）

将下面代码复制到 Python 运行：

```python
import base64, pathlib

p = pathlib.Path(r"")  # ← 改成你的文件
data = base64.b64encode(p.read_bytes()).decode("ascii")
print(data)
```

运行后会输出一段很长的 base64 字符串，把它复制出来粘贴进脚本：

```js
const MY_SOUND_B64 = '这里粘贴base64'
```

---

## 🔧 音效格式说明（MIME）

如果你要扩展脚本（比如改成 mp3/wav），常见音频格式对应 MIME 如下：

- MP3：`audio/mpeg`
- WAV：`audio/wav`
- OGG：`audio/ogg`
- AAC：`audio/aac`
- M4A：`audio/mp4`

---

## ❓ 常见问题

### 1. 为什么只播放 1 秒？

原因通常是 base64 复制不完整或被截断。  
请重新生成 base64 并完整复制。

---

### 2. 为什么没有声音？

可能原因：

- 浏览器限制自动播放（建议先在页面任意位置点一下再 AC）
- base64 内容为空
- 音频格式不兼容

---

### 3. 为什么音效会被打断？

脚本设置了防抖时间：

```js
const COOLDOWN_MS = 800;
```

如果牛客触发多次 play 导致重置，你可以调大：

```js
const COOLDOWN_MS = 1500;
```

---

## 📜 License

MIT License
