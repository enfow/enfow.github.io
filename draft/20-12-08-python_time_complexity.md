---
layout: post
title: Python Bulit-in Time Complexity
category_num: 2
---

# Python Bulit-in Time Complexity

- [Python Data Structures](<https://docs.python.org/3/tutorial/datastructures.html>)
- [Python Wiki-Time Complexity](<https://wiki.python.org/moin/TimeComplexity>)
- Update at : 20.12.07

## Introduction

Python에서는 Bulit-in Data Type으로 List, Set, Dictionary 등을 제공하고 있다. 이들은 각각의 특성에 맞게 필요에 따라 달리 사용되는데, 단순히 List는 중복을 허용하고 Set은 그렇지 않다는 표면적인 특성 외에도 Data Type에 따라 동일한 연산에 대해서도 시간 복잡도가 달라질 수 있어 이 또한 고려하여 선택하는 것이 좋다.

[Python Wiki-Time Complexity](<https://wiki.python.org/moin/TimeComplexity>)에서는 Python Interpreter 중 하나인 [cpython](<https://github.com/python/cpython>)을 사용하는 경우 각 Data Type의 연산들에 대한 시간 복잡도를 확인할 수 있다. 여기서는 cpython을 기준으로 이와 같은 시간 복잡도 계산이 어떻게 구해진 것인지 확인해보고자 한다.

## List: Dynamic Array

- [cpython listobject.c](<https://github.com/python/cpython/blob/master/Objects/listobject.c>)

| Opertaion | Average Case | Worst Case |
|:-----:| :-----: | :-----: |
| indexing | $$O(1)$$ | $$O(1)$$ |
| search | $$O(n)$$ | $$O(n)$$ |
| copy | $$O(n)$$ | $$O(n)$$ |
| append | $$O(1)$$ | $$O(1)$$ |
| assert | $$O(n)$$ | $$O(n)$$ |
| remove | $$O(n)$$ | $$O(n)$$ |
| pop | $$O(1)$$ | $$O(1)$$ |

### List is Dynamic Array

Python의 List는 **Dynamic Array**로 구현되어 있다. Array라는 것은 메모리 상에 연속적으로 저장되어있는 데이터 집합으로 정의되는데, C언어를 통해 확인해보면 보다 명확하다.

### Indexing

List는 Dynamic Array이기 때문에 모든 구성 요소들의 위치를 다음과 같이 쉽게 계산할 수 있다.

$$
\text{element address = start address + (index }*\text{ element size)}
$$

따라서 Indexing에서는 최악의 경우에도 $$O(1)$$이 걸린다.

### Search

어떤 값이 List 내에 없다고 확신하기 위해서는 모든 element를 확인해보아야 한다. 따라서 최악의 경우에는 $$O(n)$$이 된다. 평균적인 시간 복잡도는 다음과 같이 계산된다.

$$
{1+2+...+n \over n} = {n(n+1) \over 2n} = {n+1 \over 2}
$$

풀이하자면 분자에는 첫 번째 Index의 element를 탐색하는 경우 시간 시간복잡도($$1$$)부터 두 번째($$2$$), 세 번째($$n$$), 마지막 element의 원소를 찾는 경우까지, 가능한 모둔 경우의 시간 복잡도의 총합이 들어가고 분모에는 탐색의 경우의 수인 $$n$$이 들어가게 된다. 이를 계산해보면 $${n+1 \over 2}$$이 나오게 되고, Big-O 표기법에 따라 $$O(n)$$이 된다.

### Copy

List를 복사할 때에는 전체 element를 하나씩 복사해야 하기 때문에 $$O(n)$$이 된다.

### Append

Append를 비롯해 새로이 element를 추가하는 연산의 경우에는 Dynamic Array가 어떻게 동작하는지 알아야 정확한 시간 복잡도를 산출할 수 있다. 

### Assert

### Remove

### Pop

## Set: Hash Table

- [cpython setobject.c](<https://github.com/python/cpython/blob/master/Objects/setobject.c>)

Python의 Set은 **Hash Table**로 구현되어 있다.

| Opertaion | Average Case | Worst Case |
|:-----:| :-----: | :-----: |
| search | $$O(1)$$ | $$O(n)$$ |
| copy | $$O(n)$$ | $$O(n)$$ |
| append | $$O(1)$$ | $$O(1)$$ |
| remove | $$O(1)$$ | $$O(n)$$ |
| pop | $$O(1)$$ | $$O(1)$$ |