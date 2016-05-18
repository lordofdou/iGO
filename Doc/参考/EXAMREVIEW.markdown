---
title: EXAM REVIEW
---
# Chapter 
## Lesson
### Section 1:XX
#### 1.
* xxx
## Seminar
## Practise
---
# Chapter 1
## Lesson
### Section 1:Linux 发展历史
#### 1.Unix历史
* 冯诺依曼体系结构：输入输出设备，CPU（运算器，控制器，内存储器），外存储
* 第一台计算机：ENIAC.1946
* UNIX分支：BSD，System
* 统一UNIX：IEEE POSIX
* FSD，GPL，GNU，
* Richard Stallman:Emacs,GCC,GDB,Copyleft
#### 2.Linux发展历史
#### 3.Linux发行版谱系
* Debian,RHEL,Slackware
### Section 2:Linux许可证和版权
#### 1.版权和许可证简绍
* 知识产权：专有性，地域性，时间性
* 公共领域
* 许可证：GPL,LGPL,BSD,Apache,MIT,Mozilla
#### 2.代码版权示例
* 链接GPL类库：静态GPL，动态证明独立性和可区分性
* linux头文件：不传染
## Seminar
## Practise
---
# Chapter 2 
## Lesson
### Section 1:VIM&&GCC
#### 1.VIM
* ^本行第一个不是空白符的字符
* g_本行最后一不是空白的字符
* :e path编辑一个文件
* :saveas path另存为
* :bn&:bp切至下一个文件或上一个文件
* :!cmd:不退出vim执行shell命令
#### 2.GCC
* -I(大写i) dir:添加头文件目录
* -L dir:添加库文件目录
* -l（小写L） libname:指定库文件
* -E:生成预编文件（.i）
* -S:生成汇编文件（.s）
* -c:生成目标文件（.o）
***库文件的生成和使用***
### Section 2:Makefile
* .PHONY:cmd
cmd:
/tab/xxx
make xxx
* 变量赋值
"="赋值
"?="检测变量是否已经有值，则不变；无则赋值
"+="给变量添加新的字段
":="覆盖赋值
* 指定文件路径vpath %.c path1/\*.c **:** path2/\*.c
* 函数：
$(wildcard \*.c path1/\*.c path2/\*.c)
$(notdir /space/$(SRC))
$(patsubst %.c,%.o,$(SRC))
* \*.o:\*c 将当前目录下的所有c文件编译成o文件，但是不能指定头文件目录;
($OBJ):%.o:%.c
/tab/gcc -o $@ -c $^ -Ipath使用自动化变量可以指定头文件目录
* 使用主makefile调用下一级makefile：
$(MAKE) -C path
$(MAKE) clean -C path
* if判断
    1.
        ifeq(arg1,arg2)
        else
        endif
    2.
        ifneq()
        ifdef arg1
        ifndef arg1
    3.
        ifdef 
        else 
        endif
***automake工具***
### Section 3:Debug Tools
#### gdb基本命令
* file name：加载测试文件
* r：运行
* b：b lineno在lineno行停止；b main在函数main停止；b lineno if xx==ii 条件成立时在lineno行停止
* d：删除断点
* s：单步执行进入函数
* n：单步执行
* p：打印变量
* c：继续指定
#### 内存错误
* 类型：使用未分配的内存，使用成功分配但未初始化的内存，使用已释放的内存，内存越界
二次释放，数组越界，内存越界，上溢，下溢
* 工具：动态catchsegv,backtrace(execinfo.h)，valgrind；
        静态splint
