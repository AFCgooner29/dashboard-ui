import { defineStore } from "pinia";
import { useFetch } from "../../util/useFetch";

// Global values
const apiKey = process.env.VUE_APP_API_KEY;
const apiPrefix = process.env.VUE_APP_API_PREFIX;

export const useChatStore = defineStore("chat", {
  state: () => {
    return {
      input: "",
      isNewTopic: false,
      discussionId: null,
      chat: [],
      conversations: [
        {
          id: 1,
          title: "New chat",
          chat: [],
          active: false,
          icon: "history",
        },
      ],
      backgroundColor: "#ffffff",
    };
  },

  actions: {
    toggleNewTopic() {
      this.isNewTopic = !this.isNewTopic;
    },
    addChat(question, response) {
      this.chat.push({
        id: this.chat.length + 1,
        question: question,
        response: response,
      });
    },
    createNewChat() {},

    // Api Methods:
    async sendMessage() {
      const inputvalue = this.input.trim();
      this.input = "";
      if (!inputvalue) {
        window.alert("Please enter any query!");
        return;
      }
      let response = null;
      if (this.discussionId === null || this.isNewTopic) {
        response = await this.initiateDiscussion(inputvalue);
      } else {
        response = await this.continueDiscussion(inputvalue, this.isNewTopic);
      }
      if (response) {
        this.addChat(response.data.question, response.data.response);
        this.discussionId = response.data.discussionId;
      }
    },

    async initiateDiscussion(inputvalue) {
      const requestObj = new Request(
        `${apiPrefix}auth/api/v1/discuss/initiate`,
        {
          method: "POST",
          headers: {
            API_KEY: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requdataesterId: "user2",
            question: inputvalue,
            isNewTopic: true,
          }),
        }
      );
      try {
        const response = await useFetch(requestObj);
        return response;
      } catch (error) {
        console.error("Failed to initiate discussion.", error);
        return {
          data:{
            question:inputvalue,
            response:"Failed to initiate discussion.",
            discussionId:null
          }
        };
      }
    },

    async continueDiscussion(inputvalue, isNewTopic) {
      const requestObj = new Request(
        `${apiPrefix}auth/api/v1/discuss/${this.discussionId}/converse`,
        {
          method: "POST",
          headers: {
            API_KEY: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requesterId: "user2",
            question: inputvalue,
            isNewTopic: isNewTopic,
          }),
        }
      );

      try {
        const response = await useFetch(requestObj);
        return response;
      } catch (error) {
        console.error("Failed to continue discussion.", error);
        return {
          data:{
            question:inputvalue,
            response:"Failed to continue discussion.",
            discussionId:null
          }
        };
      }
    },
  },
});
