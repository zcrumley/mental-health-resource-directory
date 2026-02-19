import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoryResourceList = () => {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Custom back button to force return to /Categories
  /* useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/Categories",
              params: { audience },
            })
          }
          style={{ paddingLeft: 10 }}
        >
          <Text style={{ color: "#007aff", fontSize: 16 }}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, router, audience]);*/

  useEffect(() => {
    const url = new URL("http://10.0.2.2:8000/api/resources/");
    if (category) url.searchParams.append("category", category);
    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => {
        setResources(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch resources:", err);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#60ad52" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {category?.charAt(0).toUpperCase() + category?.slice(1)} Resources
      </Text>

      {resources.map((res) => (
        <TouchableOpacity
          key={res.id}
          style={styles.card}
          onPress={() => router.push(`/Resources/${res.id}`)}
        >
          <Text style={styles.cardText}>{res.name}</Text>
        </TouchableOpacity>
      ))}

      {resources.length === 0 && (
        <Text style={styles.noData}>No resources found in this category.</Text>
      )}
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
  },
  card: {
    backgroundColor: "#e8e8e8",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
  },
  noData: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#777",
  },
});

export default CategoryResourceList;
