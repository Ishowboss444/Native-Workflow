import { StyleSheet , Button} from "react-native"
import { useRouter } from "expo-router"
import ThemedView from "@/components/ThemedView"
import ThemedText from "@/components/ThemedText"

const index = ()=>{

const router = useRouter()

  return(
    <ThemedView style={style.heroSection}>
      <ThemedText>hello world !</ThemedText>
      <Button title="go for about" onPress={()=>{router.push('/addWorkStep1')}} />
    </ThemedView>
  )
}

export default index

const style = StyleSheet.create({
  heroSection : {
    display:"flex",
    flex:1,
    alignItems:'center',
    justifyContent:"center",
  }
})