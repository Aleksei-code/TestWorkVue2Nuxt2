<template >
  <div>
    <h1>Тестовая работа </h1>
    <h3>Vue2+Nuxt2+Axios+Bootstrap+SASS</h3>
    <div> Реализованный функционал:</div>
    <li>Подключение и работа с общедоступным API <a noPrefetch target="_blank" rel="noopener noreferrer" href='https://rapidapi.com/iddogino1/api/my-store2'> ссылка</a></li>
    <li>Products page + pagination</li>
    <li>Изменение отображения списка элементов (реализовано 2 вида: плиточный и горизонтальный)</li>

    <div> В процессе:</div>
    <li>Добавить функцию добавления товара</li>
    <li>Добавить корзину</li>
    <li>Использование TypeScript</li>

    <p></p>
    <div>
      Matyunin Aleksey 2022 <a noPrefetch target="_blank" rel="noopener noreferrer" href='https://github.com/Aleksey-hub-z'> Ссылка на github</a>
    </div>

    <main> 
      <div class='container'>
        <nuxt />
        
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
