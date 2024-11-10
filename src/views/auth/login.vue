<script lang="ts" setup>
import type { FormInst, FormRules } from 'naive-ui'
import $request from '@/extend/fetch-request'
import { md5 } from 'js-md5'
import { ref } from 'vue'

interface ModelType {
  username: string | null
  password: string | null
}

const router = useRouter()

const formRef = ref<FormInst | null>(null)

const message = useMessage()

const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
}

const model = ref<ModelType>({
  username: null,
  password: null,
})

function handleLogin(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      $request.post('/login', {
        username: model.value.username!,
        password: md5(model.value.password!),
      }).then((res) => {
        if (res.code === 200) {
          tools.ipcInvoke('writeFileSync', 'loginData.json', JSON.stringify({
            userId: res.data.userId,
            time: res.data.time,
            token: res.data.token,
          }))

          tools.ipcInvoke('message', '登录成功', '确定')
          router.replace({ name: 'home' })
        }
      })

      // fetch('http://localhost:3000/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     username: model.value.username,
      //     password: md5(model.value.password!),
      //   }),
      // }).then(res => res.json()).then((res) => {
      //   fetch('http://localhost:3000/getUserList', {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'x-id': res.data.userId,
      //       'x-time': res.data.time,
      //       'x-token': res.data.token,
      //     },
      //   }).then(res => res.json()).then((data) => {

      //   })
      // })
    }
    else {
      console.error(errors)
      message.error('验证失败')
    }
  })
}
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <NCard class="w-96 mx-auto">
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="username" label="用户名">
          <n-input v-model:value="model.username" placeholder="请输入用户名" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="model.password"
            type="password"
            placeholder="请输入密码"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                round
                type="primary"
                @click="handleLogin"
              >
                登录
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </NCard>
  </main>
</template>

<style>
</style>
