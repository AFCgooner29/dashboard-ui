  <template>
      <VaSidebar hoverable minimized-width="64px" style="height: 80vh;">
        <VaSidebarItem
          v-for="item in props.content"
          :key="item.title"
          :active="item.active"
        >
          <VaSidebarItemContent>
            <VaIcon :name="item.icon" />
            <VaSidebarItemTitle>
              {{ item.title }}
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
</template>

<script setup>
import { defineProps } from 'vue';
import { computed, ref } from "vue";

const props = defineProps({
  content: {
    type: Array,
    required: true
  }
});

</script>

<style></style>
