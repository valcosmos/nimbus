<script setup lang="ts">

</script>

<template>
  <n-config-provider preflight-style-disabled>
    <n-message-provider>
      <n-layout>
        <n-layout has-sider>
          <n-layout-sider
            bordered
            show-trigger
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :native-scrollbar="false"
          >
            <Nav />
          </n-layout-sider>
          <n-layout class="h-[calc(100vh-64px)]">
            <RouterView>
              <template #default="{ Component }">
                <component :is="Component" />
              </template>
            </RouterView>
          </n-layout>
        </n-layout>
        <n-layout-footer bordered class="h-[64px] flex justify-center items-center">
          Footer
        </n-layout-footer>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>

</style>
