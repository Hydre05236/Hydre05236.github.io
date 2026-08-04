---
title: "PSH函数的磨光性质及其应用"
date: 2026-08-03
summary: "本文介绍PSH函数的磨光性质, 然后给出它的一些重要应用. 本文的大部分内容循Demailly的讲义, 但补充了大量细节."
tags: ["多重位势论", "PSH函数"]
---

### PSH函数的磨光性质

我们先来看下面的一个结果.

> 设$u\in\mathbf{PSH}(\Omega)$, 且$u$在$\Omega$的每个连通分支内都不恒为$-\infty$. 设$\{\rho_\varepsilon\}$是一列磨光核, 则$u\star\rho_\varepsilon:=u_\varepsilon\in C^\infty\cap\mathbf{PSH}(\Omega_\varepsilon)$, 其中\[\Omega_\varepsilon=\{x\in\Omega:d(x,\partial\Omega)>\varepsilon\}.\] 进一步, $u_\varepsilon$关于$\varepsilon\to 0$单调减, 且$u_\varepsilon\to u$.

**Proof.** 很容易证明$u_\varepsilon\in\mathbf{PSH}(\Omega_\varepsilon)$, 下面我们仅来证明单调的部分. 让我们先来约定一些记号. 由磨光核的定义, 我们可以设$\varrho(t)=\rho(t\zeta)$, 这里$|\zeta|=1$. 注意到
\[
\begin{aligned}
1=&\int_{B\left( 0,1 \right)}{\rho \left( \zeta \right) \mathrm{d}\mathcal{L} \left( \zeta \right)}
\\
=&\int_0^1{\mathrm{d}t\int_{\mathbb{S} ^{2n-1}}{\rho \left( t\zeta \right) t^{2n-1}\mathrm{d}\sigma \left( \zeta \right)}}
\\
=&\left| \mathbb{S} ^{2n-1} \right|\int_0^1{\varrho \left( t \right) t^{2n-1}\mathrm{d}t},
\end{aligned}
\]
于是我们可以定义概率测度
\[
\mathrm{d}\nu \left( t \right) =\left| \mathbb{S} ^{2n-1} \right|\varrho \left( t \right) t^{2n-1}\mathrm{d}t.
\]
下面我们做计算
\[
\begin{aligned}
u_{\varepsilon}\left( z \right) &=\int_{\mathbb{C} ^n}{u\left( z-y \right) \rho _{\varepsilon}\left( y \right) \mathrm{d}\mathcal{L} \left( y \right)}
\\
&=\int_{B\left( 0,1 \right)}{u\left( z-\varepsilon w \right) \rho \left( w \right) \mathrm{d}\mathcal{L} \left( w \right)}
\\
&=\int_0^1{\mathrm{d}t\int_{\mathbb{S} ^{2n-1}}{u\left( z-\varepsilon t\zeta \right) \rho \left( t\zeta \right) t^{2n-1}\mathrm{d}\sigma \left( \zeta \right)}}
\\
&=\int_0^1{\varrho \left( t \right) t^{2n-1}\mathrm{d}t\int_{\mathbb{S} ^{2n-1}}{u\left( z-\varepsilon t\zeta \right) \mathrm{d}\sigma \left( \zeta \right)}}
\\
&=\int_0^1{\left| \mathbb{S} ^{2n-1} \right|\varrho \left( t \right) t^{2n-1}\mathrm{d}t\int_{\mathbb{S} ^{2n-1}}{u\left( z-\varepsilon t\zeta \right) \mathrm{d}\mu \left( \zeta \right)}}
\\
&=\int_0^1{M_u\left( z,\varepsilon t \right) \mathrm{d}\nu \left( t \right)},
\end{aligned}
\]
这里$\mu$是球面上的归一化测度, 
\[
M_u\left( a,r \right) =\int_{\mathbb{S} ^{2n-1}}{u\left( a+r\zeta \right) \mathrm{d}\mu \left( \zeta \right)}
\]
是归一化测度下的球面平均. 我们知道(后面会证明)函数$r\mapsto M_u(a,r)$是单调不减的, 因此$u_\varepsilon$自然也是单调不减的, 这就证明了单调性.////