#### 内存泄露：分配内存没有及时释放
* 工具：动态mtrace(mcheck.h),valgrind,memcheck(memcheck.h),memleak,
* valgrind --tool=memcheck --leak-check=full ./xxx
### Section 4:Git
#### 版本控制系统
集中式：cvs，svn。工作依赖网络，网速要求高，中央服务器宕机无法工作
分布式：git。工作不依赖网络，不依赖中央服务器
#### git基本命令
git init:初始化本地仓库
git add fn:添加文件fn到版本库
git commit -m "tags":提交到版本库
git status:查看仓库状态
git diff fn:查看文件修改
git log:查看版本日志，--pretty=oneline
git reset HEAD~N:回退N个版本
git reflog:查看所有的操作
git checkout--fn:回到上一次git commit或者git add状态
git rm fn:删除文件
git branch bn:新建分支bn
git checkout bn：切换到bn分支
git branch：查看分支情况
git merge bn:合并分支bn
git branch -d bn：删除分支bn
git remote add origin git@github.com:xxx/xxx.git:关联远程库
git push (-u) origin master:推送到远程库
git reset --hard id:回滚到指定id
git clone xxx:克隆远程库到本地
## Seminar
## Practise
* 使用fork函数：父进程使用wait等待子进程结束，避免出现孤儿进程
* 快速排序：确定key的位置
* 预编译命令
#include
#define
#ifdef
#elif
#else
#endif
#ifndef
---
# Chapter 3 
## Lesson
### Section 1:认识linux shell
* bsh-->bash,csh-->tcsh,ksh-->zsh
* 查看当前shell：echo $SHELL；查看本机所有shell：cat /etc/shells
### Section 2:基本知识
* linux主要目录：/根目录；/home默认宿主目录；/etc配置文件目录；/var经常变动的文件目录如/var/log；/tmp临时文件目录；/bin或者/usr/bin命令文件目录；/sbin或者/usr/sbin系统管理员命令目录；/dev设备文件目录
* type xx查看xx命令是内建命令还是外部命令
* 程序执行的前后台切换 
xx &：xx命令在后台运行；
jobs:查看所有后台命令,-l显示进程号；
ctrl+z:挂起程序；
fg n：将编号为n的程序调至前台执行；
bg n：将标号为n的程序调至后台执行；
kill %n：结束标号为n的程序的执行
* shell配置文件访问顺序：
可登录shell:启动时先读取文件/etc/profile;接着读取/etc/bash.bashrc;然后按~/.bash_profie,~/.bash_login, ~/.profile的循序读取第一个存在文件;退出时执行～/.bash_logout；
不可登录shell:以/etc/bash.bashrc，~/.bashrc的顺序执行第一个存在的文件
### Section 3:脚本跟踪调试
* set -x:开启跟踪调试
* set +x:关闭跟踪调试
* set -n:静态检测脚本语法错误，不执行命令
* set -c:检测某一条命令的正确性
### Section 4:编程安全问题
## Seminar
## Practise
### 基本命令
* ps 
* exec:新进程替代原来进程
* eval \`xx\`:将xx作为一条shell命令执行
* shift:将命令行参数左移一位
* export xx=d:设置环境变量xx
* unset xx:删除环境变量xx
* let 'aa=bb + cc':算术运算
* alias xx='dd':设置指令dd的别名为xx
* unalias xx:取消xx别名
* mkdir -p ddd/xxx:创建多级目录
* cp -p:复制保持属性不变
* find
-name xx:
-size +-n c(byte) :
-type xx:
-user xx:
-maxdepth n:指定最大深度为n
-mindepth m:指定最小深度为m
-exec cmd {} \\;:{}表示find命令获取的结果
find /xxx:指定在目录xxx下查找
* tar
-f:指定压缩文件名，所有操作都会使用
-c:压缩
-x:解压缩
-t:查看压缩文件中的文件清单
-C:指定解压的文件夹
-z:gzip
-j:bzip2
* chown -r user:group file/directory
* ps
-u:指定用户，默认为当前终端同用户的进程
* tee:从标准输入读取在标准输出显示
-a:追加到指定文件
-i:忽略中断信号
* wc:计数
-c:byte
-m:character
-w:word
-l:line
* grep
w=dd
grep ^$w$:精确匹配$w的内容
* sort
-k:指定排序的列
-n:以数字大小进行排序
-r:逆序
* tr替换并输出到屏幕（不修改原文件）
tr [srcset] [desset] <file
$line | tr [srcset] [desset]
[:lower:]
[:upper:]
[:alpha:]
[:digit:]
* head tail
-n:显示n行
* 用户添加删除
useradd name:
userdel name:
groupadd group:
usermod -g group name:
* du -h显示当前目录及其子目录所占空间
* ping
-c n:ping n次
-w m:设超时时间为m秒
* sudo ifconfig xxx up/down:开启/关闭xxx网卡
* wget:从网络获取资源
-b:后台运行
-i:从文件获取资源url
-P:指定资源存储目录
wget xxx:下载到当前目录
* uniq去除重复行
-c:对所有行进行计数，加在行列前


### 语法
#### 赋值
等号两边没有空格
#### 数值运算
* expr:
运算符两边要有空格
乘号两侧加引号
* let:
运算符两侧不留空


#### 数组
* 初始化：name=(11 22 33)以空格进行分割
* 调用：${name[0]}
* 计算数组长度：${#name[*]}
* 修改：name[0]=sss
#### 环境变量
* $HOME:用户主目录
* $PATH:路径
#### 位置变量
* $0:脚本名
* $1-$9:脚本参数
#### 内建变量
* $?:上一个命令执行的返回值，成功为0
* $#:位置参数个数
* $$:脚本进程id
* $*:所有位置参数（作为一个字符串）
* $@:所有位置参数（多个字符串）
* $!:最后执行的后台命令的进程id
#### 条件测试
* test expression 或者[\space\expression\space\\]
* 数值比较
-eq:相等
-ne:不等
-gt:大于
-ge:大于等于
-lt:小于
-le:小于等于
* 字符串比较（最好加上双引号）
test string:测试string是否不为空
-n string:测试string是否不为空
-z string:测试string是否为空
str1\space\=\space\str2:测试两个字符串是否相等
str1\space\\!=\space\str2:测试两个字符串是否不相等
* 文件测试
-e:文件存在
-s:文件大小不为零
-f:普通文件
-d:目录文件
-b:块设备文件
-c:字符设备文件
-p:管道文件
-S:套接字文件
-L:链接文件
-r:脚本运行者可读
-x:脚本运行者可执行
-w:脚本运行者可写
* 复合测试
-a:且
-o:或
!:非
#### mknod生成特殊文件
mknod name b(block)/c(character)/p(pipe) major minor
#### 函数：
无参数
* name ()
{...}
* function name()
{...}

有参数
* function name
{...}
#### 控制结构
* if:
if expression
then
    cmd1
    cmd2
elif expression
then
    cmd3
    cmd4
else
    cmd5
fi
* case
case xx in
    aa)cmd
    ;;
    bb)cmd
    ;;
    *)cmd
    ;;
esac
[[:lower:]]字符小写
[[:upper:]]字符大写
[[:space:]]空白字符
* for:
for xx in dd
do
cmd
done
{n..m}:从n到m的整数，包含n和m
for i in *:遍历当前目录下所有文件
* until:
until expression
do
cmd
done
条件为真时结束，至少执行一次
* while:
while expression
do
cmd
done


* break;continue
#### 引号
* "":解析内部特殊字符命令
* '':不解析
* ``：作为一条命令
#### 输入输出
* echo
-n:输出不换行
-e:解析输出内容中的转义字符
* read var
-p "xxx":添加提示信息
-n m:限制输入的字符数
-s :隐藏输入的内容
read var<file:读取file文件的第一行
* cat
cat >file:从标准输入读取数据写入文件file，ctrl+d结束输入
cat >>file:追加到file文件中
-n:输出行号
* grep
-c:输出匹配的行数
-n:输出匹配的行和在文件中行号
-i:忽略大小写
-v:反查
#### 字符串处理函数
* \*:任意个字符
* ${#string}:字符串长度
* ${string:position}:从string的position开始截取字符
* ${string:positon:length}:从string的position开始截取length长度的字符串
* ${string#substring}:删除string从开头开始的符合substring的最短字符串
* ${string##substring}:删除string从开头开始的符合substring的最长字符串
* ${string%substring}:删除string结尾开始最短
* ${string%%substring}:...最长
* ${string/old/new}:将string中遇到的第一个old替换成new
* ${string//old/new}:全部替换
* ${string/#odl/new}:替换开头
* ${string/%old/new}:替换结尾
* 字符串拼接：依次书写
#### 编程实例
* 按行读取文件 
cat file|while read line
do
cmd
done
* 设置字符串输入分割符
IFS="xx"
* 查找目录下的普通文件 
ls -l dir|grep "^-"


### 正则表达式
#### 位置
* ^:字符串的开始
* $:字符串的结
* \b:字符边界
* pattern(?=xx|ii|dd):正向肯定预查，当查找到patter再验证后面的字符是否符合要求
* pattern(?!=xx|ii|dd):
#### 频率
* \*:>=0
* +:>=1
* ?:0 or 1
* {n}:=n
* {n,m}:>=n,<=m
* {n,}:>=n
* []:字符范围
* ():子表达式
#### 匹配字符（^表示非）
* .:换行符外的其他任意字符
* \s:空白字符[\f\n\r\t\v]
* \S:除空白字符外的其他字符[^\f\n\r\t\v]
* \w:字母数字下滑线[a-zA-Z0-9_]
* \W:除字母数字下划线外的字符
* \d:数字[0-9]
* \D:除数字外的字符[^0-9]
### awk（支持列操作）：awk 'pattern {action}' filename
#### 内部变量
* RS:输入记录分割符，默认回车符
* FS:输入记录的字段分隔符，默认空白符
* ORS:输出记录的分隔符
* OFS:输出记录的字段分隔符
* NR:当前记录号
* NF:当前记录含有的字段量
* ARGC:命令行参数个数
* ARGV:命令行参数数组
* $0:整条记录
* $1...$n:记录中的第一个...第n个字段
#### 自定义内部变量
* '-F:':以‘:’作为输入字段分隔符
* '-v'OFS=xx'':以‘xx’作为输出字段分隔符
#### pattern规则
* 正则表达式
* pat1,pat2指定记录范围
* BEGIN,END:只在awk开始执行和结束时执行指令
#### action语法
* if
if(expression){cmd}else{cmd}
* while
whlie(expression){cmd}
* next:跳过next后面的指令，处理下一条记录
* exit:跳转到END标签处执行
* print:简单输出print "tty:" $1
* printf:格式输出printf "tty:%d\n",$1
#### awk -f awk_file data_file
### sed（不支持列操作）:sed [option] 'command' file(s)
#### 常用选项
* -e cmd:允许执行多条命令
* -n:取消默认输出
* -f script:指定脚本
* -i:修改以读取的文档，屏幕不输出
#### 元字符集
* ^:锚定行开头
* $:锚定行结尾
* .:除换行符外的任意一个字符
* \*:匹配>=0个字符
* []:字符范围
* [^]:不在范围内的字符
* \\(..)\\:保括号内的字符,用\1,\2,\3表示
* &:保存匹配的字符
* \\<:锚定单词开头
* \\>:锚定单词结尾
* x\\{n\\}:出现n次x
* x\\{n,m\\}:x出现次数>=n,<=m
* x\\{n,\\}:x出现次数>=n
#### 基本命令
* l:列出非打印字符
sed 'l' file
* =:打当前行号
sed '=' file:打印所有行号
* p:打印模板块的行

* a\ :在当前行后面加入一行文本
* c\ :用新的文本改变当前行的文本
* i\ :在当前行上面插入文本
* d :从模板块删除行
sed 'n,md' file:删除n到m行,m如果是‘$’则代表到最后


* q:退出sed
* r file:从file中读行
* w file:写并追加到file
* !:表示后面的命令对没有选定的行发生作用

* y/abc/ABC:把字符替为另外的字符,只需要是子序列即
* s/re/str/:用str替换re
sed 's/re/str/' file:只替换遇到的第一个
sed 's/re/str/g' file:替换这行中的每一个

#### sed [option] -f sed_file files

---
# Chapter 4
## Lesson
### Section 1:创建库和使用库
#### 静态库（相关目标文件打包成的文件）
* 创建静态库：ar rsv libxx.a dd.o ss.o
* 查看静态库：ar t libxx.a
* 链接静态库：gcc ... -L/path -lxx
#### 动态库（一个目标模块）
* 创建动态库：
gcc -fPIC -c dd.c -o dd.o
gcc -shared dd.o -o libxx.so
* （隐式）链接动态库：gcc ... -L/path -lxx
* 设置动态库路径：
1.编译链接时添加选项：-Wl,-rpath=/path
2.export LD_LIBRARY_PATH=/path
3.添加路径到/etc/ld.so.conf或者添加配置文件到/etc/ld.so.d目录下
4.动态库存储到/usr/lib或/lib,ldconfig更新
#### 运行库
* 入口函数：程序的初始化和结束时的处理函数
* 程序运行步骤：
1.操作系统创建进程，控制权交个程序的入口（运行库中的某个入口函数）
2.入口函数对运行库和程序运行环境进行初始化（全局变量构造，堆，线程，开启I/O等）
3.入口函数初始化完毕后调用main函数，正式开始程序主题部分的执行
4.main函数执行结束后，返回入口函数，入口函数进行清理工作（全局变量析构，销毁堆，关闭I/O）。系统调用结束进程
### Section 2:Linux系统环境
#### 进程环境
* 进程：一个正在执行中的程序
* 进程控制块(PCB)：保存进程相关信息（进程描述信息，进程控制信息，内存管理信息，资源信息，计时信息等）
* 进程由三部分组成：程序代码，用户数据，进程控制块
* 进程状态：
宏观上三类：就绪，阻塞，执行
linux六类:R（可执行状态），S（可中断睡眠状态），D（不可中断睡眠状态），T（暂停或这跟踪状态），Z（退出状态，僵尸进程），X（退出状态，即将被销毁）
* 进程实例
进程0：linux引导中创建的第一个进程，创建进程1，完成系统加载后演变为进程调度，交换及存储管理进程
进程1：init进程，完成系统初始化，其他用户进程的祖先进程
* 操作系统负责进程管理
创建，删除，暂停，重启，调度，同步，通信
* 查看进程命令：ps,pstree,top,
#### 环境变量
* 常用环境变量
USER:当前用户的登录名称
UID:用户id
PWD:
* shell下的环境变量操作
显示：
echo $xxx
printenv xxx(不指定xxx将显示所有变量的名称和值)
env：显示当前用户所有的环境变量
set:显示当前用户的所有本地变量包括环境变量
cat /proc/<pid>/environ:查看某个进程使用的环境变量
设置
export:当前环境有效，如果要全局有效需要放在/etc/profile或者~/.profile
source:执行脚本，使其中的环境变量生效
清除
unset xxx
* C语言中操作换环境变量
获取
char *getenv(const char *name)
设置
int setenv(const char *name, const char *value, int overwrite)
清除
int unsetenv(const char *name)
* 主机名
int gethostname(char *name,size_t len);
int sethostname(const char *name,size_t len);
#### 系统调用
## Seminar

## Practise
### shell
* objdump -x|grep NEEDED:查看依赖的关系
* file xxx:查看文件类型，显示链接类型
* ldd xxx:查看动态链接的elf文件的动态库依赖关系
* gcc:默认是动态链接
* gnome-terminal -t(title) mm -x(execute) bash -c "cmd":开启标题为mm终端窗口，启动bash，执行"cmd"命令
* $$(当前进程pid);$$PPID(当前进程的父进程的pid)
* cat /proc/pid/cmline:显示pid执行的程序
### C语言
* 字符串转化数值函数 
int atoi(const char *nptr)
long atol(const char *nptr)
* 显式调用动态库
"dlfcn.h"
void *dlopen(const char *filename,int flag)RTLD_LAZY
int dlclose(void *handle)
void *dlsym(void *handle,const char *symbol)
char *dlerror(void)
链接时是使用 -ldl -rdynamic
typedef ()(*FUN)()
void *handle;
handle = dlopen("/xx/libxx.so",RTLD_LAZY);
FUN fun = (FUN)dlsym(handle,"function");
fun(...);
dlerror();
dlclose(handle);
* ASCII text文件中的数字每一位都存储在一个字符中
* linux下打开新的文件，文件描述符是从3开始的，0，1，2分别指标准输入，标准输出，标准错误输出。打开多个文件时，文件描述符按打开的顺序由3开始开始递增1，同一个文件在不关闭的情况下可以多次打开分配不同的文件描述符
* 获取文件的打开方式
ret=fcntl(f,F_GETFL,0);
ret=ret&O_ACCMODE;
* 设置读写锁
读锁：
struct flock rb;
rb.l_type=F_RDLOCK;
rb.l_whence=SEEK_SET;
rb.l_start=start;
rb.l_len=length;
rb.l_pid=pid;
写锁：
struct flock wb;
wb.l_type=F_WRLOCK;
wb.l_whence=SEEK_SET;
wb.l_start=start;
wb.l_len=length;
wb.l_pid=pid;
上锁：
fcntl(fd,F_SETLK,&f);
* 获取文件权限
struct stat st;
stat(file,&st);
//st.st_mode每一位表示一个权限，与某个特定权限相与获取布尔值
ret=st.st_mod&S_IRUSR
if(ret) printf("user can read\n");
* 修改文件权限
chmod(file,xx|dd|ss);
---
# Chapter 5
## Lesson 进程与线程
### Section 1:进程概述和管理工具
* 进程是资源分配的基本单位
* 线程是处理器调度的独立单位
* linux进程分类：
交互进程：由shell启动，前台或者后台
批处理进程：与终端无关，进程序列
守护进程：系统启动时启动，在后台运行，不在屏幕上显示信息
* 调整优先级
nice [-20~19] pro
renice [-20~19] pid
* 定时执行：at
* 空闲时执行：batch
* 周期性执行：cron和crontab
ps -l可以产看优先级NI
### Section 2:进程控制
* task_struct结构体代表PCB
* getpid(),getppid()
* 会话包含一个或者多个进程组，最多只有一个前台进程组，可以有多个后台进程组。会话由会话首进程通过setsid创建，该进程是一个进程组长，所以sid,pgid和它的pid相同。getsid
* 一个进程组包含一个或者多个进程，pgid与进程组长pid相同；pid_t getpgid(void);int setpgid(pid_t pid,pid_t pgid);
### Section 3:进程间通信
* 作用：传输数据，共享数据，通知事件，共享资源，进程控制
* 同一主机上进程通信：无名管道，有名管道，信号，信号量，消息队列，共享内存
* 不同主机进程间通信：RPC，socket
* IPC机制：
工具：消息队列，信号量，共享内存；ipcs查看
key值与id值：每个ipc工具有唯一id，访问ipc工具使用key(高8位等于id值)
ipcs与ipcrm：ipcs查看ipc工具，ipcrm删除ipc工具
### Section 4:多核多线程编程
#### 

## Seminar
## Practise
### 父进程等待退出
* pid_t wait(int *status);
status获取进程的终止状态，置为NULL不获取
成功返回子进程id，返回表示无子进程，错误返回-1
* pid_t waitpid(pid_t pid,int *status,int options);
pid>0等待pid子进程结束
pid==-1等待任意子进程结束
options为WNOHANG意为非阻塞，子进程未结束立即返回0
* 状态值status的使用
WIFEXITED(status)正常终止为真==>WEXITSTATUS(status)获取退出状态低8位
WIFSIGNALED(status)异常终止为真==>WTERMSIG(status)获取终止信号编号
* system(cmd)返回值可以作为status进行计算
### 创建进程
#### fork与vfork
* 子进程复制了父进程的信息，所以子进程中变量的改变没有对父进程中的对应变量产生影响
* vfork函数创建的子进程与父进程共享内存，所以对子进程的改变影响到了父进程；子进程需要以exit()函数退出。
* fork 父子进程的执行先后次序是不确定的可能交错执行
* vfork会先执行子进程，等子进程结束以后才执行父进程
#### clone
使用适当的clone的flag选项可以选择子进程可以使用的父进程的资源，CLONE_VM子进程父进程共享内存，CLONE_FILES共享文件描述符表，CLONE_VFORK父进程阻塞直到子进程结束
### 退出函数
exit():清空缓冲区，输出缓冲区内容
_exit():不清空，缓冲区内内容不输出
### 进程间通信
#### 无名管道
* 单工，亲缘关系进程通信
* int fd[2]; fd[0]读端，fd[1]写端
* int pipe(fd);
#### 有名管道
* int mkfifo(const char *path,mode_t mode);mkfifo("./AAA",0777);
* open("./AAA");close();read();write()
* 阻塞式读取，有名管道文件中无内容时read端等待
#### 信号
* extern int kill(pid_t pid, int sig)向pid进程发送sig信号
pid=-1所有进程发送sig
* extern in raise(int sig)给当前进程发送sig信号
* extern _sighandler_t signal(int sig,_sighandler_t handler)
* extern int pause(void):等待信号
* SIGKILL,SIGSTOP无法被忽略和捕捉
#### 消息队列
* 创建：int msgget(key_t key,int msgflg);
* 控制：extern int msgctl(int msqid,int cmd,struct msqid_qs *buf);(cmd:IPC_RMID,IPC_SET,IPC_STAT,IPC_INFO)
* 发送：extern int msgsnd(int msqid,const void* msp,size_t msgz,int msgflg);
* 接收：extern int msgrcv(int msqid,const void* msp,size_t msgz, long msgtype,int msgflg);
* 定义数据包
struct msg_st
{
    long int msgtype;
    char text[SIZE];
}

#### 信号量
* extern int semget(key_t key,int nsems,ing semflg);
* extern int semctl(key_t key,int semnum,int cmd,union  semun);
* extern int semop(int semid,struct sembuf *sops,size_t nsops);
#### 共享内存
* extern int shmget(key_t key,size_t size,int shmflg);
* extern int shmctl(key_t key,int cmd,struct shmid_ds* buf);
* extern void *shmat(int shmid,const void *shmaddr,ing shmflg);
* extern int shmdt(void *shmaddr);
### 线程
#### 创建与退出
* int pthread_create(pthread_t *thread,const pthread_attr_t *attr,void *(*routine)(void\*),void *arg);
* int pthread_join(pthread thread,void **retval);
* void pthread_exit(void *retval);
* void pthread_cancel(pthread thread);
#### 属性设置
* 初始化和销毁 
pthread_attr_t attr;
pthread_attr_init(pthread_attr_t *attr);
pthread_attr_destroy(pthread_attr_t *attr);
* 分离属性
pthread_attr_setdetachstate(pthread_attr_t *attr,PTHREAD_CREATE_DETACHED)
* 取消属性
在子线程里设置，pthread_setcancelstate(PTHREAD_CANCEL_ENABLE,NULL)
### 同步
* 互斥锁
pthread_mutex_init(pthread_mutex_t *mutex,const pthread_mutexattr_t *attr);
pthread_mutex_destroy(pthread_mutex_t *mutex);
pthread_mutex_lock(pthread_mutex_t *mutex);
pthread_mutex_unlock(pthread_mutex_t *mutex);
使用互斥锁要将所有的互斥代码段放在锁之间，条件判断的步骤也要放进去
* 条件变量
pthread_cond_init(pthread_cond_t *cond,pthread_condattr *attr);
pthread_cond_destroy(pthread_cond_t *cond);
pthread_cond_wait(pthread_cond_t *cond,pthread_mutex_t *mutex);
pthread_cond_signal(pthread_cond *cond);
* 读写锁
pthread_rwlock_init(pthread_rwlock_t *rwlock,pthread_rwlockattr *attr);
pthread_rwlock_destroy(pthread_rwlock_t *rwlock);
pthread_rwlock_rdlock(pthread_rwlock_t *rwlock);
pthread_rwlock_wrlock(pthread_rwlock_t *rwlock);
pthread_rwlock_unlock(pthread_rwlock_t *rwlock);
* 自旋锁
---
# Chapter 6
## Lesson
### Section 1:文件管理编程
#### 虚拟文件系统（vfs）
* 支持三类文件系统：基于磁盘的文件系统，网络文件系统，特殊文件系统
#### 口令文件
struct passwd* getpwnam(const char *name);
struct passwd\* getpwuid(uid_t uid);
#### 组文件
struct group\* getgrname(const char\* name);
struct group\* getgrgid(const char\* gid);
## Seminar
## Practise
### 文件多路输入输出
* int select(int numfds,fd_set *readfds,fd_set *writefds,fd_set *exceptfds,strcut timeval *timeout)
* 宏：
添加FD_SET(int fd,fd_set*)
删除FD_CLR(int fd,fd_set*)
清空FD_ZERO(fd_set*)
检测FD_ISSET(int fd,fd_set*)
### 文件内存映射
申请：void *mmap(void *addr,size_t len,int prot,int flags,int fd,off_t offset)
撤销：int munmap(void *addr,size_t len)
同步：int msync(void *addr,size_t len,int flags)
### 内存锁定
int mlock(void *addr,size_t len)
int munlock(void *addr,size_t len)
int mlockall(int flags)
int munlockall(void)
### 文件锁定
在open函数中使用O_CREAT|O_EXCL创建一个锁文件，用unlink(file)删除
### 目录编程
* 获取当前工作目录：void *getcwd(char *buf,size_t len)
buf=NULL,len=0时自动分配空间并且返回地址，结束时要使用free()释放空间
* 改变工作目录：int chdir(const char*path);
* 改变根目录：int chroot(const char*path);
* 创建目录：int mkdir(const char *path,mode_t mode);
* 删除空目录：int rmdir(const char *path);
* 设置umask值：mode_t umask(mode_t mask);
* 读取目录内容
创建目录流：DIR \*opendir(const char* path);
读取目录：struct dirent* readdir(DIR* dir);
char d_name[256]文件名，unsigned char d_type文件类型
关闭文件流：int close(DIR *dir);
* 重命名：rename("old","new");
* 删除文件：remove(file);
* 修改文件atime和mtime当前时间：utime(file,NULL);
* strstr(string,substr)返回substr在string的其实下标
### 函数
* qsort
void qsort(void *base,size_t nmemb, size_t size, int (*cmp)(const void *,const void *));
int cmp(const void *a,const void *b)
{return \*(int \*)a > \*(int\*)b;}
{return strncmp(\*(char \*\*)a,\*(char\*\*)b);}
* strtok(char *string ,const char *delim);
第一次调用传入string,第二设置为NULL
---
# Chapter 7
## Lesson
### Section 1:
#### 1.
* xxx
## Seminar
## Practise
### tcp
* 服务器
#include<sys/socket.h>
#include<netinet/in.h>
#include<arpa/inet.h>
#include<string.h>
#define PORT xxxx
#define BACKLOG dd
#define N ee
int serfd;
struct sockaddr_in seraddr;
char buff[N];
int clifd;
struct sockaddr_in cliaddr;
int len;

serfd = socket(AF_INET,SOCK_STREAM,0);

bzero(&seraddr,sizeof(seraddr));
seraddr.sin_family = AF_INET;
seraddr.sin_addr.s_addr = htonl(INADDR_ANY);
seraddr.sin_port = htons(PORT);

bind(serfd,(struct sockaddr*)&seraddr,sizeof(seraddr));

listen(serfd,BACKLOG);

clifd = accept(serfd,(struct sockaddr*)&cliaddr,&len);

recv(clifd,buff,N,0);

send(clifd,buff,N,0);

close(serfd);


* 客户端
#include<sys/socket.h>
#include<netinet/in.h>
#include<arpa/inet.h>
#include<string.h>
#define PORT xxxx
#define N ee
int clifd;
struct sockaddr_in seraddr;
char buff[N];

clifd = socket(AF_INET,SOCK_STREAM,0);

bzero(&seraddr,sizeof(seraddr));
seraddr.sin_family = AF_INET;
seraddr.sin_addr.s_addr = htonl(xx);
seraddr.sin_port = htons(PORT);

connect = (clifd,(struct sockaddr*)&seraddr,sizeof(seraddr));

send(clifd,buff,N,0);

recv(clifd,buff,N,0);

close(clifd);
### udp
服务器：
#include<sys/socket.h>
#include<netinet/in.h>
#include<arpa/inet.h>
#include<string.h>
#define PORT xxxx
#define BACKLOG dd
#define N ee
int serfd;
struct sockaddr_in seraddr;
char buff[N];
struct sockaddr_in cliaddr;
int len;

serfd = socket(AF_INET,SOCK_DGRAM,0);

bzero(&seraddr,sizeof(seraddr));
seraddr.sin_family = AF_INET;
seraddr.sin_addr.s_addr = htonl(INADDR_ANY);
seraddr.sin_port = htons(PORT);

bind(serfd,(struct sockaddr*)&seraddr,sizeof(seraddr));
**len = sizeof(cliaddr)**
recvfrom(serfd,buff,N,0,(struct sockaddr*)&cliaddr,&len);

sendto(serfd,buff,N,0,(struct sockaddr*)&cliaddr,len);

close(serfd);
客户端
#include<sys/socket.h>
#include<netinet/in.h>
#include<arpa/inet.h>
#include<string.h>
#define PORT xxxx
#define N ee
int clifd;
struct sockaddr_in seraddr;
char buff[N];

clifd = socket(AF_INET,SOCK_DGREAM,0);

bzero(&seraddr,sizeof(seraddr));
seraddr.sin_family = AF_INET;
seraddr.sin_addr.s_addr = inet_addr(xx);
seraddr.sin_port = htons(PORT);

sendto(clifd,buff,N,0,(struct sockaddr*)&seraddr,sizeof(seraddr));

recvfrom(clifd,buff,N,0,NULL,NULL);

close(clifd);

### 转化函数
* 字节序:htons,htonl,ntohs,ntols
* ip地址:int inet_aton(const char *cp,struct in_addr *inp);
char *inet_ntoa(struct in_addr in);
int inet_addr(const char *cp);
---
# Chapter 8
## Lesson
### Section 1:HTML5
#### 目的：
* 减少互联网富应用对于flash,sliverlight,javaFX的依赖，提供更多网络应用API
#### 新特性：
* 语义
新标签：
表单控件：文本类型
微数据：<mete .../>
* 离线存储
web stotage:localStorage(持久化存储);sessionStorage(会话结束销毁)；少量数据存储
indexed datebase:json对象；大量数据存储
application cache:客户端与web程序服务器无连接，客户端也能正常使用
* 设备通用
DRAG&DROP:
File API:
* 连接
websocket:
notifications:
* 多媒体
audio:
video:
* 三维，图形特效
canvas:在javascript中完成绘制
webGL:通过html脚本实现交互三维动画；利用底层的图形硬件加速渲染（openGL接口）
* 性能与集成
XMLHttpRequest2
* CSS3:选择器，颜色，分栏，边框，文本，渐变，图像或文字变形转化
### Section 2:CSS3

### Section 3:javascript
#### 特性
* 简单，安全，动态，跨平台
* 变量可重复声明
#### 语法
* 数组
var a = new Array("a","b","c");
a.join()
a.sort()
a.reverse()
a.toString()
* 字符串使用
s.toUpperCase()
s.split("x")
s.substring(n,m)
#### API
* onclick="":设置点击事件
* alert('xx'):弹窗显示"xx"
* docment.write("xx"):将"xx"显示到网页上
* Number():转化为数字
#### DOM
控制对象：所有HTML元素，HTML属性，CSS样式，在所有时间做出反应
#### node.js
单线程，异步式I/O，事件驱动，提高开发效率

## Seminar
## Practise
### html5基本框架
        <DOCTYPE html5>
        <head>
            <link href="url" type="text/css" rel="stylesheet" >
            <style type="text/css">
            </style>
            
            <script src="xxx.js"></script>
            <script type="text/javascript">
            </script>
            
        
        </head>
        <body>
            <header>
            </header>
            
            <nav>
            </nav>
            
            <article>
            </article>
            
            <aside>
            </aside>
            
            <footer>
            </footer>
        </body>
---
# Chapter 9
## Lesson
### Section 1
#### 文件
* AndroidManifest.xml:描述程序的activity,service,content provider,intent接收器
* 资源文件
#### 组件
acticity:onCreate(),onDestroy();onStart(),onStop();onResume(),onPause()
service:启动的（无交互，与其他组件无关联）；绑定的（可以与其他组件交互）
broadcast receiver:接收响应通知
content provider:程序间数据交互
## Seminar
## Practise

