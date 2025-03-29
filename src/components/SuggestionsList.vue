<template>
    <div class="select-autocomplete">
      <input
        type="text"
        v-model="searchQuery"
        @focus="showDropdown = true"
        @blur="hideDropdown"
        @input="onInput"
        placeholder="Start typing..."
        class="select-autocomplete__input"
      />
      <ul v-if="showDropdown && options.length" class="select-autocomplete__dropdown">
        <li
          v-for="(option, index) in options"
          :key="index"
          class="select-autocomplete__option"
          @click="openLink(option)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [], // The precomputed suggestions
    },
    placeholder: {
      type: String,
      default: "Search...",
    },
  },
  data() {
    return {
      searchQuery: "", // User's input value
      showDropdown: false, // Dropdown visibility
    };
  },
  methods: {
    onInput() {
      this.$emit("input", this.searchQuery); // Notify parent about the input value
    },
    hideDropdown() {
      // Small delay to avoid triggering blur before click events
      setTimeout(() => {
        this.showDropdown = false;
      }, 200);
    },
    openLink(option) {
      const url = `https://www.google.com/search?q=${encodeURIComponent(option)}`;
      window.open(url, '_blank');
    },
  },
};
</script>  

<style scoped>
.select-autocomplete {
  position: relative;
  display: inline-block;
  width: 80%;
}

.select-autocomplete__input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.select-autocomplete__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: transparent; /* Make background transparent */
  border: transparent; /* Adjust border to match transparency */
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  margin: 0;
  padding: 0;
  list-style: none;
  backdrop-filter: blur(8px); /* Optional: Add blur effect for better readability */
  color: #9f9f9f;
}

.select-autocomplete__option {
  padding-right: 2px;
  padding-left: 2px;
  cursor: pointer;
  color: rgb(209, 209, 209);
  background: transparent; /* Make background transparent */
  border-bottom: transparent; /* Optional: Add separator lines */
}

.select-autocomplete__option:hover {
  color: white /* Adjust hover effect for transparency */
}

</style>
