import ThemedView from '@/components/ThemedView'
import { Slot} from 'expo-router'
import { Text ,StyleSheet, useColorScheme} from 'react-native'

const RootLayout = () => {
    const colorScheme:string | null | undefined = useColorScheme()
    console.log(colorScheme);
    
    return (
      <ThemedView style={{flex:1}}>
        <Slot/>
        <Text> RootLayout </Text>
      </ThemedView>
    )
}
export default RootLayout

const style = StyleSheet.create({})