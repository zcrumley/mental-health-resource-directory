import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getResourceById, type Resource } from "../../src/lib/api";

export default function ResourceScreen()
{
    const { id } = useLocalSearchParams<{ id?: string }>();
    const resourceId = String(id ?? "");

    const [resource, setResource] = useState<Resource | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>
    {
        if (!resourceId)
        {
            setError("Missing resource id in route.");
            return;
        }

        setResource(null);
        setError(null);

        getResourceById(resourceId)
            .then(setResource)
            .catch((e) => setError(String(e)));
    }, [resourceId]);

    if (error)
    {
        return (
            <View style={{ padding: 16 }}>
                <Text style={{ color: "red" }}>{error}</Text>
            </View>
        );
    }

    if (!resource)
    {
        return (
            <View style={{ padding: 16 }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <ScrollView style={{ padding: 16, gap: 8 }}>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>{resource.name}</Text>

            {resource.description ? <Text>{resource.description}</Text> : null}
            {resource.phone ? <Text>Phone: {resource.phone}</Text> : null}
            {resource.address ? <Text>Address: {resource.address}</Text> : null}
            {resource.website ? <Text>Website: {resource.website}</Text> : null}
        </ScrollView>
    );
}