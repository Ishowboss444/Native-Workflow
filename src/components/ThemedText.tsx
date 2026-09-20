import { useColorScheme, StyleSheet, TextProps,Text } from 'react-native'
import { Colors } from '@/constants/theme'

export default function ThemedText({style , ...props}:TextProps) {
    const colorScheme:string| null | undefined = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    
  return (
    <Text style={[{color:theme.text},styles.card, style]} {...props} >
    </Text>
  )
}
const styles = StyleSheet.create({   
    card : {
        fontSize:20,
    }
})