上面我们用到了$M_v(a,r)$关于$r$的单调性, 我们现在来详细讨论这一部分. 我们先来证明一个标准的引理.

> 设$v$是圆盘$B(0,R)$上的次调和函数. 定义\[m_v(r)=\frac{1}{2\pi}\int_0^{2\pi}v(re^{\mathrm{i}\theta})\mathrm{d}\theta,\quad0<r<R.\]则$m_v(r)$是$r$的单调不减函数.

**Proof.** 设$0<r<s<R$. 我们考察函数$\theta\mapsto v(se^{\mathrm{i}\theta})$, 这是一族圆周上的上半连续函数. 我们可以用一列单调递减的连续函数从上方逼近它, 具体地我们取$\phi_j(se^{\mathrm{i}\theta})\downarrow v(se^{\mathrm{i}\theta})$. 置$\mathcal{P}_j$是圆盘$B(0,s)$上以$\phi_j$作为边值的Possion积分, 于是$\mathcal{P}_j$在$B(0,s)$内调和, 在闭l圆盘内连续, 并且在边界上成立$v\le\phi_j=\mathcal{P}_j$. 由极大值原理我们有$v\le\phi_j$在整个圆盘上成立. 于是
\[
m_v\left( r \right) \le \frac{1}{2\pi}\int_0^{2\pi}{\mathcal{P} _j\left( re^{\mathrm{i}\theta} \right) \mathrm{d}\theta}=\mathcal{P} _j\left( 0 \right) =\frac{1}{2\pi}\int_0^{2\pi}{\phi _j\left( se^{\mathrm{i}\theta} \right) \mathrm{d}\theta}.
\]
令$j\to\infty$即得结论.////

下面我们来证明先前略去的部分. 我们先把结果陈述如下.

> 设$u\in\mathbf{PSH}(\Omega)$, $\bar{B}(a,R)\subseteq\Omega$. 记$\mathrm{d}\mu$为球面$\mathbb{S}^{2n-1}$上的归一化面积测度, 定义$M_u(a,r)$同上, 则$r\mapsto M_u(a,r)$单调不减.

**Proof.** 我们只要注意到
\[
\begin{aligned}
\int_{\mathbb{S} ^{2n-1}}{m_{\omega}\left( r \right) \mathrm{d}\mu \left( \omega \right)}&=\int_{\mathbb{S} ^{2n-1}}{\frac{1}{2\pi}\int_0^{2\pi}{u\left( a+re^{\mathrm{i}\theta}\omega \right) \mathrm{d}\theta}\mathrm{d}\mu \left( \omega \right)}
\\
&=\frac{1}{2\pi}\int_0^{2\pi}{\mathrm{d}\theta \int_{\mathbb{S} ^{2n-1}}{u\left( a+re^{\mathrm{i}\theta}\omega \right) \mathrm{d}\mu \left( \omega \right)}}
\\
&=\int_{\mathbb{S} ^{2n-1}}{u\left( a+r\omega \right) \mathrm{d}\mu \left( \omega \right)}
\\
&=M_u\left( a,r \right) ,
\end{aligned}
\]
以及$u(a+re^{\mathrm{i}\theta}\omega)$关于$\theta$是次调和的.////

**Remark.** 这里我们用到了一个经典的技巧. 如果$\rho$是径向对称的, 那么我们总可以把$u\star\rho_\varepsilon$写成某种球面测度的加权和, 进而如果$u$还有某些调和性质的话就可以得到单调性.

### Levi形式

设$u$是一个定义在$\Omega$上的函数, 让我们先假定$u\in C^2(\Omega,\mathbb{R})$. 我们可以定义Levi形式
\[
\mathcal{H} _u\left( a;\xi \right) =\sum_{1\le j,k\le n}{\frac{\partial ^2u\left( a \right)}{\partial z_j\partial \bar{z}_k}\xi _j\bar{\xi}_k}.
\]

