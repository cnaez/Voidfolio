export type Sec = {
  id: number | string
  title: string
  desc: string | React.ReactNode
  bg?: string
  mode?: 'dark' | 'light'
  type?: 'image' | 'video'
  horizontal?: boolean
  centerContent?: boolean
}
