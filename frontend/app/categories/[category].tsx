import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getResourcesByCategory, type Resource } from "../../src/lib/api";
import ResourceCard from "../../components/ResourceCard";

export default function CategoryScreen()
{
    const { category } = useLocalSearchParams<{ category?: string }>();
    const categoryKey = String(category ?? "");

    const [resources, setResources] = useState<Resource[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>
    {
        if (!categoryKey)
        {
            setError("Missing category in route.");
            return;
        }

        setResources(null);
        setError(null);

        getResourcesByCategory(categoryKey)
            .then(setResources)
            .catch((e) => setError(String(e)));
    }, [categoryKey]);

    if (error)
    {
        return (
            <View style={{ padding: 16 }}>
                <Text style={{ color: "red" }}>{error}</Text>
            </View>
        );
    }

    if (!resources)
    {
        return (
            <View style={{ padding: 16 }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
                {categoryKey.toUpperCase()}
            </Text>

            {resources.length === 0 ? (
                <Text>No resources found for this category.</Text>
            ) : (
                resources.map((r) => <ResourceCard key={r.id} resource={r} />)
            )}
        </ScrollView>
    );
}