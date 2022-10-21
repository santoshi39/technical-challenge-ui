<template>
  <div>
    <admin v-show="role === 'Admin'"></admin>
    <user v-show="role === 'Otheruser'"></user>
  </div>
</template>

<script>

import Admin from '@/components/dashboard/Admin.vue'
import User from '@/components/dashboard/User.vue'
export default {
  data: () => ({
    role: '',
  }),
  components: { Admin, User },
  created() {
    let data = JSON.parse(localStorage.getItem('auth-data'))
    this.role = data.role
  },
}
</script>
