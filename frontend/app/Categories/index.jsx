import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const categories = [
  { id: "food", label: "Food" },
  { id: "housing", label: "Housing / Shelter" },
  { id: "transportation", label: "Transportation" },
  { id: "medical", label: "Medical" },
  { id: "work", label: "Work" },
  { id: "social", label: "Social" },
  { id: "education", label: "Education" },
];

const CategoryScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: `/Categories/${cat.id}`,
            })
          }
        >
          <Text style={styles.buttonText}>{cat.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#60ad52",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default CategoryScreen;