我们先来证明一个引理.

> 设$u\in C^2(\Omega)\cap\mathbf{PSH}(\Omega)$, 则
\[
\frac{1}{2\pi}\int_0^{2\pi}{u\left( a+e^{\mathrm{i}\theta}\xi \right) \mathrm{d}\theta}-u\left( a \right) =\frac{2}{\pi}\int_0^1{\frac{\mathrm{d}t}{t}\int_{\left| \zeta \right|<t}{\mathcal{H} _u\left( a+\zeta \xi ;\xi \right) \mathrm{d}\mathcal{L} \left( \zeta \right)}}.
\]

**Proof.** 令$v(\zeta)=u(a+\zeta\xi)$, 我们来计算$v$的Laplacian. 我们有
\[
\frac{\partial ^2v\left( \zeta \right)}{\partial \zeta \partial \bar{\zeta}}=\sum_{j,k=1}^n{\frac{\partial ^2u\left( a+\zeta \xi \right)}{\partial z_j\partial \bar{z}_k}\xi _j\bar{\xi}_k},
\]
于是
\[
\Delta v\left( \zeta \right) =4\mathcal{H} _u\left( a+\zeta \xi ;\xi \right) .
\]

现在由Green恒等式, 我们有
\[
\int_{\left| \zeta \right|<t}{\Delta v\left( \zeta \right) \mathrm{d}\mathcal{L} \left( \zeta \right)}=\int_{\left| \zeta \right|=t}{\frac{\partial v}{\partial \nu}\mathrm{d}s}=t\int_0^{2\pi}{\frac{\partial v}{\partial \mathbf{r}}\left( te^{\mathrm{i}\theta} \right) \mathrm{d}\theta}.
\]
然而我们注意到
\[
\int_0^{2\pi}{\frac{\partial v}{\partial \mathbf{r}}\left( te^{\mathrm{i}\theta} \right) \mathrm{d}\theta}=\frac{\partial}{\partial t}\int_0^{2\pi}{v\left( te^{\mathrm{i}\theta} \right) \mathrm{d}\theta}=2\pi \mathcal{M} ^{\prime}\left( t \right) ,
\]
这里
\[
\mathcal{M} \left( t \right) =\frac{1}{2\pi}\int_0^{\pi}{v\left( te^{\mathrm{i}\theta} \right) \mathrm{d}\theta}.
\]
于是
\[
\begin{aligned}
\int_0^1{\mathcal{M} ^{\prime}\left( t \right)}&=\frac{1}{2\pi}\int_0^{2\pi}{u\left( a+e^{\mathrm{i}\theta}\xi \right) \mathrm{d}\theta}-u\left( a \right) 
\\
&=\int_0^1{\frac{1}{2\pi}\int_0^{2\pi}{\frac{\partial v}{\partial \mathbf{r}}\left( te^{\mathrm{i}\theta} \right) \mathrm{d}\theta}\mathrm{d}t}
\\
&=\frac{1}{2\pi}\int_0^1{\frac{\mathrm{d}t}{t}\int_{\left| \zeta \right|<t}{\Delta v\left( \zeta \right) \mathrm{d}\mathcal{L} \left( \zeta \right)}}
\\
&=\frac{2}{\pi}\int_0^1{\frac{\mathrm{d}t}{t}\int_{\left| \zeta \right|<t}{\mathcal{H} _u\left( a+\zeta \xi ;\xi \right) \mathrm{d}\mathcal{L} \left( \zeta \right)}}.
\end{aligned}
\]
////

对于光滑($C^2$)情形, 我们有下面的结果.

> 函数$u\in C^2(\Omega)\cap\mathbf{PSH}(\Omega)$当且仅当$u$的Levi形式是半正定的.

