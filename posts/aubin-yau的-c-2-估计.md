---
title: "Aubin-Yau的$C^2$-估计"
date: 2026-07-28
summary: "本文用相对自然的方式整理了Yau在证明Calabi猜想时用到的C^2估计的证明."
tags: ["复MA方程", "Calabi-Yau"]
---

### 问题

我们考虑复Monge-Amp\`ere方程$(\omega+dd^c\phi)^n=e^\phi\omega^n$. 为了方便接下来的计算, 我们在局部坐标下展开, 并取对数, 有

$$
\log\det(g_{j\bar{k}}+\partial_j\partial_{\bar{k}}\phi)=\phi+\log\det(g_{j\bar{k}}).
$$

我们需要得到关于$\phi$的$C^2$-估计.

### 一些自然的尝试

为了得到$C^2$-估计, 自然的想在方程两端取一个Laplacian. 我们把这里的计算写的清楚些. 为了记号的简便, 我们记$g_{j\bar{k}}+\partial_j\partial_{\bar{k}}\phi=g_{j\bar{k}}^\prime$, 并将求偏导数写成下标的形式, 例如$\partial_j\partial{\bar{k}}\phi=\phi_{j\bar{k}}$. 注意我们有时会丢掉$g$的一阶导数项, 这是因为最终我们会在一个法坐标下计算, 而在$g$的法坐标下Christoffel符号消失. 下面我们来做计算:

$$\partial _{\bar{q}}\log\det \left( g_{j\bar{k}}^{\prime} \right) =\frac{1}{\det \left( g_{j\bar{k}}^{\prime} \right)}\left( \partial _{\bar{q}}g_{j\bar{k}}^{\prime} \right) \mathbf{A}^{\prime j\bar{k}}=g^{\prime j\bar{k}}\left( \partial _{\bar{q}}g_{j\bar{k}}^{\prime} \right) ,$$

于是

$$
\begin{aligned}
\partial _p\partial _{\bar{q}}\log\det \left( g_{j\bar{k}}^{\prime} \right) &=\partial _p\left( g^{\prime j\bar{k}}\partial _{\bar{q}}g_{j\bar{k}}^{\prime} \right) 
\\
&=\left( \partial _pg^{\prime j\bar{k}} \right) \left( \partial _{\bar{q}}g_{j\bar{k}}^{\prime} \right) +g^{\prime j\bar{k}}\left( \partial _p\partial _{\bar{q}}g_{j\bar{k}}^{\prime} \right) 
\\
&=-\left( g^{\prime j\bar{\eta}}\left( \partial _pg_{\bar{\eta}\xi}^{\prime} \right) g^{\prime \xi \bar{k}} \right) \left( \partial _{\bar{q}}g_{j\bar{k}}^{\prime} \right) +g^{\prime j\bar{k}}\left( \partial _p\partial _{\bar{q}}g_{j\bar{k}}^{\prime} \right) 
\\
&=-g^{\prime j\bar{\eta}}g^{\prime \xi \bar{k}}\left( \partial _pg_{\bar{\eta}\xi}^{\prime} \right) \left( \partial _{\bar{q}}g_{j\bar{k}}^{\prime} \right) +g^{\prime j\bar{k}}\left( \partial _p\partial _{\bar{q}}g_{j\bar{k}}^{\prime} \right) .
\end{aligned}
$$

于是

$$
\begin{aligned}
\Delta \log\det \left( g_{j\bar{k}}^{\prime} \right) &=g^{p\bar{q}}\partial _p\partial _{\bar{q}}\log\det \left( g_{j\bar{k}}^{\prime} \right) 
\\
&=-g^{p\bar{q}}g^{\prime j\bar{\eta}}g^{\prime \xi \bar{k}}\left( \partial _pg_{\bar{\eta}\xi}^{\prime} \right) \left( \partial _{\bar{q}}g_{j\bar{k}}^{\prime} \right) +g^{p\bar{q}}g^{\prime j\bar{k}}\left( \partial _p\partial _{\bar{q}}g_{j\bar{k}}^{\prime} \right) 
\\
&=-g^{p\bar{q}}g^{\prime j\bar{\eta}}g^{\prime \xi \bar{k}}{\phi _p}_{\bar{\eta}\xi}{\phi _{\bar{q}}}_{j\bar{k}}+g^{p\bar{q}}g^{\prime j\bar{k}}\left( g_{p\bar{q};j\bar{k}}+\phi _{p\bar{q}j\bar{k}} \right) 
\\
&=-g^{p\bar{q}}g^{\prime j\bar{\eta}}g^{\prime \xi \bar{k}}{\phi _p}_{\bar{\eta}\xi}{\phi _{\bar{q}}}_{j\bar{k}}+g^{p\bar{q}}g^{\prime j\bar{k}}\left( -R_{p\bar{q}j\bar{k}}+g^{m\bar{n}}\left( \partial _pg_{j\bar{n}} \right) \left( \partial _qg_{m\bar{k}} \right) +\phi _{p\bar{q}j\bar{k}} \right) 
\\
&=-g^{p\bar{q}}g^{\prime j\bar{\eta}}g^{\prime \xi \bar{k}}{\phi _p}_{\bar{\eta}\xi}\phi _{\bar{q}j\bar{k}}-g^{p\bar{q}}g^{\prime j\bar{k}}R_{p\bar{q}j\bar{k}}+g^{p\bar{q}}g^{\prime j\bar{k}}g^{m\bar{n}}\left( \partial _pg_{j\bar{n}} \right) \left( \partial _qg_{m\bar{k}} \right) +g^{p\bar{q}}g^{\prime j\bar{k}}\phi _{p\bar{q}j\bar{k}}.
\end{aligned}
$$

我们来处理项$\phi_{p\bar{q}j\bar{k}}$, 我们希望把它写成Laplacian的形式. 具体地我们注意到

$$
\begin{aligned}
\Delta ^{\prime}\Delta \phi &=g^{\prime j\bar{k}}\partial _j\partial _{\bar{k}}\left( g^{p\bar{q}}\partial _p\partial _{\bar{q}}\phi \right) 
\\
&=g^{\prime j\bar{k}}\left( g_{j\bar{k};}^{p\bar{q}}\phi _{p\bar{q}}+g_{j;}^{p\bar{q}}\phi _{\bar{k}p\bar{q}}+g_{\bar{k};}^{p\bar{q}}\phi _{jp\bar{q}}+g^{p\bar{q}}\phi _{j\bar{k}p\bar{q}} \right) 
\\
&=g^{\prime j\bar{k}}\left( -g^{p\bar{\eta}}g^{\xi \bar{q}}g_{j\bar{k};\bar{\xi}\eta}\phi _{p\bar{q}}+g^{p\bar{q}}\phi _{j\bar{k}p\bar{q}} \right) ,
\end{aligned}
$$

于是

$$
g^{p\bar{q}}g^{\prime j\bar{k}}\phi _{p\bar{q}j\bar{k}}=\Delta ^{\prime}\Delta \phi +g^{\prime j\bar{k}}g^{p\bar{\eta}}g^{\xi \bar{q}}g_{j\bar{k};\bar{\xi}\eta}\phi _{p\bar{q}}.
$$

另一方面, 由Monge-Amp\`ere方程知$\Delta\log\det(g^\prime)=\Delta\phi+\Delta\log\det(g)$, 而

$$
\begin{aligned}
\Delta \log\det \left( g_{j\bar{k}} \right) &=g^{p\bar{q}}\partial _p\partial _{\bar{q}}\log\det \left( g_{j\bar{k}} \right) 
\\
&=g^{p\bar{q}}\partial _p\left( g^{j\bar{k}}\partial _{\bar{q}}g_{j\bar{k}} \right) 
\\
&=g^{p\bar{q}}\left( -g^{j\bar{\eta}}g^{\xi \bar{k}}\partial _pg_{j\bar{k}} \right) \left( \partial _{\bar{q}}g_{j\bar{k}} \right) +g^{p\bar{q}}g^{j\bar{k}}\partial _p\partial _{\bar{q}}g_{j\bar{k}}
\\
&=-g^{p\bar{q}}g^{j\bar{k}}R_{p\bar{q}j\bar{k}}
\\
&=-\mathbf{Scal},
\end{aligned}
$$

于是我们得到了

$$
\Delta \phi -\mathbf{Scal}=-g^{p\bar{q}}g^{\prime j\bar{\eta}}g^{\prime \xi \bar{k}}{\phi _p}_{\bar{\eta}\xi}\phi _{\bar{q}j\bar{k}}-g^{p\bar{q}}g^{\prime j\bar{k}}R_{p\bar{q}j\bar{k}}+\Delta ^{\prime}\Delta \phi +g^{\prime j\bar{k}}g^{p\bar{\eta}}g^{\xi \bar{q}}g_{j\bar{k};\bar{\xi}\eta}\phi _{p\bar{q}}.
$$

一个自然(但不行)的尝试是直接对上式应用极值原理. 然而经过尝试后发现极值原理此时只能给出一句废话, 究其原因是尽管这里若干曲率项是好项, 但为了得到想要的不等式我们把它们全部放没了, 这导致放缩过度. 我们得寻找一个好的测试函数.

### Yau的测试函数

我们考虑测试函数$G=\log(\Delta\phi+n)-A\phi$, 这里$A$待定. 我们对$G$求带prime的Laplacian, 即

$$
\Delta ^{\prime}G=\frac{\Delta ^{\prime}\Delta \phi \left( \Delta \phi +n \right) -g^{\prime j\bar{k}}\left( \partial _{\bar{k}}\Delta \phi \right) \left( \partial _j\Delta \phi \right)}{\left( \Delta \phi +n \right) ^2}-A\Delta ^{\prime}\phi .
$$

下面我们在一个法坐标里进行计算. 这里我们取$g$在一点处的法坐标, 并对角化$g^\prime$. 我们有
$$
\begin{aligned}
\Delta ^{\prime}\Delta \phi &=\Delta \phi -\mathbf{Scal}+g^{p\bar{q}}g^{\prime j\bar{\eta}}g^{\prime \xi \bar{k}}{\phi _p}_{\bar{\eta}\xi}\phi _{\bar{q}j\bar{k}}+g^{p\bar{q}}g^{\prime j\bar{k}}R_{p\bar{q}j\bar{k}}-g^{\prime j\bar{k}}g^{p\bar{\eta}}g^{\xi \bar{q}}g_{j\bar{k};\bar{\xi}\eta}\phi _{p\bar{q}}
\\
&=\Delta \phi -\mathbf{Scal}+\sum_{p,j,k}{g^{\prime j\bar{j}}g^{\prime k\bar{k}}\left| \phi _{p\bar{j}k} \right|^2}+\sum_{p,j}{g^{\prime j\bar{j}}R_{p\bar{p}j\bar{j}}}+\sum_{j,p,q}{g^{\prime j\bar{j}}R_{j\bar{j}p\bar{q}}\phi _{p\bar{q}}}.
\end{aligned}
$$

注意到事实上$\phi_{p\bar{q}}=\delta_{pq}\phi_{p\bar{p}}$, 我们可以进一步认为

$$
\sum_{j,p,q}{g^{\prime j\bar{j}}R_{j\bar{j}p\bar{q}}\phi _{p\bar{q}}}=\sum_{j,p}{g^{\prime j\bar{j}}R_{j\bar{j}p\bar{p}}\phi _{p\bar{p}}}.
$$

于是

$$
\begin{aligned}
\Delta ^{\prime}G=&\frac{\Delta \phi -\mathbf{Scal}}{\Delta \phi +n}+\frac{1}{\Delta \phi +n}\left( \sum_{p,j,k}{g^{\prime j\bar{j}}g^{\prime k\bar{k}}\left| \phi _{p\bar{j}k} \right|^2}+\sum_{p,j}{g^{\prime j\bar{j}}R_{p\bar{p}j\bar{j}}}+\sum_{j,p,q}{g^{\prime j\bar{j}}R_{j\bar{j}p\bar{q}}\phi _{p\bar{q}}} \right) 
\\
&-\frac{1}{\left( \Delta \phi +n \right) ^2}\sum_j{g^{\prime j\bar{j}}\left| \partial _j\Delta \phi \right|^2}-A\Delta ^{\prime}\phi .
\end{aligned}
$$

注意到

$$
\left| \partial _j\Delta \phi \right|^2=\left| \sum_p{\phi _{jp\bar{p}}} \right|^2=\left| \sum_p{\sqrt{g_{p\bar{p}}^{\prime}}\frac{\phi _{jp\bar{p}}}{g_{p\bar{p}}^{\prime}}} \right|^2\le \sum_p{g_{p\bar{p}}^{\prime}}\sum_p{g^{\prime p\bar{p}}\left| \phi _{jp\bar{p}} \right|^2}=\left( \Delta \phi +n \right) \sum_p{g^{\prime p\bar{p}}\left| \phi _{jp\bar{p}} \right|^2},
$$

我们有

$$
\sum_j{g^{\prime j\bar{j}}\left| \partial _j\Delta \phi \right|^2}\le \left( \Delta \phi +n \right) \sum_{j,p}{g^{\prime j\bar{j}}g^{\prime p\bar{p}}\left| \phi _{jp\bar{p}} \right|^2},
$$

于是$\Delta^\prime G$可以化简为

$$
\Delta ^{\prime}G\ge \frac{\Delta \phi -\mathbf{Scal}}{\Delta \phi +n}+\frac{1}{\Delta \phi +n}\sum_{p,j}{g^{\prime j\bar{j}}R_{p\bar{p}j\bar{j}}}+\frac{1}{\Delta \phi +n}\sum_{j,p}{g^{\prime j\bar{j}}R_{j\bar{j}p\bar{p}}\phi _{p\bar{p}}}-A\Delta ^{\prime}\phi .
$$

进一步, 我们设$g_{j\bar{k}}^\prime=\mu_j\delta_{jk}$, 则我们只要证明存在一个常数$C>0$使得$1/C<\mu_j<C$. 下面我们就来证明这一点. 我们有

$$
\begin{aligned}
\Delta ^{\prime}G&\ge \frac{\Delta \phi -\mathbf{Scal}}{\Delta \phi +n}+\frac{1}{\Delta \phi +n}\sum_{p,j}{g^{\prime j\bar{j}}R_{p\bar{p}j\bar{j}}}+\frac{1}{\Delta \phi +n}\sum_{j,p}{g^{\prime j\bar{j}}R_{j\bar{j}p\bar{p}}\phi _{p\bar{p}}}-A\Delta ^{\prime}\phi 
\\
&\ge \frac{\Delta \phi -\mathbf{Scal}}{\Delta \phi +n}+\frac{1}{\Delta \phi +n}\sum_{p,j}{g^{\prime j\bar{j}}R_{p\bar{p}j\bar{j}}}+\frac{1}{\Delta \phi +n}\sum_{j,p}{g^{\prime j\bar{j}}R_{j\bar{j}p\bar{p}}\left( \mu _p-1 \right)}-A\Delta ^{\prime}\phi 
\\
&=\frac{\Delta \phi -\mathbf{Scal}}{\Delta \phi +n}+\frac{1}{\Delta \phi +n}\sum_{j,p}{g^{\prime j\bar{j}}\mu _pR_{j\bar{j}p\bar{p}}}-A\Delta ^{\prime}\phi 
\\
&\ge \frac{\Delta \phi -\mathbf{Scal}}{\Delta \phi +n}-B\sum_j{g^{\prime j\bar{j}}}-An+A\sum_j{g^{\prime j\bar{j}}}.
\end{aligned}
$$

现在取$A=B+1$, 则我们有

$$
\sum_j{g^{\prime j\bar{j}}}\le An-\frac{\Delta \phi -\mathbf{Scal}}{\Delta \phi +n}\le C_0.
$$

注意到$g^{\prime j\bar{j}}=1/\mu_j$, 于是上式给出了$\mu_j\ge 1/C_0$. 另一方面, 不妨设$\mu_1\ge\mu_2\ge\cdots\ge\mu_n$, 则我们有

$$
\mu_1=\frac{\mu_1\mu_2\cdots\mu_n}{\mu_2\cdots\mu_n}=\frac{e^\phi}{C_0^{n-1}}\le C_1,
$$

于是取$C=C_0+C_1+1$, 即证.
