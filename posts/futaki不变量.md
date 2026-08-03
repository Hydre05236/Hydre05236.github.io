---
title: "Futaki不变量"
date: 2026-07-28
summary: "本文是Futaki的原始论文的阅读笔记, 基本是将Futaki的论文用笔者习惯的符号重新写了一遍."
tags: ["Futaki不变量", "KE度量"]
---

本文是Futaki在1983年发表在*Inventiones Mathematicae*上的论文*An Obstruction to the Existence of Einstein K\"ahler Metrics*的阅读笔记.

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

一个明显的观察是下面的结果.

> 置$\delta_X=\dim\mathfrak{h}(X)/\mathfrak{h}_0(X)$, 则$\delta_X$是一个仅依赖于$X$的几何的数, 这里$\mathfrak{h}_0(X)=\mathbf{ker}f$. 若$X$上有K\"ahler-Einstein度量, 则$\delta_X=0$.

下面我们来看$f$的一些别的性质. 我们有$f$在$\mathbf{Aut}(X)$下是不变的.

> 对任意$a\in\mathbf{Aut}(X)$和$V\in\mathfrak{h}(X)$, 成立$f(\mathbf{Ad}_aV)=f(V)$.

**Proof.** 我们把选取K\"ahler形式为$\omega$所定义出来的Futaki不变量记为$f_\omega$, 则由Futaki不变量不依赖于$\omega$的选取, 我们只要证明
\[
f_\omega(a_*X)=f_{a^*\omega}(X).
\]
而这只要做如下计算
\[
\begin{aligned}
f\left( a_*V \right) &=\int_X{\left( a_*V \right) \left( F_{\omega} \right) \omega ^m}
\\
&=\int_X{a^*\left( \left( a_*V \right) \left( F_{\omega} \right) \omega ^m \right)}
\\
&=\int_X{\left( a^*\left( a_*V \right) \left( F_{\omega} \right) \right) \left( a^*\omega \right) ^m}
\\
&=\int_X{V\left( a^*F_{\omega} \right) \left( a^*\omega \right) ^m}
\\
&=f_{a^*\omega}\left( V \right) ,
\end{aligned}
\]
其中第二个等号来自$a\in\mathbf{Aut}(X)$, 进而$\int_Xa^*\alpha=\int_X\alpha$对任意top form $\alpha$成立; 第四个等号来自$a^*(a_*X)(F)=X(a^*F)$, 最后一个等号来自$a^*\omega$的Ricci势是$a^*F_\omega$, 证毕.$\quad\blacksquare$

由此立刻得到两个推论.

> Lie代数$\mathfrak{h}(X)$的导出代数包含在$\mathfrak{h}_0(X)$中. 特别地$f$是一个Lie代数同态.

**Proof.** 我们要证明$[\mathfrak{h},\mathfrak{h}]\subseteq\mathfrak{h}_0$. 为此, 取$V,W\in\mathfrak{h}$, 考虑由$W$生成的一族单参数子群
\[
a_t=\exp(tW)\in\mathbf{Aut}(X),
\]
于是由上述定理知$f(\mathbf{Ad}_{a_t}V)=f(V)$对任意$t$都成立, 因此
\[
0=\left. \frac{\mathrm{d}}{\mathrm{d}t} \right|_{t=0}f\left( \mathbf{Ad}_{a_t}V \right) =f\left( \left. \frac{\mathrm{d}}{\mathrm{d}t} \right|_{t=0}\mathbf{Ad}_{a_t}V \right) =f\left( \left[ W,V \right] \right) ,
\]
证毕.$\quad\blacksquare$

> 若$\mathfrak{h}(X)$是半单的, 则$\delta_X=0$; 若$\delta_X=1$, 则$\mathfrak{h}(X)$包含一个$\mathbf{Aut}(X)$-不变的超平面.

**Proof.** 若$\mathfrak{h}$是半单的, 则$[\mathfrak{h},\mathfrak{h}]=\mathfrak{h}$, 从而$\mathfrak{h}\subseteq\mathfrak{h}_0$, 进而$\delta_X=0$. 当$\delta_X=1$时, 此时$\dim_{\mathbb{C}}(\mathfrak{h}/\mathfrak{h}_0)=1$, 因此$\mathfrak{h}_0$是$\mathfrak{h}$中的一个超平面. 现在对任意$a\in\mathbf{Aut}(X)$, 若$V\in\mathfrak{h}_0$, 则$f(\mathbf{Ad}_aX)=f(X)=0$, 所以$\mathbf{Ad}_aX\in\mathfrak{h}_0$, 即$\mathbf{Ad}_a\mathfrak{h}_0=\mathfrak{h}_0$, 证毕.$\quad\blacksquare$
