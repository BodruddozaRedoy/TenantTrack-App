import { useColorScheme } from 'react-native'

export default function useDarkMode() {
  const colorScheme = useColorScheme()
  return colorScheme === "dark"
}