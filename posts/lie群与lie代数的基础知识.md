---
title: "Lie群与Lie代数的基础知识"
date: 2026-07-31
summary: "本文粗略地记录了一些与Lie群和Lie代数相关的基础知识."
tags: [Lie群, Lie代数]
---

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
