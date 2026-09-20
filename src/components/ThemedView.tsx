import { useColorScheme, View , StyleSheet, ViewProps } from 'react-native'
import { Colors } from '@/constants/theme'

export default function ThemedView({style, ...props}:ViewProps) {
    const colorScheme:string| null | undefined = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
  return (
    <View style={[{backgroundColor:theme.background},styles.card, style]} {...props} >
    </View>
  )
}
const styles = StyleSheet.create({   
    card : {
        padding:20 ,
        borderRadius:20,
    }
})