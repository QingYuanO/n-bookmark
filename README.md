## BookmarkOcean
快速将你的书签转换为导航站

<img width="780" alt="BookmarkOcean" src="https://github.com/user-attachments/assets/16ede6fb-4912-4935-abc9-cced8e4b237f">

## 准备 bookmark.json
[点击此处](https://t.bookmarkocean.site/)，根据指引下载 bookmark.json 文件。让后进入```/src/data/bookmark.json```目录，点击又上角<img width="16" alt="编辑按钮" src="https://github.com/user-attachments/assets/bffb2187-554e-44bf-884f-f33d06be9dca">按钮，进入编辑状态。
然后打开下载的bookmark.json 文件，复制内容进```src/data/bookmark.json```。

## Deploy
点击右上角按钮<img width="60" alt="fork按钮" src="https://github.com/user-attachments/assets/dd30cfd0-acf6-4e4a-acf2-2cba10440b10">fork 项目，并部署至 Vercel、Cloudflare、GithubPage
### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/QingYuanO/n-bookmark)
### Cloudflare
如果你还没有 Cloudflare 账号，[前往注册](https://www.cloudflare.com/zh-cn/)。
有了账号后进入控制台，选择```Workers 和 Pages```，点击右上角创建项目，进入：

<img width="560" alt="创建 Pages 项目" src="https://github.com/user-attachments/assets/b1ed60d7-214c-411d-879d-be9a079e7c71">

选择 Pages并点击```连接到 Git```，选择 fork 的项目，等待项目自动部署。
### GithubPage
- Fork 此项目后，点击<img width="87" alt="Action" src="https://github.com/user-attachments/assets/a63b0028-0e85-4adf-bfbb-0d39334d787b">进入 Action页面。
- 点击左侧```Deploy Next.js site to Pages```，然后点击右侧的```Run workflow```按钮，随后项目进人打包中。
- 打包完成后会自动生成一个基于github账号域名的子域名，点击进入即可看到网站。
- 进入```Settings/Pages```页面，也可以看到打包完成后的域名。


## License
[MIT](https://choosealicense.com/licenses/mit/)



