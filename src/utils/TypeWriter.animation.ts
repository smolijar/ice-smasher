type EventListener = (content: Event) => void

const QUESTION_TYPING_DELAY = 1200
const END_WORD_TYPING_MULTIPLIER = 1.5
const CHARACTER_TYPING_DELAY = 20
const CHARACTER_TYPING_JITTER = 50

export enum EventType {
  CONTENT_CHANGE,
  TRANSITION_CHANGE,
}
type Event = { type: EventType.CONTENT_CHANGE, content: string } | { type: EventType.TRANSITION_CHANGE }

export class TypeWriter {
  private content: string = ''
  private timeout: NodeJS.Timeout | null
  private isReducing = false
  private listeners: EventListener[] = []

  public addListener(cb: EventListener) {
    this.listeners.push(cb)
  }
  public changeText(content: string) {
    this.retypeContent(content)
  }
  private emit(type: EventType) {
    if (type === EventType.CONTENT_CHANGE) {
      this.listeners.forEach(l => l({ type: EventType.CONTENT_CHANGE, content: this.content }))
    } else if (type === EventType.TRANSITION_CHANGE) {
      this.listeners.forEach(l => l({ type: EventType.TRANSITION_CHANGE }))
    }
  }
  private retypeContent (to: string) {
    if (this.content === to) {
      clearTimeout(this.timeout)
      return
    }
    const goingToReduce = !to.startsWith(this.content)
    let delay
    if (goingToReduce) {
      this.content = this.content.slice(0, this.content.length - 20 / this.content.length /* dummy exp increase */)
      this.emit(EventType.CONTENT_CHANGE)
      delay = Math.random() * 10
    } else {
      if (this.isReducing) {
        this.emit(EventType.TRANSITION_CHANGE)
      }
      const delta = to.slice(this.content.length, this.content.length + 1)
      this.content = this.content + delta
      this.emit(EventType.CONTENT_CHANGE)
      const nextChar = to.slice(this.content.length, this.content.length + 1)
      delay =
        CHARACTER_TYPING_DELAY +
        Math.random() * CHARACTER_TYPING_JITTER * (nextChar === ' ' ? END_WORD_TYPING_MULTIPLIER : 1) +
        (nextChar === '?' ? QUESTION_TYPING_DELAY * Math.random() : 0)
    }
    clearTimeout(this.timeout)
    this.isReducing = goingToReduce
    this.timeout = setTimeout(() => this.retypeContent(to), delay)
  }
}
