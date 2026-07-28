---
title: "Futaki不变量"
date: 2026-07-28
summary: "本文是Futaki的原始论文的阅读笔记, 基本是将Futaki的论文用笔者习惯的符号重新写了一遍."
tags: ["Futaki不变量", "KE度量"]
---

本文是Futaki在1983年发表在*Inventiones Mathematicae*上的论文*An Obstruction to the Existence of Einstein K\"ahler Metrics*的阅读笔记.(本文还没写完)

### Futaki不变量

我们设$(X,\omega)$是一个K\"ahler流形, 用$\mathbf{Ric}(\omega)$表示$\omega$的Ricci形式. 我们选取Ricci potential $F$满足
\[
\mathbf{Ric}(\omega)-\omega=\sqrt{-1}\partial\bar{\partial}F.
\]
设$\mathfrak{h}(X)$表示$X$上全体全纯向量场, 我们定义
\[
f:\mathfrak{h}(X)\to\mathbb{C},\qquad V\mapsto\int_X VF\omega^m,
\]
这里$m=\dim X$. 我们有下面的结果.

> 函数$f$不依赖于$\omega\in c_1^+(X)$的选取, 这里$c_1^+(X)$表示$X$上全体表示第一Chern类的正$(1,1)$-form.

**Proof.** 证明的想法是很简单的, 我们取两个$\omega_1,\omega_2\in c_1^+(X)$, 将它们连接起来, 即定义$\omega_t=t\omega_0+(1-t)\omega_1$, 然后证明$\frac{\mathrm{d}}{\mathrm{d}t}f_t=0$. 首先一个明显的事实是$\omega_t\in c_1^+(X)$, 这使得
\[
f_t(V)=\int_XVF_t\omega_t^m
\]
是良好定义的. 由$\partial\bar{\partial}$引理, 我们可以取$\phi_t$使得$\partial_t\omega_t=\sqrt{-1}\partial\bar{\partial}\phi_t$. 直接计算可以给出
\[
\frac{\partial \omega _{t}^{m}}{\partial t}=m\frac{\partial \omega _t}{\partial t}\land \omega _{t}^{m-1}=\Delta \phi _t\omega _{t}^{m},
\]
利用Ricci曲率在局部坐标下的表示可以写出
\[
\frac{\partial \mathbf{Ric}\omega _t}{\partial t}=-\sqrt{-1}\partial \bar{\partial}\Delta \phi _t,
\]
于是
\[
\frac{\partial}{\partial t}\left( \partial \bar{\partial}F_t \right) =\frac{\partial}{\partial t}\left( \mathbf{Ric}\omega _t-\omega _t \right) =-\sqrt{-1}\left( \partial \bar{\partial}\Delta \phi _t+\phi _t \right) ,
\]
于是我们可以取$F_t$使得
\[
\frac{\partial F_t}{\partial t}=-\Delta \phi -\phi .
\]
现在
\[
\frac{\mathrm{d}f_t}{\mathrm{d}t}=\frac{\mathrm{d}}{\mathrm{d}t}\int_X{VF_t\omega _{t}^{m}}=\int_X{\left( V\frac{\partial F_t}{\partial t}+VF_t\Delta \phi _t \right) \omega _{t}^{m}},
\]
我们只要证明被积分的部分具有散度形式即可. 事实上在局部法坐标下计算, 我们有
\begin{aligned}
V\frac{\partial F}{\partial t}+VF\Delta \phi &=V\left( -\Delta \phi -\phi \right) +VF\Delta \phi 
\\
&=V^i\partial _i\left( -g^{j\bar{k}}\phi _{j\bar{k}}-\phi \right) +V^iF_ig^{j\bar{k}}\phi _{j\bar{k}}
\\
&=V^i\left( -g^{j\bar{k}}\phi _{ij\bar{k}}-\phi _i+g^{j\bar{k}}F_i\phi _{j\bar{k}} \right) 
\\
&=V^ig^{j\bar{k}}\left( -\phi _{ij\bar{k}}-\phi _jg_{i\bar{k}}+F_i\phi _{j\bar{k}} \right) 
\\
&=V^ig^{j\bar{k}}\left( -\nabla _{\bar{k}}\phi _{ij}+R_{ij\bar{k}}^{m}\phi _m-\phi _jg_{i\bar{k}}+F_i\phi _{j\bar{k}} \right) 
\\
&=V^ig^{j\bar{k}}\left( -\nabla _{\bar{k}}\phi _{ij}+\mathbf{Ric}_{i\bar{k}}\phi _j-\phi _jg_{i\bar{k}}+F_i\phi _{j\bar{k}} \right) 
\\
&=V^ig^{j\bar{k}}\left( -\nabla _{\bar{k}}\phi _{ij}+F_{i\bar{k}}\phi _j+F_i\phi _{j\bar{k}} \right) 
\\
&=g^{j\bar{k}}\nabla _k\left( V^i\left( -\phi _{ij}+F_i\phi _j \right) \right) .
\end{aligned}
利用Stokes公式就完成了证明.$\quad\blacksquare$
