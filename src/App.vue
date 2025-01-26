<script setup lang="ts">
import { ref } from 'vue'
import { liuren, order } from './config/index.ts'

const current = ref(0)
const userNumbers = ref('')
const result = ref<Array<string>>([])

const config = order.map((index) => {
  const idx = index - 1
  return liuren[idx]
})

const action = (list: Array<number>) => {
  let number = 0
  const _list: Array<number> = []
  list.forEach((item) => {
    number += item
    const last = _list[_list.length - 1] || 0
    _list.push(last + item)
  })
  userNumbers.value = list.join('-')

  let index = 0
  current.value = 0
  result.value = []

  console.log('🤖 log 1 ===>', _list)
  const timer = setInterval(() => {
    index++
    let idx = (index % config.length) - 1
    idx = idx < 0 ? config.length - 1 : idx
    current.value = idx
    console.log('🤖 log ===>', index, JSON.stringify(liuren[idx]))
    if (_list.includes(index)) {
      const { name, bagua, wuxing } = liuren[idx]
      result.value.push(`${name}【 ${bagua} : ${wuxing} 】`)
      console.log('🤖 xx ===>', `${name}【 ${bagua} : ${wuxing} 】`)
    }

    if (index === number) {
      clearInterval(timer)
      return
    }
  }, 200)
}

/**
 * 通过当时时间计算运势
 */
const currentTime = () => {
  const date = new Date()
  const list = [date.getHours(), date.getMinutes(), date.getSeconds()]
  action(list)
}

/**
 * 随机三位数
 */
const random = () => {
  const list = Array.from({ length: 3 }, () => Math.floor(Math.random() * 81))
  action(list)
}
</script>
<template>
  <div class="main">
    <div class="liuren">
      <div
        :class="`item item-${item} ${item.index === current ? 'action' : ''}`"
        v-for="item in config"
        :key="item.name"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="data">
      <p>用户数字：{{ userNumbers }}</p>
      <p>卦象：{{ result.join(' -> ') }}</p>
    </div>
    <div class="btns">
      <button @click="currentTime">当前时间</button>
      <button @click="random">随机三位</button>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: block;
  height: max-content;
}
.liuren {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 300px;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  border-radius: 100%;
}
.action {
  transform: scale(1.2);
  text-shadow: #fc0 1px 0 20px;
  color: yellow;
}

.data {
  margin-top: 20px;
  text-align: left;
}
.data p {
  margin: 10px 0;
}

.btns {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.btns button {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #409eff;
  color: #fff;
  cursor: pointer;
}
</style>
