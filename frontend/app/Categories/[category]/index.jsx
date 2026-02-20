import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoryResourceList = () => {
  const { category } = useLocalSearchParams();
  const router = useRouter();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = new URL("http://127.0.0.1:8000/api/resources/");
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

  const title =
    (category?.charAt(0).toUpperCase() + category?.slice(1) || "All") +
    " Resources";

  return (
    <View style={styles.container}>
      <FlatList
        data={resources}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={<Text style={styles.title}>{title}</Text>}
        ListEmptyComponent={
          <Text style={styles.noData}>No resources found in this category.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/Resources/${item.id}`)}
          >
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
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