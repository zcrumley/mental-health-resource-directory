import { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Pressable,
    TextInput,
    FlatList
} from "react-native";
import { Link } from "expo-router";
import {
    getCategories,
    searchResources,
    type Category,
    type Resource
} from "../../src/lib/api";
import ResourceCard from "../../components/ResourceCard";

export default function Categories()
{
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [results, setResults] = useState<Resource[]>([]);
    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>
    {
        getCategories()
            .then(setCategories)
            .catch((e) => setError(String(e)));
    }, []);

    useEffect(() =>
    {
        const q = query.trim();

        if (!q)
        {
            setResults([]);
            setSearching(false);
            return;
        }

        setSearching(true);

        const handle = setTimeout(() =>
        {
            searchResources(q)
                .then(setResults)
                .finally(() => setSearching(false));

        }, 250);

        return () => clearTimeout(handle);

    }, [query]);

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

    const trimmed = query.trim();

    return (
        <View style={{ flex: 1, padding: 16, gap: 12 }}>

            <Text style={{ fontSize: 20, fontWeight: "700" }}>
                Categories
            </Text>

            {/* Search bar with clear (X) */}
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    overflow: "hidden"
                }}
            >
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search resources..."
                    autoCorrect={false}
                    autoCapitalize="none"
                    style={{
                        flex: 1,
                        paddingVertical: 10,
                        outlineStyle: "none",
                        outlineWidth: 0,
                        boxShadow: "none",
                        borderWidth: 0
                    }}
                />

                {query.length > 0 && (
                    <Pressable
                        onPress={() =>
                        {
                            setQuery("");
                            setResults([]);
                        }}
                    >
                        <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>
                            ✕
                        </Text>
                    </Pressable>
                )}
            </View>

            {searching && <ActivityIndicator />}

            {trimmed ? (

                <>
                    {!searching && results.length === 0 ? (
                        <Text>No results.</Text>
                    ) : null}

                    <FlatList
                        data={results}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => <ResourceCard resource={item} />}
                        keyboardShouldPersistTaps="handled"
                    />
                </>

            ) : (

                categories.map((c) => (
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
                ))

            )}

        </View>
    );
}