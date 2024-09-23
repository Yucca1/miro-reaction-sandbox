<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  CHAT_HEADER_SELECTOR,
  CHAT_TEXT_SELECTOR,
  RIGHT_PANEL_SELECTOR,
  EMOJI_TIMEOUT
} from '../config/constants'
import wordImages from '../config/mapping.json'

const getExtensionUrl = () => {
  return document.getElementById('miro-extension-url')?.textContent
}

const getEmojiPath = (text: string): string => {
  let imageFileName = 'undef.gif'
  if (text in wordImages) {
    imageFileName = wordImages[text as keyof typeof wordImages]
  }
  const extensionUrl = getExtensionUrl()
  return `${extensionUrl}emoji/${imageFileName}`
}

interface Message {
  text: string
  count: number
  emojiPath: string
  // userNames: Array<string> #TODO: UserName control
}

const messages = ref<Message[]>([])

const observeChat = (chatArea: HTMLDivElement) => {
  const observer = new MutationObserver((mutations) => {
    const chatHeader = chatArea.querySelector(CHAT_HEADER_SELECTOR)
    const target = mutations[0].target
    if (!chatHeader || chatHeader.innerHTML !== 'Chat' || !(target instanceof HTMLDivElement)) {
      console.log('chat area not open')
      return
    }
    target.style.display = 'none' //#TODO: UNCOMMENT
    console.log('chat area style set to be display=none')

    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          console.log('node', node)
          if (node instanceof HTMLElement && node.id.startsWith('chat-message-')) {
            console.log('chat-message')
            // const userName = node.querySelector('span.name-ukmBQ')?.textContent || '' #TODO: UNCOMMENT
            const messageText = node.querySelector(CHAT_TEXT_SELECTOR)?.textContent || ''
            console.log(messages.value)
            addMessage(messageText)
            setTimeout(() => removeMessage(messageText), EMOJI_TIMEOUT)
          }
        })
      }
    })
  })

  observer.observe(chatArea, { childList: true, subtree: true })
  return observer
}

const addMessage = (text: string) => {
  const emojiPath = getEmojiPath(text)
  const existingMessage = messages.value.find((m) => m.text === text)
  if (existingMessage) {
    existingMessage.count++
  } else {
    messages.value.push({ text, count: 1, emojiPath })
  }
}

const removeMessage = (text: string) => {
  messages.value = messages.value.map((message) => {
    if (message.text === text) {
      message.count--
    }
    return message
  })
  messages.value = messages.value.filter((m) => m.count >= 1)
}

let interval: NodeJS.Timeout
let observer: MutationObserver

onMounted(() => {
  const startup = () => {
    const rightPanel = document.querySelector(RIGHT_PANEL_SELECTOR)
    if (rightPanel && rightPanel instanceof HTMLDivElement) {
      console.log('Chat area loaded')
      clearInterval(interval)
      observer = observeChat(rightPanel)
    } else {
      console.log('Wating for Miro initialization...')
    }
  }
  interval = setInterval(startup, 1000)
})

onUnmounted(() => {
  observer?.disconnect()
  clearInterval(interval)
})
</script>

<template>
  <div class="reaction-panel">
    <div class="emoji-box">
      <div v-for="msg in messages">
        <img class="emoji" :src="msg.emojiPath" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.reaction-panel {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  top: 64px;
  right: 8px;
  width: 200px;
  height: 40px;
}

.emoji {
  width: 24px;
  height: 24px;
  margin: 4px;
}

.emoji-box {
  display: flex;
  column-gap: 2px;
}
</style>
