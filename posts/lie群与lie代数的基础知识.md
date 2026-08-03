---
title: "Lie群与Lie代数的基础知识"
date: 2026-07-31
summary: "本文粗略地记录了一些与Lie群和Lie代数相关的基础知识. 我们不会给出过于具体的细节, 但大多数情况下我们会给出相当数量的例子."
tags: ["Lie群", "Lie代数"]
---

### 微分流形基础

我们来看流的概念. 设$M$是光滑流形, $V$是$M$上的光滑向量场, $\gamma:J\to M$被称为$V$的一条积分曲线, 如果$\dot{\gamma}(t)=V_{\gamma(t)},\forall t\in J$. 容易证明对任意$p\in M$, 存在唯一的一条过$p$的极大积分曲线, 我们先假设$t\in\mathbb{R}$是全局定义的. 由此我们可以定义一个群作用$\mathbb{R}\curvearrowright M$为
\[
\theta:\mathbb{R}\times M\to M,(t,p)\mapsto\theta_t(p)=\theta^{(p)}(t),
\]
其中$\theta^{(p)}$是经过$p$点处的积分曲线.

我们来看一些例子.

* 平移场$V=\partial/\partial x$, $M=\mathbb{R}^2$. 取初值$p=(a,b)$, 置
\[
\theta^{(a,b)}(t)=(x(t),y(t)),
\]
则积分曲线方程为
\[
\dot{x}(t)=1,\dot{y}(t)=0,x(0)=a,y(0)=b,
\]
解出
\[
x(t)=a+t,\quad y(t)=b.
\]
于是$\theta^{(a,b)}(t)=(a+t,b)$, 进而我们有流$\tau_t(x,y)=(x+t,y)$.

* 旋转场$V=x\frac{\partial}{\partial y}-y\frac{\partial}{\partial x}$, $M=\mathbb{R}^2$. 类似地写出积分曲线方程为
\[
\dot{x}(t)=-y(t),\dot{y}(t)=x(t),x(0)=a,y(0)=b,
\]
解出
\[
x(t)=a\cos t-b\sin t,\quad y(t)=a\sin t+b\cos t,
\]
于是我们有流
\[
\theta_t(x,y)=(x\cos t-y\sin t,x\sin t+y\cos t).
\]

* 我们来看一个不能定义全局流的例子. 令$V=x^2\frac{\partial}{\partial x}$, $M=\mathbb{R}$. 类似上面的计算将给出
\[
\theta_t(x,y)=\left(\frac{1}{1-xt},-y\right),
\]
于是我们有极大流域为$\mathcal{D}=\{(t,x)\in\mathbb{R}^2:1-tx>0\}$.

* 我们来看一个流形上的流的例子. 设$h:\mathbb{S}^2\to\mathbb{R}$, $(x,y,z)\mapsto z$是高度函数, 我们考虑$h$的梯度流. 在环境空间中我们有$\nabla h=\mathbf{e}_3=(0,0,1)$, 于是
\[
X_p=\mathrm{grad}_{\mathbb{S}^2}h=\mathbf{e}_3-\langle e_3,p\rangle p.
\]
若$p=(x,y,z)$, 则$X_p=(-xz,-yz,1-z^2)$. 于是我们要解的微分方程为
\[
\dot{x}=-yz,\dot{y}=-xz,\dot{z}=1-z^2,x(0)=a,y(0)=b,z(0)=c,
\]
解得
\[
\theta _t\left( x,y,z \right) =\left( \frac{x}{\cosh \left( t \right) +z\sinh \left( t \right)},\frac{y}{\cosh \left( t \right) +z\sinh \left( t \right)},\frac{\sinh \left( t \right) +z\cosh \left( t \right)}{\cosh \left( t \right) +z\sinh \left( t \right)} \right) .
\]

我们把一些有用的命题罗列于此.

