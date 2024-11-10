<script setup lang="ts">
import { BookOutline, CloudOutline, EllipseOutline, HomeOutline, PeopleOutline } from '@vicons/ionicons5'
import { type MenuProps, NIcon } from 'naive-ui'

const router = useRouter()

const activeKey = ref('home')

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuProps['options'] = [
  {
    key: 'home',
    label: '首页',
    icon: renderIcon(HomeOutline),
  },
  {
    key: 'user-index',
    label: '人员',
    icon: renderIcon(PeopleOutline),
  },
  {
    key: 'cloud-disk-index',
    label: '云盘',
    icon: renderIcon(CloudOutline),
  },
  {
    key: 'doc-index',
    label: '知识库',
    icon: renderIcon(BookOutline),
  },
  {
    key: 'more-index',
    label: '更多',
    icon: renderIcon(EllipseOutline),
  },
]

const handleMenuClick: MenuProps['onUpdate:value'] = (name) => {
  router.push({ name })
}
</script>

<template>
  <n-menu
    v-model:value="activeKey"
    :options="menuOptions"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    @update:value="handleMenuClick"
  />
</template>

<style scoped lang="scss"></style>
