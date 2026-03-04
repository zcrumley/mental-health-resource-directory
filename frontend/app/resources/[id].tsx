import { useEffect, useState } from "react";
import { Text, ActivityIndicator, ScrollView, Pressable, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getResourceById, type Resource } from "../../src/lib/api";
import Screen from "../../components/Screen";

export default function ResourceScreen()
{
    const { id } = useLocalSearchParams<{ id?: string }>();
    const resourceId = String(id ?? "");

    const [resource, setResource] = useState<Resource | null>(null);
    const [error, setError] = useState<string | null>(null);

    function callPhone(phone: string)
    {
        const digits = phone.replace(/[^\d+]/g, "");
        Linking.openURL(`tel:${digits}`);
    }

    function openWebsite(url: string)
    {
        if (!url.startsWith("http"))
        {
            url = `https://${url}`;
        }

        Linking.openURL(url);
    }

    function openMaps(address: string)
    {
        const encoded = encodeURIComponent(address);
        const url = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
        Linking.openURL(url);
    }

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
            <Screen>
                <Text style={{ color: "red" }}>{error}</Text>
            </Screen>
        );
    }

    if (!resource)
    {
        return (
            <Screen>
                <ActivityIndicator />
            </Screen>
        );
    }

    return (
        <Screen>
            <ScrollView contentContainerStyle={{ gap: 8, paddingBottom: 24 }}>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>
                    {resource.name}
                </Text>

                {resource.description ? <Text>{resource.description}</Text> : null}

                {resource.phone ? (
                    <Pressable onPress={() => callPhone(resource.phone!)}>
                        <Text style={{ textDecorationLine: "underline" }}>
                            {resource.phone}
                        </Text>
                    </Pressable>
                ) : null}

                {resource.address ? (
                    <Pressable onPress={() => openMaps(resource.address!)}>
                        <Text style={{textDecorationLine: "underline"}}>
                            {resource.address}
                        </Text>
                    </Pressable>
                ) : null}

                {resource.website ? (
                    <Pressable onPress={() => openWebsite(resource.website!)}>
                        <Text style={{ }}>
                            {resource.website}
                        </Text>
                    </Pressable>
                ) : null}
            </ScrollView>
        </Screen>
    );
}