> (积分曲线的自然性) 设$M,N$是两个光滑流形, $F:M\to N$是光滑映射, 则$X\in\Gamma(TM)$和$Y\in\Gamma(TN)$是$F$-相关的, 当且仅当$X$的积分曲线$\gamma$在$F$的复合下是$Y$的积分曲线.


### Lie群的Lie代数

设$G$是一个Lie群, 即一个光滑流形, 其上配备了一个群结构. 我们定义$G$的Lie代数$\mathbf{Lie}(G)$为$G$上的全体左不变向量场构成的Lie代数, 其上的Lie括号就是标准的向量场的Lie括号. 我们通常把$G$的Lie代数记为$\mathfrak{g}$.

我们有下面的等价刻画.

> 设$G$是一个Lie群, 定义赋值映射$\epsilon:\mathfrak{g}\to T_eG$为$X\mapsto X_e$, 则$\epsilon$是一个Lie代数的同构.

**Sketch of Proof.** 显然$\epsilon$是一个线性映射, 容易验证它是单射. 对于满射, 任取$X\in T_eG$, 我们定义(rough)向量场$X^L\mid_{g}=\mathrm{d}(L_g)_e(X)$, 可以验证这个$X^L\mid_g$是一个真正的向量场, 且是$X$在$\epsilon$下的原像.////

我们主要来看一些具体的计算例子. 在这之前, 我们先做一些抽象的讨论.

* 对于一般的Lie群: 我们将切向量写成经过单位元的曲线的速度$v=\dot{\gamma}(0),\gamma(0)=e$. 将$v$延拓成左不变向量场$v_g^L=\mathrm{d}(L_g)_e(v)$, 此时Lie括号定义为$[v,w]_\mathfrak{g}=[v^L,w^L]_e$. 由于左不变向量场的括号仍然左不变, 单位元处的值就决定了整个括号. 如果选取$T_eG$的一个基$\{e_i\}$并延拓成左不变向量场$\{E_i\}$, 计算$[E_i,E_j]=c_{ij}^kE_k$, 称$c_{ij}^k$是Lie代数的结构常数.

* 对于矩阵Lie群: 我们设$G\subseteq\mathbf{GL}(n,\mathbb{F})$. 我们写出定义$G$的矩阵方程, 并令一条经过$\mathbf{I}$的曲线$g(t)=\mathbf{I}+tA+o(t)$, 带入群的定义方程并取一阶项就得到矩阵$A$应满足的线性条件. 括号自动变为矩阵的交换子$[A,B]=AB-BA$.

下面我们来看一些具体的计算例子.

* Lie群$\mathbb{R}^n$的Lie代数就是$\mathbb{R}^n$. 这是明显的, 因为左平移$L_x(y)=x+y$的微分是恒等映射, 所以左不变向量场就是常系数向量场.

* 我们来考虑圆群$\mathbb{S}^1=\{z\in\mathbb{C}:|z|=1\}$. 我们考虑$\gamma(t)=e^{\mathrm{i}tx}$, 则$\dot{\gamma}(0)=\mathrm{i}x\in T_e\mathbb{S}^1$, 因此我们得到$\mathbf{Lie}(\mathbb{S}^1)\simeq\mathrm{i}\mathbb{R}$. 因为$\mathbb{S}^1$是交换的, 它的Lie括号是$0$.

* 我们考虑环面$\mathbb{T}^n=(\mathbb{S}^1)^n$. 我们考虑$\gamma(t):t\mapsto (e^{\mathrm{i}tx_1},\cdots,e^{\mathrm{i}tx_n})$, 于是$\dot{\gamma}(0)=(\mathrm{i}x_1,\cdots,\mathrm{i}x_n)$, 这给出了$\mathbf{Lie}(\mathbb{T}^n)\simeq\mathbb{R}^n$.

