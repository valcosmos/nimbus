<script setup lang="ts">
import { type DataTableColumns, NButton } from 'naive-ui'
import { read, utils } from 'xlsx'

interface Data {
  username: string
  nickname: string
  phone: string
}

const columns: DataTableColumns<Data> = [
  { title: '用户名', key: 'username' },
  { title: '昵称 ', key: 'nickname' },
  { title: '手机号', key: 'phone' },
  {
    title: '操作',
    key: 'actions',
    render() {
      return h(NButton, { type: 'primary', onClick: () => importExcel() }, () => '编辑')
    },
  },
]

const tableData = ref<Data[]>([])

function importExcel() {
  tools.ipcInvoke('getFiles', {
    title: '请选择一个Excel',
    // defaultPath: '',
    buttonLabel: '确认选择',
    filters: [{
      name: 'Excel',
      extensions: [
        {
          name: 'Excel 文件',
          extensions: ['xls', 'xlsx'],
        },
      ],
    },
    ],
    properties: ['openFile'],
  }).then((res) => {
    if (res.canceled)
      return

    const file = res.filePaths[0]
    tools.ipcInvoke('readSystemFile', file).then(({ err, data }) => {
      if (err)
        return

      const excel = read(data, { type: 'array' })
      const sheetNames = excel.SheetNames
      const sheet = excel.Sheets[sheetNames[0]]
      const json = utils.sheet_to_json<Data>(sheet, {
        header: [
          'username',
          'nickname',
          'phone',
        ],
      })
      tableData.value = json.slice(1)
    })
  })
}
</script>

<template>
  <main>
    <NCard :bordered="false">
      <NSpace justify="end">
        <NButton type="primary">
          添加
        </NButton>
        <NButton type="primary" @click="importExcel">
          导入
        </NButton>
        <NButton type="warning">
          导出
        </NButton>

        <n-data-table
          :columns="columns"
          :data="tableData"
          :pagination="false"
          :bordered="false"
          :max-height="500"
        />
      </NSpace>
    </NCard>
  </main>
</template>
