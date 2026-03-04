import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, Pressable, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getResourceById, type Resource } from "../../src/lib/api";

export default function ResourceScreen()
{
    const { id } = useLocalSearchParams<{ id?: string }>();
    const resourceId = String(id ?? "");

    const [resource, setResource] = useState<Resource | null>(null);
    const [error, setError] = useState<string | null>(null);

    // phone helper
    function callPhone(phone: string)
    {
        const digits = phone.replace(/[^\d+]/g, "");
        Linking.openURL(`tel:${digits}`);
    }

    // website helper
    function openWebsite(url: string)
    {
        if (!url.startsWith("http"))
        {
            url = `https://${url}`;
        }

        Linking.openURL(url);
    }

    //maps helper
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
        <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }}>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>
                {resource.name}
            </Text>

            {resource.description ? <Text>{resource.description}</Text> : null}

            {resource.phone ? (
                <Pressable onPress={() => callPhone(resource.phone)}>
                    <Text style={{ textDecorationLine: "underline" }}>
                        Phone: {resource.phone}
                    </Text>
                </Pressable>
            ) : null}

            {resource.address ? (
                 <Pressable onPress={() => openMaps(resource.address)}>
                     <Text style={{ textDecorationLine: "underline" }}>
                  Address: {resource.address}
                     </Text>
                 </Pressable>
) : null}

            {resource.website ? (
                <Pressable onPress={() => openWebsite(resource.website)}>
                    <Text style={{ textDecorationLine: "underline" }}>
                      {resource.website}
                    </Text>
                </Pressable>
            ) : null}
        </ScrollView>
    );
}