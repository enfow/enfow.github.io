---
layout: post
title: Probability Distributions
category_num: 2
---

# Probability Distributions

- Ian Goodfellow, Yoshua Bengio, Aaron Courville의 Deep Learning Book을 참고하여 작성했습니다.
- update date : 2020.02.05

## Bernoulli Distribution

이산 확률 변수 문제의 가장 대표적인 예시는 동전 던지기이다. 확률 변수 $$x$$가 있을 때 앞면이 나오면 $$x=1$$, 뒷면이 나오면 $$x = 0$$이라 하고 앞면이 나올 확률을 다음과 같이 표현하는 것이다.

$$
p(x = 1 \lvert \mu) = \mu
$$

여기서 $$\mu$$는 $$x = 1$$인 사건, 즉 동전을 던졌을 때 앞면이 나올 확률을 뜻한다. 이와 같은 확률 분포를 베르누이 분포라고 한다. 베르누이 분포의 구체적인 정의는 다음과 같다.

$$
Bern(x \lvert \mu) = \mu^x (1 - \mu)^{1-x}
$$

베르누이 분포는 다음과 같은 특성을 갖는다.

- mean: $$E[x] = \mu$$
- variance: $$var[x] = \mu (1-\mu)$$

## Binomial Distribution

이항분포는 베르누이 시행을 여러 번 반복했을 때 성공횟수를 확률변수로 하는 확률 분포를 말한다. 예를 들어 동전 던지기를 10번 수행했을 때 앞면이 총 6번 나올 확률을 다룬다. 이항분포는 다음과 같이 표현할 수 있다.

$$
Bin(m \lvert N, \mu) = \begin{pmatrix} N \\ m \end{pmatrix} \mu^m (1 - \mu)^{N - m}
$$

참고로 이항계수 $$\begin{pmatrix} N \\ m \end{pmatrix}$$는 다음과 같이 정의된다.

$$
\begin{pmatrix} N \\ m \end{pmatrix} = {N! \over (N - m)! m!}
$$

이항분포는 다음과 같은 특성을 갖는다.

- mean: $$E[m] = N\mu$$
- variance: $$var[m] = N\mu(1-\mu)$$

## Multinoulli Distribution

**다항 분포** 는 가능한 확률 변수의 값이 복수인 경우를 나타내기 위한 이산확률분포이다. 주사위를 던지는 경우가 대표적인 다항분포의 예시라고 할 수 있다. 여러 개의 카테고리 각각의 발생 확률이라는 점에서 카테고리 확률분포(categorical distribution)이라고도 한다.

다항분포는 확률 변수의 값이 여러 개이므로, 벡터의 형태로 표현된다. $$k$$개가 있다면 $$x = \{ x_1, x_2, ... x_k \}$$가 된다. 예를 들어 주사위를 10회 던져 나오는 숫자라고 한다면 $$x = \{ 1,2,1,4,1,1 \}$$이 가능하며, 이는 1이 1회, 2가 2회, 3이 1회, 4가 4회, 5가 1회, 6이 1회 나오는 경우를 말한다.

다항분포의 파라미터 $$p$$는 각각의 확률 변수 값이 나올 수 있는 확률로, $$p \in [0,1]^{k-1}$$을 만족한다. 마지막 $$k$$번째가 나올 확률은 $$1 - 1^T p$$로 구한다. 확률이므로 $$1^Tp \geqq 1 $$의 제약조건이 붙는다. 길고 다소 어렵게 썼지만, 각각의 확률 변수 값이 나올 확률을 파라미터로 가지며 그것의 총합은 1을 넘지 않는다는 의미다.

## Gaussian Distribution

**가우시안 확률 분포**는 연속확률분포로서 가장 많이 사용되기 때문에 **정규 분포**(normal distribution)라는 이름도 가지고 있다. 이러한 표현은 통계학이 과거 사회과학 분야에서 발전할 때 붙은 이름으로, 정규 분포를 띄지 않는 통계적 사회 조사 결과는 잘못된 것으로 보는 관행에서 비롯되었다고 한다. 가우시안 분포의 식은 아래와 같이 다소 복잡하지만, 평균과 분산이라는 두 가지 파라미터만 가지고도 강력한 연속확률분포를 만들 수 있다는 점에서 가장 많이 사용되는 확률 분포이다.

$$
N(x; \mu, \sigma^2) = \root \of {1 \over 2\pi\sigma^2} \exp (- {1 \over 2 \sigma^2}(x - \mu)^2)
$$

이때 평균을 의미하는 $$\mu$$는 central peak의 위치를 나타낸다.

### Characteristics of Gaussian

가우시안 분포는 미지의 확률 분포를 가정할 때 많이 사용된다. 이는 다음과 같은 가우시안 분포의 특성 때문이다.

##### 1. Many Probability Distributions are similar to Gaussian Distributions

**중심 극한의 정리**(central limit theorem)에 따르면 여러 확률 변수의 합은 정규 분포에 근사한다고 한다.

##### 2. Have High Uncertainty

가우시안 분포는 동일한 variance를 가지는 다른 확률 분포보다 불확실성의 수준이 높다. 이는 maximum entropy를 가진다고도 표현된다. 이러한 점은 모델링의 대상이 되는 확률 분포를 정확히 알지 못할 때 가우시안 분포를 대신 사용하는 것이 좋은 이유가 된다.

### Standard Normal Distribution

가우시안 분포 중에서도 평균이 0, 분산이 1인 경우를 **표준 정규 분포**(standard normal distribution)라고 한다.

## Mixtures of Distributions

**혼합 분포**는 말 그대로 위에서 언급한 기본적인 확률 분포를 합하여 하나의 확률 분포를 만드는 방법이다. 혼합 분포에서는 여러 개의 확률 분포 값의 비중을 표현하기 위해 다항 분포(Multinoulli Distribution)를 사용하며, 구체적인 식은 아래와 같다.

$$
P(X) = \Sigma_i P(c = i)P(X \lvert c = i)
$$

여기서 $$P(c)$$가 다항 분포로, $$c$$는 혼합 분포를 구성하는 각각의 확률 분포를 의미한다. 즉 여러 개의 확률 분포가 가지는 확률 값을 다항 분포의 값만큼 가중하여 더한 것이라고 할 수 있다.

혼합 분포에서 중요한 개념 중 하나는 **잠재 변수**(latent variable)로, 관측되지 않는 값을 의미한다. 위의 식에서는 $$P(c)$$의 값이 잠재 변수이다.

### Gaussian Mixture Model

**가우시안 혼합 모델**(Gaussian Mixture Model, GMM)은 이름에서 알 수 있듯 여러 개의 가우시안 분포를 합하여 만든 혼합 분포이다. 즉, $$P(X \lvert c = i)$$가 가우시안 분포인 경우이며, 각각의 가우시안 분포는 각각의 평균과 분산 값을 모수로 갖는다.

## Additional study

- 중심 극한의 정리
- 가우시안 혼합 분포의 모수 추정, EM
