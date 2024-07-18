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
          id:1,
          title:"New chat",
          chat: [],
          active: false,
          icon: 'history',
        }
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
    setDiscussionId(id) {
      this.discussionId = id;
    },
    // createEmptyChat() {
    //   this.conversations.push({
    //     id: this.conversations.length+1,
    //     title: "New Conversation",
    //     chat: [],
    //     icon: "history",
    //   });
    //   this.activeChat = this.conversations.length - 1;
    //   this.input = "";
    // },
    createNewChat(){
      
    },
    // createNewChat() {
    //   if (this.conversations[this.activeChat]?.chat.length > 0) {
    //     const title =
    //       this.conversations[this.activeChat].chat[0].question
    //         .toUpperCase()
    //         .substring(0, 17) + "...";
    //     this.conversations[this.activeChat].title = title;
    //     this.createEmptyChat();
    //   }
    // },

    // visitPreviousChat(previousChatIndex) {
    //   this.activeChat = previousChatIndex;
    // },

    // Api Methods:
    async sendMessage() {
      const inputvalue = this.input;
      if (inputvalue) {
        this.addChat(inputvalue, "Hey there how can i help you today");
        this.input = "";
        // let response = null;
        // if (discussionId === null || isNewTopic) {
        //     response = await initiateDiscussion(inputvalue);
        //     if(response.ok)
        //       setDiscussionId(response.data.discussionId);
        // } else {
        //     response = await continueDiscussion(inputvalue, isNewTopic);
        // }
        // if(response){
        //   addChat(inputvalue, response.data.answer);
        // }
        // input = "";
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
          data: JSON.stringify({
            requesterId: "user2",
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
        throw new Error("Failed to initiate discussion.");
      }
    },

    async continueDiscussion(inputvalue, isNewTopic) {
      return;
      const requestObj = new Request(
        `${apiPrefix}auth/api/v1/discuss/${discussionId}/converse`,
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
        throw new Error("Failed to continue discussion.");
      }
    },
  },
});