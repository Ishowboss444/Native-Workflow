import ThemedText from "@/components/ThemedText"
import ThemedView from "@/components/ThemedView"
import { useRouter } from "expo-router"
import { Button } from "react-native"

function about() {
  const router = useRouter()

  return (
    <ThemedView>
        <ThemedText>hello from about</ThemedText>
        <Button title="Back to Home" onPress={()=>router.push('/') }/>
    </ThemedView>
  )
}

export default about
