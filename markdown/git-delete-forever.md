# Git永久删除文件(包含历史记录)

1. 从资料库中清除文件

    ```
    git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch __path-to-your-remove-file__' --prune-empty --tag-name-filter cat -- --all
    ```

    如果要删除的是目录，则在'git rm --cached'后面添加-r命令

2. ```git push origin mater --force --all```
3. 清理和回收空间
    ```
    rm -rf .git/refs/original/
    git reflog expire --expire=now --all 
    git gc --prune=now
    git gc --aggressive --prune=now
    ```

> 1. <https://www.cnblogs.com/shines77/p/3460274.html>
> 2. <https://help.github.com/articles/removing-sensitive-data-from-a-repository/>