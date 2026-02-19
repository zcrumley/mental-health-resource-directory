import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const ResourceDetail = () => {
  const { id } = useLocalSearchParams(); 
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://10.0.2.2:8000/api/resources/${id}/`) // emulator 
    // fetch(`http://<your-local-ip>:8000/api/resources/${id}/`)
      .then(res => res.json())
      .then(data => {
        setResource(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch resource:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#60ad52" />
      </View>
    );
  }

  if (!resource) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Resource not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{resource.name}</Text>
      <Text style={styles.detail}>📍 {resource.address}</Text>
      <Text style={styles.detail}>📞 {resource.phone}</Text>
      <Text style={styles.description}>{resource.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    marginTop: 15,
    fontSize: 16,
    lineHeight: 22,
  },
  error: {
    fontSize: 18,
    color: "red",
  },
});

export default ResourceDetail;