**Proof.** 先假设$u$是PSH的, 则
\[
\begin{aligned}
0&\le \frac{1}{2\pi}\int_0^{2\pi}{u\left( a+re^{\mathrm{i}\theta}\xi \right) \mathrm{d}\theta}-u\left( a \right) 
\\
&=\frac{2}{\pi}\int_0^1{\frac{\mathrm{d}t}{t}\int_{\left| \zeta \right|<t}{\mathcal{H} _u\left( a+r\zeta \xi ;r\xi \right) \mathrm{d}\mathcal{L} \left( \zeta \right)}}
\\
&=\frac{2}{\pi}\int_0^1{\frac{\mathrm{d}t}{t}\int_{\left| \zeta \right|<t}{r^2\mathcal{H} _u\left( a+r\zeta \xi ;\xi \right) \mathrm{d}\mathcal{L} \left( \zeta \right)}}.
\end{aligned}
\]
在等式两边同除$r^2$, 就有
\[
\frac{1}{r^2}\left( \frac{1}{2\pi}\int_0^{2\pi}{u\left( a+re^{\mathrm{i}\theta}\xi \right) \mathrm{d}\theta}-u\left( a \right) \right) =\frac{2}{\pi}\int_0^1{\frac{\mathrm{d}t}{t}\int_{\left| \zeta \right|<t}{\mathcal{H} _u\left( a+r\zeta \xi ;\xi \right) \mathrm{d}\mathcal{L} \left( \zeta \right)}}.
\]
令$r\to 0$就完成了证明.////

下面我们来看不带光滑性的版本, 事实上我们可以把它叙述得非常一般.

> 设$u\in\mathbf{PSH}(\Omega)$, $u$在$\Omega$的每个连通分支上都不恒为$-\infty$, 则对任意$\xi\in\mathbb{C}^n$, \[\mathcal{H} _u\left( \xi \right) =\sum_{1\le j,k\le n}{\frac{\partial ^2u}{\partial z_j\partial \bar{z}_k}\xi _j\bar{\xi}_k}\in \mathcal{D} ^{\prime}\left( \Omega \right) \]是一个正测度. 反过来, 如果存在分布$v\in\mathcal{D}^\prime(\Omega)$使得$\mathcal{H}_v(\xi)$对每个$\xi$都是一个正测度, 则存在唯一的$u\in\mathbf{PSH}(\Omega)$使得$v$是$u$关联的分布.

**Proof.** 证明的想法就是磨光. 先设$u\in\mathbf{PSH}(\Omega)$, 我们考虑光滑化$u_\varepsilon$的Levi形式, 由前述引理知$\mathcal{H}_{u_\varepsilon}(\xi)\ge 0$, 从而诱导了正的Radon测度. 现在令$\varepsilon\downarrow 0$, 我们注意到$\mathcal{H}_{u_\varepsilon}(\xi)=\mathcal{H}_u(\xi)\star\rho_\varepsilon$以及$u_\varepsilon\to u$, 就有$\mathcal{H}_{u}(\xi)\ge 0$. 反过来, 如果我们有一个分布$v$诱导出的测度总是正测度, 则其实Laplacian 
\[
\Delta_{\mathbb{R}^{2n}}v=\sum_{j=1}^n\mathcal{H}_v(\mathbf{e}_j)
\]
也是正的, 进而我们可以取一个上半连续的次调和函数$w$满足$v=T_w$. 我们对$w$做光滑化, 则$\mathcal{H}_{w_\varepsilon}(\xi)\ge 0$, 进而由前述引理知$w_\varepsilon\in\mathbf{PSH}(\Omega_\varepsilon)$. 令$\varepsilon\downarrow 0$, 一方面明显有$w$是上半连续的, 另一方面由Fatou引理我们有
\[\limsup_{\varepsilon \downarrow 0}\frac{1}{2\pi}\int_0^{2\pi}{w_{\varepsilon}\left( a+re^{\mathrm{i}\theta}\xi \right) \mathrm{d}\theta}\le \frac{1}{2\pi}\int_0^{2\pi}{w\left( a+re^{\mathrm{i}\theta}\xi \right) \mathrm{d}\theta},
\]
令$\varepsilon\downarrow 0$就完成了证明.////
