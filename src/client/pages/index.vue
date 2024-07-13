<script lang="ts" setup>

interface bingoSettings {
  bingoNumber: number,
  backgroundImage: string
}


interface cell {
  index: number,
  row: number,
  col: number,
  EDIT: boolean,
  BINGO: boolean,
  content: string
}

const bingoSettings = {
  bingoNumber: 5,
  backgroundImage: '/background.png',
}

const table = computed(() => {
  const table = []
  for (let i = 0; i < bingoSettings.bingoNumber; i++) {
    const row = []
    for (let j = 0; j < bingoSettings.bingoNumber; j++) {
      row.push({
        index: i * bingoSettings.bingoNumber + j,
        row: i,
        col: j,
        EDIT: false,
        BINGO: false,
        content: '请输入Bingo'
      })
    }
    table.push(row)
  }
  return table;
})

const reactiveTable = reactive(table.value)

const textareaRefs = ref<(HTMLTextAreaElement | null)[]>([]);

const handleClickTimer = ref();
const timer = 300

const Bingo = (row: number, col: number) => {
  const cell = reactiveTable[row][col]
  clearTimeout(handleClickTimer.value);
  handleClickTimer.value = setTimeout(() => {
    cell.BINGO = !cell.BINGO;
  }, timer);
}

const edit = (row: number, col: number) => {
  const cell = reactiveTable[row][col]
  if (cell.EDIT !== true) {
    clearTimeout(handleClickTimer.value);
    cell.EDIT = true;
    cell.BINGO = false;
    nextTick(() => {
      textareaRefs.value[row * bingoSettings.bingoNumber + col]!.focus();
    })
  }
}

onMounted(() => {

})

</script>
<template>
  <div class="home">
    <div class="bingo">
      <div class="bingo-background">
        <img :src="bingoSettings.backgroundImage" />
      </div>
      <div class="bingo-table">
        <div class="bingo-table-background"></div>
        <div class="bingo-table-main">
          <div class="bingo-table-main-row" v-for="(row, rowIndex) in reactiveTable" :key="rowIndex">
            <div :row="rowIndex" :col="colIndex" class="bingo-table-main-row-cell" v-for="(cell, colIndex) in row"
              :key="colIndex" @click="Bingo(rowIndex, colIndex)" @dblclick="edit(rowIndex, colIndex)">
              <img class="bingo" :style="{ display: cell.BINGO ? 'block' : 'none' }" src="/Bingo.png" />
              <textarea ref="textareaRefs" class="" type="text" v-model="cell.content" :disabled="!cell.EDIT"
                @blur="cell.EDIT = false" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="settings">

    </div>
  </div>
</template>
<style lang="scss">
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bingo {
  height: 75vh;
  position: relative;

  &-background {
    height: 100%;

    img {
      height: 100%;
      object-fit: contain;
    }
  }

  &-table {
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% - 4rem);
    aspect-ratio: 1;
    margin: 0 2rem 2rem;
    z-index: 1;

    &-main {
      height: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid black;
      box-sizing: content-box;
      border-radius: 1rem;

      &-row {
        display: flex;
        flex-direction: row;
        flex-grow: 1;

        &-cell {
          position: relative;
          display: flex;
          align-items: center;
          /* 垂直居中 */
          justify-content: center;
          /* 水平居中 */
          background: white;
          flex-grow: 1;
          border: 1px solid black;
          padding: .5rem;
          background: #F3F3F3;
          cursor: pointer;
          user-select: none;

          .bingo {
            position: absolute;
            top: 0;
            left: 0;

            height: 100%;
            object-fit: cover;
          }

          textarea {
            width: 100%;
            height: 100%;
            resize: none;
            cursor: pointer;
            pointer-events: none;
            font-size: 16px;
          }

        }
      }
    }
  }

  &-table-background {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: conic-gradient(from 180deg at 50% 50%, #A7FCFF -47deg, #FF8787 48deg, #B4FFA7 180deg, #A7FCFF 313deg, #FF8787 408deg);
    border-radius: 1rem;
    /* 根据边框宽度调整 */
    margin: -.5rem;
    z-index: -1;
  }

  .bingo-table-main-row:first-child .bingo-table-main-row-cell:first-child {
    border-top-left-radius: 1rem;
  }

  .bingo-table-main-row:first-child .bingo-table-main-row-cell:last-child {
    border-top-right-radius: 1rem;
  }

  .bingo-table-main-row:last-child .bingo-table-main-row-cell:first-child {
    border-bottom-left-radius: 1rem;
  }

  .bingo-table-main-row:last-child .bingo-table-main-row-cell:last-child {
    border-bottom-right-radius: 1rem;
  }
}
</style>
