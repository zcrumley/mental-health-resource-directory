import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RibbonImage from "../assets/images/ribbon.png";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.title}>Mental Health Directory</Text>
        <Image source={RibbonImage} style={styles.image} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/Categories")}
      >
        <Text style={styles.buttonText}>Access Resources</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#c2c1c0",
  },
  topContent: {
    alignItems: "center",
    marginTop: 60,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#60ad52",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