* 我们考虑一般线性群$\mathbf{GL}(n,\mathbb{R})$. 注意它由$\det(X)\ne 0$定义, 而$\det:\mathbf{Mat}(n,\mathbb{R})\to\mathbb{R}$时一个连续映射, $\mathbb{R}\setminus\{0\}$是一个开集, 因此$\mathbf{GL}(n,\mathbb{R})$是开集, 从而其切空间就是整个环境空间, 于是$\mathbf{GL}(n,\mathbb{R})$的Lie代数$\mathfrak{gl}(n,\mathbb{R})\simeq\mathbf{Mat}(n,\mathbb{R})$.

* 我们考虑特殊线性群$\mathbf{SL}(n,\mathbb{R})=\{g\in\mathbf{GL}(n,\mathbb{R}):\det(g)=1\}$. 令$g(t)=\mathbf{I}+tA+o(t)$, 由于$\det(\mathbf{I}+tA)=1+t\mathrm{tr}(A)+o(t)$, 我们有$\mathrm{tr}(A)=0$, 于是其Lie代数$\mathfrak{sl}(n,\mathbb{R})=\{A\in\mathbf{GL}(n,\mathbb{R}):\mathrm{tr}(A)=0\}$.

* 我们考虑正交群$\mathbf{O}(n)=\{Q:Q^\top Q=\mathbf{I}\}$. 令$Q(t)=\mathbf{I}+tA+o(t)$, 带入得
\[
Q(t)^{\top}Q(t)=\mathbf{I}+t(A^\top+A)+o(t),
\]
因此必须有$A^\top+A=0$. 于是$\mathfrak{so}(n)=\{A:A^\top=-A\}$. 我们指出正交群和特殊正交群$\mathbf{SO}(n)$的Lie代数是相同的.

* 我们考虑Heisenberg群
\[
\mathbf{H}=\left\{ \left( \begin{matrix}
	1&		x&		z\\
	&		1&		y\\
	&		&		1\\
\end{matrix} \right) :x,y,z\in \mathbb{R} \right\} .
\]
我们定义一条曲线
\[
\gamma :\left( -\varepsilon ,\varepsilon \right) \rightarrow \mathbf{H},\qquad t\mapsto \left( \begin{matrix}
	1&		x\left( t \right)&		z\left( t \right)\\
	&		1&		y\left( t \right)\\
	&		&		1\\
\end{matrix} \right) .
\]
对$\gamma$求导就给出
\[
\mathfrak{h} =\left\{ \left( \begin{matrix}
	&		x&		z\\
	&		&		y\\
	&		&		\\
\end{matrix} \right) :x,y,z\in \mathbb{R} \right\} .
\]

我们来看导出Lie代数的同态.

> 设$G$和$H$是Lie群, $\mathfrak{g}$和$\mathfrak{h}$是对应的Lie代数, $F:G\to H$是Lie群同态. 对任意$X\in\mathfrak{g}$, 存在唯一的向量场$F_*X\in\mathfrak{h}$与$X$是$F$-相关的. 映射$F_*:\mathfrak{g}\to\mathfrak{h}$是一个Lie代数同态.

### 指数映射

我们先来看单参数子群. 一个单参数子群是指一个Lie群同态$\gamma:\mathbb{R}\to G$, 其中$\mathbb{R}$上的运算是加法. 下面的定理给出了单参数子群的刻画.

> 设$G$是一个Lie群, $G$的单参数子群既为$G$的从原点出发的全体左不变向量场的极大积分曲线.

**Sketch of Proof.** 一方面, 设$\gamma$是一条$X\in\mathfrak{g}$定义的极大积分曲线, 则由于$X$是左不变向量场, $X$是完备的, 从而$\gamma$定义在整个$\mathbb{R}$上. 利用平移引理容易证明$\gamma$是一个群. 反之, 设$\gamma$是一个单参数子群, 令$X=\gamma_*(\mathrm{d}/\mathrm{d}t)\in\mathfrak{g}$, 则$\gamma$是$X$的极大积分曲线, 证毕.////
