# nuxt3 deploy

# 复制
mkdir -p .output/.github/workflows
cp deploy.yml .output/.github/workflows/

# 进入构建输出目录
cd .output

# 初始化Git仓库
git init

# 添加所有文件到Git暂存区
git add -A

# 提交更改
git commit -m 'deploy'

# 添加远程仓库
git remote add origin https://github.com/JoryJoestar/textgame-build.git

# 可选：推送到远程仓库（如果需要）
git push -f origin main

git ls-remote --tags

# 提示用户输入版本号
echo "请输入版本号（格式如 v0.1.0）："
read version

# 创建 Git 标签
git tag $version

# 推送标签到远程仓库
git push origin $version
