import { useEffect, useState } from "react";
import {
    Text,
    ActivityIndicator,
    ScrollView,
    Pressable,
    Linking,
    View,
    StyleSheet
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getResourceById, type Resource } from "../../src/lib/api";
import Screen from "../../components/Screen";
import { theme } from "../../src/styles/theme";

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
                <Text style={styles.error}>{error}</Text>
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
            <ScrollView contentContainerStyle={styles.container}>

                <Text style={styles.title}>
                    {resource.name}
                </Text>

                

                {/* Details card */}
                <View style={styles.card}>

                    {resource.description ? (
                        <Text style={styles.description}>
                            {resource.description}
                        </Text>
                    ) : (
                        <Text style={styles.muted}>
                            No description available.
                        </Text>
                    )}

                    {resource.phone ? (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Phone</Text>
                            <Text style={styles.detailValue}>{resource.phone}</Text>
                        </View>
                    ) : null}

                    {resource.address ? (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Address</Text>
                            <Text style={styles.detailValue}>{resource.address}</Text>
                        </View>
                    ) : null}

                    {resource.website ? (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Website</Text>
                            <Text style={styles.detailValue}>{resource.website}</Text>
                        </View>
                    ) : null}

                </View>

                {/* Actions */}
                <View style={styles.actionsRow}>

                    {resource.phone ? (
                        <Pressable
                            onPress={() => callPhone(resource.phone!)}
                            style={({ pressed }) => [
                                styles.actionBtn,
                                pressed && styles.pressed
                            ]}
                        >
                            <Text style={styles.actionText}>Call</Text>
                        </Pressable>
                    ) : null}

                    {resource.address ? (
                        <Pressable
                            onPress={() => openMaps(resource.address!)}
                            style={({ pressed }) => [
                                styles.actionBtn,
                                pressed && styles.pressed
                            ]}
                        >
                            <Text style={styles.actionText}>Directions</Text>
                        </Pressable>
                    ) : null}

                    {resource.website ? (
                        <Pressable
                            onPress={() => openWebsite(resource.website!)}
                            style={({ pressed }) => [
                                styles.actionBtn,
                                pressed && styles.pressed
                            ]}
                        >
                            <Text style={styles.actionText}>Website</Text>
                        </Pressable>
                    ) : null}

                </View>

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:
    {
        gap: theme.spacing.md,
        paddingBottom: 24
    },

    title:
    {
        fontSize: 26,
        fontWeight: "900",
        color: theme.colors.green
    },

    actionsRow:
    {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10
    },

    actionBtn:
    {
        backgroundColor: theme.colors.greenSoft,
        borderRadius: theme.radius.md,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: theme.colors.border
    },

    pressed:
    {
        opacity: 0.85
    },

    actionText:
    {
        color: theme.colors.green,
        fontWeight: "800"
    },

    card:
    {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.border
    },

    description:
    {
        color: theme.colors.text,
        lineHeight: 20,
        fontSize: 18
    },

    muted:
    {
        color: theme.colors.muted
    },

    detailRow:
    {
        marginTop: 12
    },

    detailLabel:
    {
        fontSize: 16,
        fontWeight: "600",
        color: theme.colors.muted,
        marginBottom: 4
    },

    detailValue:
    {
        color: theme.colors.text
    },

    error:
    {
        color: theme.colors.danger
    }
});