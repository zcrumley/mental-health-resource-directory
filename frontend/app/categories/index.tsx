import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Pressable } from "react-native";
import { Link } from "expo-router";
import { getCategories, type Category } from "../../src/lib/api";

export default function Categories()
{
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>
    {
        getCategories()
            .then(setCategories)
            .catch((e) => setError(String(e)));
    }, []);

    if (error)
    {
        return (
            <View style={{ padding: 16 }}>
                <Text style={{ color: "red" }}>{error}</Text>
            </View>
        );
    }

    if (!categories)
    {
        return (
            <View style={{ padding: 16 }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
                Categories
            </Text>

            {categories.map((c) => (
                <Link
                    key={c.key}
                    href={{
                        pathname: "/categories/[category]",
                        params: { category: c.key }
                    }}
                    asChild
                >
                    <Pressable
                        style={{
                            padding: 12,
                            borderWidth: 1,
                            borderRadius: 10
                        }}
                    >
                        <Text>{c.label}</Text>
                    </Pressable>
                </Link>
            ))}
        </View>
    );
}